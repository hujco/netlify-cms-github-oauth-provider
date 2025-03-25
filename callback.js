const express = require('express');

module.exports = function(oauth2, provider) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const code = req.query.code;
    console.log("OAuth Code od GitHubu: ", code);

    if (!code) {
      console.error("Chýbajúci OAuth kód v URL");
      return res.status(400).json("Chýbajúci OAuth kód");
    }

    const redirect_uri = process.env.REDIRECT_URI;
    const origin = process.env.ORIGIN;

    if (!redirect_uri || !origin) {
      console.error("Chýbajúca konfigurácia ENV premenných");
      return res.status(500).json('Nesprávna konfigurácia servera');
    }

    try {
      const result = await oauth2.getToken({code, redirect_uri});
      const token = result.token.access_token;

      console.log("Token od GitHubu: ", token);

      // presný redirect s hash "#" na /success stránku
      res.redirect(`${origin}/success#access_token=${token}&provider=${provider}`);

    } catch (e) {
      console.error("Error v OAuth (chyba pri získavaní tokenu):", e);
      res.status(500).json('Authentifikácia zlyhala.');
    }
  });

  return router;
};
