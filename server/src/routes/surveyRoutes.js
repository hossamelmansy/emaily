const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = require('../models/Survey');

module.exports = function(app) {
  app.post('/api/surveys', requireLogin, requireCredits, function(req, res) {
    var { title, subject, body, recipients } = req.body;

    var survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
