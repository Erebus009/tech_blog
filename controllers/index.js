const router = require("express").Router();

const apiRoute = require("./api");
const homeRoute = require("./homeRoute.js");
const postsRoute = require("./allPosts.js");

router.use("/", homeRoute);
router.use("/api", apiRoute);
router.use("/posts", postsRoute);

router.use((req,res) => {
    res.status(404).render('404page')
})



module.exports = router;
