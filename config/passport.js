var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 255910905221796,
    clientSecret: 'd260670de4135cdbeea5033903f818bb',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'username','displayName', 'photos', 'emails', 'birthday']

  },
  function(accessToken, refreshToken, profile, cb) {
  	console.log(profile);
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

module.exports=passport;