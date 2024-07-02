export const sendInvitationTeam = (memberEmail, teamName, memberName) => {
  const emailData = {
    to: `${memberEmail}`,
    subject: `Fuiste añadido a un equipo. | Esencia.app`,
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
            <p class='subtitle'>¡Hola <strong>${memberName}</strong>!</p>
            <p class='subtitle'>Fuiste añadido al equipo <strong>${teamName}</strong>.</p>
     
            <div class='logo-container'>
                <img class='logo' src='https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1704312320/ESENCIA_LOGO_mbsjht.png' />
                <a href='https://esencia.app'>Esencia.app</a>
            </div>
        </div>
    </body>
    
    </html>`,
  };

  return emailData;
};
