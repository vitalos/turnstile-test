var express = require('express');
var router = express.Router();

router.options('/', function(req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

router.post('/', async function(req, res) {
  const body = JSON.parse(req.body);
  const turnstileResponse = body.turnstileResponse;
  const challengeBody = JSON.stringify({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: turnstileResponse,
  });
  await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: challengeBody,
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
        return res.json({
          success: false,
          error: data['error-codes'],
        });
      }
    })
    .catch((error) => {
      console.error('Error verifying Turnstile response:', error);
      return res.json({
        success: false,
        error: 'Verification failed',
      });
    });

  res.json({
    success: true,
  });
});

module.exports = router;
