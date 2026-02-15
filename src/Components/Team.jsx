import React from 'react';
import './Team.css';

const Team = () => {
  const members = [
    { 
     
        
      role: 'naila uwase',
      image:'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/474956318_122158007042321146_8823717372122840328_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=8LaW29mPcZ4Q7kNvwE72H5a&_nc_oc=AdkF_AOgCnPzOwWhhnOvv7HbMJJxbMmJR-Eh1weP0PfN0M6L2BYDuCDpnMxdIqn20O0&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=k3Vhx0ABQR_vp5_5oAIVZQ&oh=00_AfupAxn8CHjsYRhHAmaEWWmgxK4iXBMSeKnTpSBhdPLzTQ&oe=69969434'
    },
    { 
      
        
      role: 'Iradufasha millium',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/556638933_122198232542321146_4782129414654441653_n.png?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=kF2dtIPKG-EQ7kNvwHLel8n&_nc_oc=Adm-6COhYinwbeht3J3kfG-qC5qg5w9O7WNbVnPxkwaA3OJz8dfVqSFuR11LdUCoDQc&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=dN1p_nCY75U3ou3v17D3xg&oh=00_Afsdqjb_Vc1aNbjPjI5susLX4RDrJV4zp5dn7-06hm5cvA&oe=69969F0D'
    },
    { 
     
        
      role: 'puty millium',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/472530212_122154949592321146_7482547342499520520_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=v5Ch0biYImkQ7kNvwEFwfY4&_nc_oc=AdnSH4Bjp6ZQ9KnK28hHJC9nmrxxaWbvBWgYGuRYW36ldKgzKhT8PiYB4uKlJdbmZsQ&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=ezojvtYWw6PpHymHJ0scpA&oh=00_Afv41Wdc2ItYGpmvzNaOaK2SuW43AcVZY9dlvjW6cVEbWQ&oe=69969034'
    }
  ];

  return (
    <div className="page-content team-page">
      <h1>Meet Our Team</h1>
      <div className="team-grid">
        {members.map((member, index) => (
          <div key={index} className="team-member">
            <div className="member-avatar">
              <img src={member.image} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
