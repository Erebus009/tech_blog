const router = require("express").Router();

const apiRoute = require("./api");
const homeRoute = require("./homeRoute");
const profileRoute = require("./profileRoute");

router.use("/", homeRoute);
router.use("/api", apiRoute);
router.use("/profile", profileRoute);

router.use((req,res) => {
    res.status(404).render('404page')
})



module.exports = router;
