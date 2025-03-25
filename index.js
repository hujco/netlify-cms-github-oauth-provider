const express = require('express');
const simpleOauthModule = require('simple-oauth2');
const authMiddleWareInit = require('./auth.js');
const callbackMiddleWareInit = require('./callback');

const oauthProvider = process.env.OAUTH_PROVIDER || 'github';
const loginAuthTarget = process.env.AUTH_TARGET || '_self';

const config = {
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.GIT_HOSTNAME || 'https://github.com',
    tokenPath: process.env.OAUTH_TOKEN_PATH || '/login/oauth/access_token',
    authorizePath: process.env.OAUTH_AUTHORIZE_PATH || '/login/oauth/authorize',
  },
};

const oauth2 = new simpleOauthModule.AuthorizationCode(config);
const app = express();

function indexMiddleware(req, res) {
  res.send(`Hello<br>
    <a href="/auth" target="${loginAuthTarget}">
      Log in with ${oauthProvider.toUpperCase()}
    </a>`);
}

app.use('/', indexMiddleware);

app.use('/auth', authMiddleWareInit(oauth2));
app.use('/callback', callbackMiddleWareInit(oauth2, oauthProvider));
app.use('/success', (req, res) => {
  res.send('');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Netlify CMS OAuth proxy running on port ${port}`);
});
