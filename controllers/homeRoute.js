const router = require("express").Router();
const  {User,Post,Comment}  = require("../models");





router.get('/',  (req, res) => {
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
        
        res.render('homepage', {posts, loggedIn: req.session.loggedIn})
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

//==========================================================================================================================
// Logout and destory current session of User that passes checks to make sure it is the correct user session being destroyed.
//===========================================================================================================================

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'text_content', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username',]
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(PostData => {
      if (!PostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }


      const post = PostData.get({ plain: true });


      res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  })

module.exports = router;
