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
    
    // Auto-create table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database table "users" is ready');
    
    connection.release();
  } catch (error) {
    console.error('Database Initialization Error:', error.message);
    console.log('Make sure MySQL is running and the database specified in .env exists.');
  }
})();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    const error = new Error('Name, email and password are required');
    error.status = 400;
    throw error;
  }

  console.log(`Registration attempt for: ${email}`);
  const [existing] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await pool.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
  res.status(201).json({ message: 'User registered successfully', user: { name, email } });
}));

app.post('/api/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.status = 400;
    throw error;
  }

  console.log(`Login attempt for: ${email}`);
  const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  
  if (users.length > 0) {
    const user = users[0];
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
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
