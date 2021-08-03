const welcomeMail = (name, email, userId, codeVerificationAccount) => {
  return {
    from: `"Saboreeeeeo" <${process.env.MAILER_MAIL}>`,
    to: email,
    subject: `${name}, ya eres parte de Saboreo`,
    html: `<h2>Prepárate para comer comida real :)<h2>
		<h4>Pero antes necesitamos que verifiques tu cuenta clicando
		<a href=http://${process.env.URL_APP}/users/verify?userId=${userId}&code=${codeVerificationAccount}>aquí</a></h4>`,
  };
};

module.exports = welcomeMail;
