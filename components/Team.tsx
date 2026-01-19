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
        padding: '36px',
        maxWidth: '1400px',
        margin: '0 auto',
        flex: 1
      }}>
        <h1 style={{
          fontSize: '1.9em',
          marginBottom: '36px'
        }}>
          Team
        </h1>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '36px'
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
                'Nation Top Cyber Security researcher', 
                'web security specialist',
                'CTF creator & Player '
              ]
            }
          ].map((member, i) => (
            <div
              key={i}
              style={{
                flex: '1 1 340px',
                maxWidth: '420px'
              }}
            >
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                overflow: 'hidden',
                marginBottom: '18px'
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
                fontSize: '1.25em',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                <a href={member.link} style={{ color: '#fff', textDecoration: 'none' }}>
                  {member.name}
                </a>
              </h2>

              <ul style={{
                paddingLeft: '18px',
                lineHeight: 1.45,
                fontSize: '0.95em'
              }}>
                {member.points.map((p, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <footer style={{
        padding: '18px',
        textAlign: 'center',
        fontSize: '0.85em'
      }}>
        <a href="/" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>HOME</a>
        <a href="#" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>THESIS</a>
        <a href="/team" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>TEAM</a>
      </footer>
    </div>
  );
};

export default Team;
