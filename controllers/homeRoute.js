const router = require("express").Router();
const  {User,Post,Comment}  = require("../models");
const { body, validationResult } = require('express-validator');
const passwordAuth = require('../utils/passwordAuth')




router.get('/', (req, res) => {
    Post.findAll({
        
        attributes: [
            'id',
            'content',
            'title',
            'created_at',
          ],

        order: [[ 'created_at', 'DESC']],
       
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        const posts = postData.map(post => post.get({plain:true}));
        res.render('homepage', {posts})
    }).catch((err) => {
        res.status(500).json(err)

    })
})





  
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return
      
    }
  
    res.render('signup');
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return
      
    }
  
    res.render('login');
  });

  router.get('/logout', passwordAuth, (req,res) => {
    if(req.session.loggedIn){
      req.session.destroy(() => {
        res.status(200).redirect('/login')
      })
    }
  })



module.exports = router;
