const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { token } = JSON.parse(event.body);
  const params = new URLSearchParams();

  params.append('secret', process.env.RECAPTCHA_SECRET_KEY);
  params.append('response', token);

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
