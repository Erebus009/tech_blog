const { User,Comment } = require("../../models");
const passwordAuth = require("../../utils/passwordAuth");

const router = require("express").Router();


router.get('/', (req, res) => {
    Comment.findAll({attributes:['id','text_content','user_id','post_id'], include:[{
      model: User,
      as:'user',
      attributes:['username'],
    }]})
      .then(CommentData => res.json(CommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "text_content", "user_id", "post_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  }) 
    .then((CommentData) => {
      if (!CommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});




router.post('/',(req, res) => {
  // check the session is valid
  if (req.session) {
    Comment.create({
      text_content: req.body.text_content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(CommentData => res.json(CommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete('/:id', passwordAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(CommentData => {
          if (!CommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(CommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});








module.exports = router;
