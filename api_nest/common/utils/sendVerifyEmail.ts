export const sendVerifyEmail = (memberName, memberEmail, token) => {
  const emailData = {
    to: `${memberEmail}`,
    subject: `Verifica tu correo para empezar a usar Esencia!`,
    from: `${process.env.SENDGRID_EMAIL}`,
    html: `<html>
            
                <head>
                    <title>Verificación de correo</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500&family=Poppins:wght@100;200;300;400;500&family=Wix+Madefor+Display&display=swap" rel="stylesheet">
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            font-family: 'Poppins', sans-serif;
                            color: black;
                            margin: 0;
                            padding: 0;
                            height: 100vh;
                            background-color: #f4f4f4;
                        }
                
                        .container {
                            width: 400px;
                            background: white;
                            border-radius: 14px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            text-align: center;
                        }
                
                        .title {
                            font-size: 24px;
                            font-weight: 500;
                            margin-bottom: 10px;
                        }
                
                        .subtitle {
                            font-size: 16px;
                            font-weight: 300;
                            margin-bottom: 15px;
                        }
                
                        .logo {
                            width: 100px;
                            margin: 20px auto;
                        }
                
                        .button-container {
                            margin-top: 20px;
                        }
                
                        .access-button {
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 5px;
                            cursor: pointer;
                            text-decoration: none;
                            display: inline-block;
                            font-size: 16px;
                        }
                
                        .access-button:hover {
                            filter: brightness(90%);
                        }
                
                        .footer {
                            margin-top: 30px;
                            font-size: 14px;
                            color: #555;
                        }
                    </style>
                </head>
                
                <body>
                    <div class="container">
                        <h1 class="title">Verificación de correo</h1>
                        <p class="subtitle">¡Hola <strong>${memberName}</strong>! Bienvenido a Esencia, nuestra plataforma para equipos. Estamos emocionados de tenerte con nosotros.</p>
                        <p class="subtitle">Por favor, haz clic en el botón de abajo para verificar tu correo electrónico y empezar a usar Esencia.</p>
                        <div class="button-container">
                           <a class="access-button" href='${process.env.FRONTEND_URL}/auth/verify-email?token=${token}' target='_blank'>Verificar correo</a>
                        </div>
                    
                    </div>
                </body>
                
                </html>`,
  };

  return emailData;
};
