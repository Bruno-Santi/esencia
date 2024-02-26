export const sendLoginEmail = (
  memberName,
  memberEmail,
  memberPassword,
  teamName,
) => {
  const emailData = {
    to: `${memberEmail}`,
    subject: `¡Bienvenido a ${teamName} en nuestra plataforma de Esencia para equipos!`,
    from: `${process.env.SENDGRID_EMAIL}`,
    html: `<html>
          
              <head>
                  <title></title>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&family=Poppins:wght@100;200;300;400;500&family=Wix+Madefor+Display&display=swap" rel="stylesheet">
                  <style>
                      body {
                          display: flex;
                          justify-content: center;
                      }
              
                      .container {
                          width: 400px;
                          height: auto;
                          background: none;
                          border-radius: 14px;
                          position: relative;
                          font-family: 'Poppins', sans-serif;
                          color: black;
                      }
              
                      .container .title,
                      .container .subtitle {
                          text-align: center;
                          text-shadow: 0px 3px 4px #000000;
                      }
              
                    .subtitle {
                          padding: 10px;
                          font-size: 15px;
                          font-weight: 300;
                          margin-bottom: 15px;
                      }
              
                      .logo {
                          margin: 15px;
                          padding: 10px;
                          width: 100px;
                          height: auto;
                          text-align: center;
                      }
              
                      .logo-container {
                          width: 100%;
                          text-align: center;
                          justify-content: center;
                          margin-top: 20px;
                          margin-bottom: 20px;
                      }
              
                      .button-container {
                          width: 100%;
                          text-align: center;
                      }
                      .button-container:hover {
                              filter: brightness(90%);
                          }
                      .access-button {
                          padding: 10px 20px;
                          background-color: #4CAF50;
                          color: white;
                          border: none;
                          border-radius: 5px;
                          cursor: pointer;
                          text-decoration: none;
                      }
                  </style>
              </head>
              
              <body>
                  <div class='container'>
                      <p class='subtitle'>¡Hola <strong>${memberName}</strong>! Bienvenido a Esencia, nuestra plataforma para equipos. Estamos emocionados de tenerte con nosotros.</p>
                      <p class='subtitle'>Fuiste invitado a participar en nuestra plataforma donde podrás trabajar en conjunto con tu equipo, comunicarte eficientemente y mucho más. Esperamos que tu experiencia sea increíble.</p>
                      <p class='subtitle'>A continuación, encontrarás tus credenciales de inicio de sesión:</p>
                      <p class='subtitle'><strong>Email:</strong> ${memberEmail}</p>
                      <p class='subtitle'><strong>Password:</strong> ${memberPassword}</p>
                      <div class='button-container'>
                         <a class='access-button' href='https://esencia.app/teams/login' target='_blank'>Iniciar sesión</a>
                      </div>
                      <div class='logo-container'>
                          <img class='logo' src='https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1704312320/ESENCIA_LOGO_mbsjht.png' />
                          <p>Esencia.app</p>
                      </div>
                  </div>
              </body>
              
              </html>`,
  };

  return emailData;
};
