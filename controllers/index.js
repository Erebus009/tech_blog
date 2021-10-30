const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./homeRoute.js');
const postsRoute = require('./allPosts.js');
const notFound = require('./404page.js');


router.use("/",homeRoute);
router.use("/api",apiRoute);
router.use("/posts",postsRoute);
router.use('/404', notFound);



module.exports = router;