const passport = require("passport");

const authenticateGoogle = passport.authenticate('google', { scope: ['profile', 'email'] });


const googleAuthCallback = passport.authenticate("google", {
	successRedirect: "/auth/google/success",
	failureRedirect: "http://localhost:3000/auth" // Redirect on authentication failure
});


module.exports = {authenticateGoogle, googleAuthCallback };
