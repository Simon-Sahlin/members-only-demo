const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require('./db/database');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const rows = await db.getUserFromUsername(username);
            const user = rows[0];
    
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password_digest)
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const rows = await db.getUserWhere(id);
        const user = rows[0];
    
        done(null, user);
    } catch(err) {
        done(err);
    }
});