import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Async wrapper to catch errors in routes
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Test database connection and initialize table
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    
    // Auto-create users table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Auto-create admins table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Seed Manual Admin
    const adminEmail = 'millum@gmail.com';
    const adminPass = '1234567890';
    const [existingAdmin] = await connection.query('SELECT id FROM admins WHERE email = ?', [adminEmail]);
    
    if (existingAdmin.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const hashedAdminPass = await bcrypt.hash(adminPass, salt);
      await connection.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', ['System Admin', adminEmail, hashedAdminPass]);
      console.log(`Admin account seeded: ${adminEmail}`);
    }
    
    console.log('Database tables are ready');
    
    connection.release();
  } catch (error) {
    console.error('Database Initialization Error:', error.message);
    console.log('Error details:', error);
    console.log('Make sure MySQL is running and the database specified in .env exists.');
  }
})();

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Use .all or .use for broader matching if needed, but .get should work.
// Let's ensure it's matched by moving it even higher or using a more explicit log.
app.get('/api/users', asyncHandler(async (req, res) => {
  console.log('Users route reached');
  const [users] = await pool.execute('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
  res.json(users);
}));

app.post('/api/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user'; // Force role to user for public registration
  
  if (!name || !email || !password) {
    const error = new Error('Name, email and password are required');
    error.status = 400;
    throw error;
  }

  console.log(`Registration attempt for: ${email}`);
  const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const [existingAdmin] = await pool.execute('SELECT * FROM admins WHERE email = ?', [email]);
  
  if (existingUser.length > 0 || existingAdmin.length > 0) {
    const error = new Error('User already exists with this email');
    error.status = 400;
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await pool.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);
    res.status(201).json({ message: 'User registered successfully', user: { name, email, role } });
  } catch (err) {
    console.error('Registration Database Error:', err);
    const error = new Error('Database error during registration: ' + err.message);
    error.status = 500;
    throw error;
  }
}));

app.put('/api/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    const error = new Error('Name and email are required');
    error.status = 400;
    throw error;
  }

  await pool.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  res.json({ message: 'User updated successfully' });
}));

app.delete('/api/users/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await pool.execute('DELETE FROM users WHERE id = ?', [id]);
  res.json({ message: 'User deleted successfully' });
}));

app.post('/api/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  console.log(`Login attempt for: ${email}`);
  
  // Check users table first
  let [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  let user = users[0];
  let role = user?.role || 'user';

  // If not in users table, check admins table
  if (!user) {
    const [admins] = await pool.execute('SELECT * FROM admins WHERE email = ?', [email]);
    if (admins.length > 0) {
      user = admins[0];
      role = 'admin';
    }
  }
  
  if (user) {
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ message: 'Login successful', user: { name: user.name, email: user.email, role: role } });
    } else {
      const error = new Error('Invalid email or password');
      error.status = 401;
      throw error;
    }
  } else {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }
}));

// Handle 404 errors for unmatched routes
app.use((req, res, next) => {
  console.log(`404 Hit: ${req.method} ${req.originalUrl}`);
  const error = new Error(`The requested path ${req.originalUrl} was not found on this server.`);
  error.status = 404;
  next(error);
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[Error] ${status} - ${err.message}`);
  
  res.status(status).json({
    error: err.status === 404 ? 'Not Found' : 'Internal Server Error',
    message: err.message,
    // Only include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
