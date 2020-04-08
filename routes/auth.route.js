const passport = require("passport");
const keys = require("../config/keys");

module.exports = app => {

    /**
     * GOOGLE OAUTH
     */
    app.get("/auth/google",
        passport.authenticate('google', { scope: ['profile', 'email'] })
    )

    app.get("/auth/google/callback",
        passport.authenticate('google', { failureRedirect: '/login' }),
        (req, res) => {
            res.redirect(`${keys.redirectDomain}`);
        }
    );

    app.get("/auth/current-user", (req, res) => {
        return res.json(req.user);
    });
    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.end();
    });

    /**
     * FACEBOOK OAUTH
     */

    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        (req, res) => {
            res.redirect(`${keys.redirectDomain}`);
        }
    );
}