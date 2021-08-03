const nodemailer = require('nodemailer');

const welcomeMail = require('./mails/welcome');

const transporter = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE,
  host: process.env.MAILER_HOST,
  auth: {
    user: process.env.MAILER_USER_SERVER,
    pass: process.env.MAILER_PASS_SERVER,
  },
});

const sendWelcomeMail = (name, email, userId, codeVerificationAccount) => {
  transporter.sendMail(
    welcomeMail(name, email, userId, codeVerificationAccount),
    (err, info) => {
      if (err) console.log('Error enviando email:', err);
    }
  );
};

module.exports = {
  sendWelcomeMail,
};
