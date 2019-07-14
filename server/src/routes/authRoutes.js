const passport = require('passport');

module.exports = function authRoutes(app) {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', function(req, res) {
    res.send(req.user);
  });
};
