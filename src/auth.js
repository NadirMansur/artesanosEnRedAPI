require("dotenv").config();
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const { User } = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // callbackURL: "http://localhost:5173/auth/google/callback", //modificar luego tanto aqui como en la consola de apps google
      callbackURL: "http://localhost:3001/auth/google/callback", //modificar luego tanto aqui como en la consola de apps google
      scope: ["profile"],
      state: true,
    },

    async function (accessToken, refreshToken, profile, cb) {
      try {
        //// revisar ////
        //console.log("Perfil de Google:", profile);
        const [user, created] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            googleId: profile.id,
            displayName: profile.displayName,
            familyName: profile.name.familyName,
            givenName: profile.name.givenName,
            photo: profile.photos[0].value,
            sub: profile._json.sub,
          },
        });
        console.log("usaurio creado user", user);
        console.log("usaurio creado created", created);
        //// revisar ////
        if(user) return cb(null, user);
        if(created) return cb(null, created);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
