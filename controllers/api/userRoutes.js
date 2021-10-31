const { User } = require("../../models");
const passwordAuth = require('../../utils/passwordAuth')
const router = require("express").Router();

router.get("/", async (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//===============================
// DELETE user by id from DATABASE
//===============================


router.delete("/:id", async (req, res) => {
  User.destroy({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
  }).then((UserData) => {
    if (!UserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(UserData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

//==============================
//Post new user to api/users that targets into mysql user table in database
//=============================
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    
  })
  .then(userData => {
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
  
      res.json(userData);
    });
  });
});



router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(userData => {
    if (!userData) {
      res.status(400).json({ message: 'No user with this email address' });
      return;
    }
    

    


    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Wrong password' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are logged in' });
    });
  });
});







router.get("/:id", async (req, res) => {
  const userID = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!userID) {
    res.status(404).json({ message: "No user with this ID found" });
    return;
  }
  const user = userID.get({ plain: true });
  res.json(user);
});

module.exports = router;
