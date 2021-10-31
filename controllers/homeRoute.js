const router = require("express").Router();
const  {User,Post,Comment}  = require("../models");







router.get("/", async (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'


        ],
        include: [{
            model: Comment,
            attributes: ['id','text_content','user_id','post_id']
        }
        ]

        
    })

  res.render("homepage");
});






module.exports = router;
