const app = require("express");
const router = app.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    if (req.query.s) {
      await axios.default
        .get(`http://www.omdbapi.com/?apikey=c8ecce7c&s=${req.query.s}`)
        .then((result) => res.json(result.data.Search));
    } else if (req.query.i) {
      await axios.default
        .get(`http://www.omdbapi.com/?apikey=c8ecce7c&i=${req.query.i}`)
        .then((result) => res.json(result.data));
    }
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
