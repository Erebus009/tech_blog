const router = require('express').Router();

const apiRoute = require('./api')
const homeRoute = require('./homeRoute.js')
const postsRoute = require('./allPosts.js')



router.use("/",homeRoute)
router.use("/api",apiRoute)
router.use("/posts",postsRoute)





module.exports = router;