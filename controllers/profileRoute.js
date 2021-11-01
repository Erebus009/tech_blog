const router = require("express").Router();
const passwordAuth = require('../utils/passwordAuth')
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const session = require("express-session");
const { destroy } = require("../models/User");

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
        attributes:['username',]
        }
      ]
    })
      .then(PostData => {
        const posts = PostData.map(post => post.get({ plain: true }));
        res.render('profile', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        
        res.status(500).redirect('/signup');
        
      });
  });

  router.get('/createPost',(req,res) => {
    res.render('newPost')
  })
  
  
  
  
  
  
  router.get('/edit/:id', passwordAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});
  
 
   


module.exports = router;
