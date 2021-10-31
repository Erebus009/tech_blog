const router = require("express").Router();
const  {User,Post,Comment}  = require("../models");






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
        console.log(posts);
        res.render('homepage', {posts})
    }).catch((err) => {
        res.status(500).json(err)

    })
})

  







module.exports = router;
