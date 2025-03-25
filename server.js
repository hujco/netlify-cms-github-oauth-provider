const express = require('express');
const { auth, callback, success, index } = require('./index.js'); // z pôvodného vencax modulu

const app = express();

app.use('/auth', auth);
app.use('/callback', callback);
app.use('/success', success);
app.get('/', index);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Netlify CMS OAuth proxy running on port ${port}`);
});
