var express = require('express');
var router = express.Router();

function corsHeaders(res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
}

router.options('/', function(req, res) {
  corsHeaders(res);
  res.sendStatus(200);
});

router.post('/', async function(req, res) {
  corsHeaders(res);
  
  const body = req.body;
  const turnstileResponse = body.response;
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
      } else {
        return res.json({
          success: true,
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
});

module.exports = router;
