const passwordAuth = require("../../utils/passwordAuth");

const router = require("express").Router();


router.get('/', (req, res) => {
    Comment.findAll({})
      .then(CommentData => res.json(CommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', passwordAuth, (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
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
