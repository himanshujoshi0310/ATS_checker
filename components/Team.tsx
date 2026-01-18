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
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: 1
      }}>
        <h1 style={{
          textAlign: 'left',
          fontSize: '2em',
          marginBottom: '40px'
        }}>Team</h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '40px'
        }}>
          <div style={{
            flex: '1 1 300px',
            textAlign: 'left',
            maxWidth: '400px'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <img 
                src="/image_0.png" 
                alt="Himanshu Joshi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)'
                }}
              />
            </div>
            <h2 style={{
              fontSize: '1.2em',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              <a 
                style={{ textDecoration: 'none', color: '#fff' }} 
                href="https://www.linkedin.com/in/himanshu-joshi-535b4127b"
              >
                Himanshu Joshi
              </a>
            </h2>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              lineHeight: 1.5,
              fontSize: '0.9em'
            }}>
              <li style={{ marginBottom: '10px' }}>
              Focused on designing clean, scalable, and delightful digital products. 
              </li>
              <li style={{ marginBottom: '10px' }}>
              UI/UX principles, and innovative development practices.
              </li>
              <li style={{ marginBottom: '10px' }}>
              Continuously leveling up with the latest in web technologies  </li>
              
            </ul>
          </div>

          <div style={{
            flex: '1 1 300px',
            textAlign: 'left',
            maxWidth: '400px'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <img 
                src="/image_1.png" 
                alt="Modi"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  objectPosition: 'right center'
                }}
              />
            </div>
            <h2 style={{
              fontSize: '1.2em',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              <a 
                style={{ textDecoration: 'none', color: '#fff' }} 
                href="https://www.linkedin.com/in/krishnkant-modi-2b82b52b4/"
              >
                Kirshnkant Modi
              </a>
            </h2>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              lineHeight: 1.5,
              fontSize: '0.9em'
            }}>
              <li style={{ marginBottom: '10px' }}>Top CS student at University</li>
              <li style={{ marginBottom: '10px' }}>Passionate Developer who love to build new things by code.</li>
              <li style={{ marginBottom: '10px' }}>Solving Problem That doesn't even exists</li>
            </ul>
          </div>

          <div style={{
            flex: '1 1 300px',
            textAlign: 'left',
            maxWidth: '400px'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '20px'
            }}>
              <img 
                src="/image_2.png" 
                alt="Gurudatt"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                  objectPosition: 'right center'
                }}
              />
            </div>
            <h2 style={{
              fontSize: '1.2em',
              marginBottom: '10px',
              textTransform: 'uppercase'
            }}>
              <a 
                style={{ textDecoration: 'none', color: '#fff' }} 
                href="https://www.linkedin.com/in/gurudatt-choudhary"
              >
                Gurudatt Choudhary
              </a>
            </h2>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '20px',
              lineHeight: 1.5,
              fontSize: '0.9em'
            }}>
              <li style={{ marginBottom: '10px' }}>Cyber Security Researcher</li>
              <li style={{ marginBottom: '10px' }}>Ethical Hacker who love to break the code </li>
              <li style={{ marginBottom: '10px' }}>Give brain pain to developers</li>
            </ul>
          </div>
        </div>
      </div>

      <footer style={{
        padding: '20px',
        textAlign: 'center',
        fontSize: '0.8em'
      }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px', textTransform: 'uppercase' }}>Home</a>
    
        <a href="/team" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px', textTransform: 'uppercase' }}>Team</a>
      </footer>
    </div>
  );
};

export default Team;
