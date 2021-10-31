const router = require("express").Router();
const passwordAuth = require('../utils/passwordAuth')
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', passwordAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
    })
      .then(PostData => {
        const posts = PostData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });





module.exports = router;
