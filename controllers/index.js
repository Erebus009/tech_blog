const router = require('express').Router()

const apiRoute = require('./api')
const homeRoute = require('./homeRoute')
const postsRoute = require('./allPosts')



router.use("/",homeRoute)
router.use("/api",apiRoute)
router.use("/posts",postsRoute)


router.use((res,res) => {
    res.status(404).redirect('/404page')
})


module.exports = router