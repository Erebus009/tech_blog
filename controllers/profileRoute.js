const router = require("express").Router();
const passwordAuth = require('../utils/passwordAuth')
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
      attributes:[
        'title',
        'id',
        'created_at',
        'content'

    ],
      where: {
        user_id: req.session.user_id
      },include:[ {
        model: User,
        attributes:['username']
        }
      ]
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

  router.get('/createPost',(req,res) => {
    res.render('newPost')
  })
  
  



module.exports = router;
