const express = require('express');

module.exports = function(oauth2) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const redirectUri = process.env.REDIRECT_URI;
    const authorizationUri = oauth2.authorizeURL({
      redirect_uri: redirectUri,
      scope: 'repo',
      state: Math.random().toString(36).substring(7)
    });

    res.redirect(authorizationUri);
  });

  return router;
};
