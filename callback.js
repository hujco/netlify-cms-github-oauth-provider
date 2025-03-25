const express = require('express');

module.exports = function(oauth2, provider) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const code = req.query.code;
    if (!code) {
      console.error('No code provided.');
      return res.status(400).json('No code provided');
    }

    const redirect_uri = process.env.REDIRECT_URI;
    if (!redirect_uri) {
      console.error('Environment REDIRECT_URI is not set.');
      return res.status(500).json('Server misconfiguration');
    }

    const options = {
      code,
      redirect_uri,
    };

    try {
      const result = await oauth2.getToken(options);
      const token = result.token.access_token;
      res.redirect(`/success#access_token=${token}&provider=${provider}`);
    } catch (error) {
      console.error('Access Token Error:', error.message);
      res.status(500).json('Authentication failed');
    }
  });

  return router;
};
