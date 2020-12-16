const app = require("express");
const router = app.Router();
const axios = require("axios");
const API_KEY = "ENTER YOUR API KEY";

router.get("/", async (req, res) => {
  if (req.query.s === "" || req.query.s) {
    await axios.default
      .get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${req.query.s}`)
      .then(({ data: { Response, Search, Error } }) => {
        if (Response === "False") return res.json({ Response, Error });
        res.json(Search);
      });
  } else if (req.query.i) {
    await axios.default
      .get(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${req.query.i}`)
      .then((result) => res.json(result.data));
  }
});

module.exports = router;
