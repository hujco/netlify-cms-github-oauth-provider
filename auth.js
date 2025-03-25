const express = require('express');
const randomstring = require('randomstring');

module.exports = (oauth2) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const authorizationUri = oauth2.authorizeURL({
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.SCOPES || 'repo,user',
      state: randomstring.generate(32),
    });

    res.redirect(authorizationUri);
  });

  return router;
};
