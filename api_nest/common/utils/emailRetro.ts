export const sendRetroMail = (
  token,
  teamId,
  memberName,
  memberEmail,
  memberId,
  teamName,
) => {
  const emailRetro = {
    to: `${memberEmail}`,
    subject: `${memberName} fuiste a invitado a la retro del equipo ${teamName} `,
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
                      height: 400px;
                      background: url(https://res.cloudinary.com/di92lsbym/image/upload/e_brightness:-22/v1704404004/marissa-grootes-H0YxjMzc6ZQ-unsplash_1_b5xy9r.png) center center/cover no-repeat;
                      border-radius: 14px;
                      position: relative;
                  }
          
                  .container .title,
                  .container .subtitle {
                      color: whitesmoke;
                      text-align: center;
                      font-family: 'Poppins', sans-serif;
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
                      width: 70px;
                      height: 70px;
                      text-align: center;
                  }
          
                  .logo-container {
                      width: 100%;
                      text-align: center;
                      justify-content: center;
                  }
          
                  .button-container {
                      position: absolute;
                      bottom: 20px;
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
                  }
              </style>
          </head>
          
          <body>
              <div class='container'>
                  <div class='logo-container'>
                      <img class='logo' src='https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1704312320/ESENCIA_LOGO_mbsjht.png' />
                  </div>
              
                  <h2 class='title'>Bienvenido ${memberName} a la retro de ${teamName}</h2>
                  <p class='subtitle'>Fuiste invitado a participar junto a tu equipo, completando una retroespectiva en tiempo real!</p>
                  <div class='button-container'>
                     <a class='access-button' href='https://esencia.app/members/retro?token=${token}&team_id=${teamId}&user_id=${memberId}' target='_blank'>Acceso a la retro</a>
                  </div>
              </div>
          </body>
          
          </html>`,
  };

  return emailRetro;
};
