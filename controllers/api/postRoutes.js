const { Post, User } = require("../../models");
const passwordAuth = require('../../utils/passwordAuth')
const router = require("express").Router();





router.get('/', async (req,res) => {
    Post.findAll({attributes:
        [
        'id',
        'title',
        'content',
        'created_at'
        ],
        order:[['created_at','ASC']],
            include: [{
                model:User,
                attributes: ['username']

                
            }]

            
            

    }).then((PostData) => res.json(PostData))
    .catch(err => {
        res.status(500).json(err)
    })

    

})


router.get('/:id', async (req,res) => {
 Post.findOne(req.params.id).then((PostData) => res.json(PostData)).catch((err) =>{
     res.status(500).json(err)
 })
    

})





    router.post('/', (req, res) => {
        Post.create({
          title: req.body.title,
          content: req.body.content,
          user_id: req.session.user_id
        })
          .then(PostData => res.json(PostData))
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
    });







module.exports = router;
