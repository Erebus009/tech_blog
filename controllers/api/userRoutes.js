const { User } = require('../../models');

const router = require('express').Router();



router.post('/user', async (req,res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email : req.body.email,
            password: req.body.password

        })
    }

})





module.exports = router;