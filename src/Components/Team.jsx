import React from 'react';
import './Team.css';

const Team = () => {
  const members = [
    { 
     
        
      role: 'Nyiranziza angelique',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/605731903_122174477882426057_6575193172283421840_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RHcJoollEAYQ7kNvwEPj696&_nc_oc=Adlirawzo527kn4hPuok1Anzr_2UKbaKJLy1YRwh8j3epprX8RGSRkM8IWqvPw4P51U&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=lFi5GVwB3t4FjUHk-q81YQ&oh=00_AfvzA-Kif29NkABTMbxtSycP_FlRdLPL71AV3Hn5TaNFrw&oe=698D4BC4'
    },
    { 
      
        
      role: 'Iradufasha millium',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/558918207_122198232710321146_2277505476922697909_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u0X9WzcL__YQ7kNvwEIvCYo&_nc_oc=AdkxE7kvN3KFAff3JEtUTgn05Fw3KjFmyNyyPYGw4D4_MzhXIjh3ekfhW0H4hFMB2Lg&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=kibe76JvgXla6xeTGmY_lA&oh=00_Afs7uqUiO8sBYPfy52d6bZ5Cg-Q2HkQXb-cRVWN_Rl-pDQ&oe=698D5204'
    },
    { 
     
        
      role: 'Umukundwa bonnette',
      image: 'https://scontent.fnbo18-1.fna.fbcdn.net/v/t39.30808-6/573303536_122188028342348810_2048461907889935660_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=n2z4DczR0mkQ7kNvwHB5W8J&_nc_oc=AdkAhFX8-LXIN70h9aIGJi-AF_25NtvQtHSAdIrvjt6UAoTHnhfHJFEv8A6scbC740Q&_nc_zt=23&_nc_ht=scontent.fnbo18-1.fna&_nc_gid=9ZPuPAvxAuH7I7isMwuU-w&oh=00_Aft54LHAANZAAT3FISxAyQbzX8WqUN6DM5MUVYzTHlb4tg&oe=698D35B8'
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
