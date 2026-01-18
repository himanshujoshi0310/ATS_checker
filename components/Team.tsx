import React from 'react';

const Team: React.FC = () => {
  return (
    <div style={{ 
      fontFamily: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
      backgroundColor: '#000',
      color: '#fff',
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <div style={{
        padding: '48px',
        maxWidth: '1600px',
        margin: '0 auto',
        flex: 1
      }}>
        <h1 style={{
          textAlign: 'left',
          fontSize: '2.4em',
          marginBottom: '48px'
        }}>
          Team
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '48px'
        }}>
          {[
            {
              img: '/image_0.png',
              name: 'Himanshu Joshi',
              link: 'https://www.linkedin.com/in/himanshu-joshi-535b4127b',
              points: [
                'Focused on designing scalable and delightful digital products, UI/UX principles.',
                'Continuously leveling up with the latest in web technologies'
                
              ]
            },
            {
              img: '/image_1.png',
              name: 'Krishnkant Modi',
              link: 'https://www.linkedin.com/in/krishnkant-modi-2b82b52b4/',
              points: [
                'Top CS student at University',
                'Passionate Developer who love to build new things by code.',
                'Solve Problems that doesn\'t even exists'
              ]
            },
            {
              img: '/image_2.png',
              name: 'Gurudatt Choudhary',
              link: 'https://www.linkedin.com/in/gurudatt-choudhary',
              points: [
                'Cybersecurity researcher, web security specialist',
                'Ethical hacker & Nation Top Security Researcher',
                'CTF creator and & Player '
              ]
            }
          ].map((member, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 400px',
                textAlign: 'left',
                maxWidth: '520px'
              }}
            >
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '24px'
              }}>
                <img 
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)'
                  }}
                />
              </div>

              <h2 style={{
                fontSize: '1.5em',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}>
                <a 
                  href={member.link}
                  style={{ textDecoration: 'none', color: '#fff' }}
                >
                  {member.name}
                </a>
              </h2>

              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '24px',
                lineHeight: 1.5,
                fontSize: '1.1em'
              }}>
                {member.points.map((p, idx) => (
                  <li key={idx} style={{ marginBottom: '12px' }}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <footer style={{
        padding: '24px',
        textAlign: 'center',
        fontSize: '1em'
      }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 12px', textTransform: 'uppercase' }}>Home</a>
        <a href="#" style={{ color: '#fff', textDecoration: 'none', margin: '0 12px', textTransform: 'uppercase' }}>Thesis</a>
        <a href="/team" style={{ color: '#fff', textDecoration: 'none', margin: '0 12px', textTransform: 'uppercase' }}>Team</a>
      </footer>
    </div>
  );
};

export default Team;
