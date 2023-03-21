const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { Users } = require("../dataLayer/config/dbConfig");
const { JWT_SECRET } = require("../utils/constants");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, done) => {
      Users.findOne({ userName: userName }, function (err, user) {
        if (err) {
          console.log("ERR::", err);
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        console.log("jwtPayload:", jwtPayload);
        const user = await Users.findOne({ userName: jwtPayload.userName });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
