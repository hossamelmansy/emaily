const { chain } = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = require('../models/Survey');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const sendEmail = require('../services/sendMail');

module.exports = function(app) {
  app.get('/api/surveys/:surveyId/:choice', function(req, res) {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', function(req, res) {
    var p = new Path('/api/surveys/:surveyId/:choice');

    chain(req.body)
      .map(function({ email, url }) {
        var match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(function({ surveyId, email, choice }) {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email: email, responded: false } }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async function(
    req,
    res
  ) {
    var { title, subject, body, recipients } = req.body;

    var survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    try {
      await sendEmail(survey, surveyTemplate(survey));
      await survey.save();
      req.user.credits -= 1; // eslint-disable-line
      var user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
