const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { JWT_SECRET } = require("./constants");

passport.use(
  new LocalStrategy(
    {
      usernameField: "userName",
      passwordField: "password",
    },
    async (userName, password, done) => {
      try {
        // Find the record from the DB with userName
        const user = {
          userName: "userName",
          password: "HASH",
          _id: "641924d91c413d35903f3374",
        };
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
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
        const user = {
          userName: "userName",
          password: "HASH",
          _id: "641924d91c413d35903f3374",
        };
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
