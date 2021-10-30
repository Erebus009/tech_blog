const { User } = require('../../models');

const router = require('express').Router();



router.get('/', async (req,res) => {
    User.findAll({
        attributes:{exclude:['password']}

    }).then((UserData) => res.json(UserData))
    .catch(err => {
        res.status(500).json(err)
    })

    

})




//==============================
//Post new user to api/users that targets into mysql user table in database
//=============================
router.post('/newuser', async (req,res) => {
    try {
        const newUserData = await User.create({
            username: req.body.username,
            email : req.body.email,
            password: req.body.password

        }) } catch(err) {
            res.status(500).json(err)
    }
    res.status(200).send('New user data created')
})

router.get('/:id', async (req,res) => {
    const userID = await User.findByPk(req.params.id,{attributes:{exclude:['password']}})
    if(!userID) {
        res.status(404).json({message:'No user with this ID found'})
        return;
    }
    const user = userID.get({plain:true})
    res.json(user)

})






module.exports = router;