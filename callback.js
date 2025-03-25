const express = require('express');

module.exports = function(oauth2, provider) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const code = req.query.code;
    const options = {
      code,
      redirect_uri: process.env.REDIRECT_URI,
    };

    try {
      const result = await oauth2.getToken(options);
      const token = result.token.access_token;
      res.redirect(`/success#access_token=${token}&provider=${provider}`);
    } catch (error) {
      console.error('Access Token Error', error.message);
      res.status(500).json('Authentication failed');
    }
  });

  return router;
};
