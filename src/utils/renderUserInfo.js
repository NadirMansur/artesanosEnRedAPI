const renderUserInfoPage = (user) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .container{
        width: 31rem;
        height: 37rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        algin-self: center;
      }
      .welcome-message {
        font-size: 20px;
        margin-bottom: 20px;
      }
      .user-info {
        margin-bottom: 20px;
      }
      .user-photo {
        border-radius: 50%;
        margin-top: 10px;
      }
      .close-button {
        padding: 10px;
        background-color: #4285f4;
        color: white;
        cursor: pointer;
        border: none;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
  <div class="container">
  <div class="welcome-message">¡Bienvenido, ${user.displayName}!</div>
  <div class="user-info">
    <div class="user-photo">
      <img src="${user.photo}" alt="User Photo" width="100" height="100">
    </div>
  </div>
  <button class="close-button" onclick={redirectToCallback('${user.googleId}')}>Cerrar</button>
  </div>
    <script>
      function saveToLocalStorage(userData) {
        if (userData && userData.user) {
          localStorage.setItem("userData", JSON.stringify(userData.user));
        }
      }
        function redirectToCallback(googleId) {
          // Redirige a la nueva URL con el googleId como parámetro de consulta
          console.log("redirectToCallback");
          window.location.href = \`http://localhost:5173/auth/google/callback?googleId=\${googleId}\`;
        }
    </script>
  </body>
  </html>
`;

module.exports = renderUserInfoPage;
