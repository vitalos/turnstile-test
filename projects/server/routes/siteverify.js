var express = require('express');
var router = express.Router();

router.post('/siteverify', async function(req, res, next) {
  const body = JSON.parse(req.body);
  const turnstileResponse = body.turnstileResponse;
  await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileResponse,
    }),
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
