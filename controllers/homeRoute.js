const router = require("express").Router();
const { User } = require("../models");







router.get("/", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.status(500).json(err);
  });
  const user = userData.map((userinfo) => userinfo.get({ plain: true }));

  res.render("homepage", { user });
});






module.exports = router;
