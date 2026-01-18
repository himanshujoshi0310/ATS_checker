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
        padding: '60px',
        maxWidth: '1800px',
        margin: '0 auto',
        flex: 1
      }}>
        <h1 style={{
          textAlign: 'left',
          fontSize: '3em',
          marginBottom: '60px'
        }}>Team</h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '60px'
        }}>
          <div style={{
            flex: '1 1 450px',
            textAlign: 'left',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '225px',
              height: '225px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '30px'
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
              fontSize: '1.8em',
              marginBottom: '15px',
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
              paddingLeft: '30px',
              lineHeight: 1.5,
              fontSize: '1.35em'
            }}>
              <li style={{ marginBottom: '15px' }}>
                Generalist: sports (national futsal), gaming (EU semi-pro in Fortnite and PUBG)
              </li>
              <li style={{ marginBottom: '15px' }}>
                Built several online communities with thousands of users and sold thousands of premium software licenses.
              </li>
            </ul>
          </div>

          <div style={{
            flex: '1 1 450px',
            textAlign: 'left',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '225px',
              height: '225px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '30px'
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
              fontSize: '1.8em',
              marginBottom: '15px',
              textTransform: 'uppercase'
            }}>
              <a 
                style={{ textDecoration: 'none', color: '#fff' }} 
                href="https://www.linkedin.com/in/krishnkant-modi-2b82b52b4/"
              >
                Krishnkant Modi
              </a>
            </h2>
            <ul style={{
              listStyleType: 'disc',
              paddingLeft: '30px',
              lineHeight: 1.5,
              fontSize: '1.35em'
            }}>
              <li style={{ marginBottom: '15px' }}>Top CS student at University of Warsaw</li>
              <li style={{ marginBottom: '15px' }}>Two-time medalist at the Polish Informatics Olympiad</li>
              <li style={{ marginBottom: '15px' }}>Youngest dev on HFT core team at Match-Trade</li>
            </ul>
          </div>

          <div style={{
            flex: '1 1 450px',
            textAlign: 'left',
            maxWidth: '600px'
          }}>
            <div style={{
              width: '225px',
              height: '225px',
              borderRadius: '50%',
              overflow: 'hidden',
              marginBottom: '30px'
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
              fontSize: '1.8em',
              marginBottom: '15px',
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
              paddingLeft: '30px',
              lineHeight: 1.5,
              fontSize: '1.35em'
            }}>
              <li style={{ marginBottom: '15px' }}>Top CS student at University of Warsaw</li>
              <li style={{ marginBottom: '15px' }}>Two-time medalist at the Polish Informatics Olympiad</li>
              <li style={{ marginBottom: '15px' }}>Youngest dev on HFT core team at Match-Trade</li>
            </ul>
          </div>
        </div>
      </div>

      <footer style={{
        padding: '30px',
        textAlign: 'center',
        fontSize: '1.2em'
      }}>
        <a href="/" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px', textTransform: 'uppercase' }}>Home</a>
        <a href="#" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px', textTransform: 'uppercase' }}>Thesis</a>
        <a href="/team" style={{ color: '#fff', textDecoration: 'none', margin: '0 15px', textTransform: 'uppercase' }}>Team</a>
      </footer>
    </div>
  );
};

export default Team;
