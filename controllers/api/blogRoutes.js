const router = require('express').Router();
const { Blog, Comment } = require('../../models');

router.get('/:id', (req, res)=>{
  Blog.findByPk(req.params.id, {
    include:Comment
  })
  .then((blog)=>{
      res.json(blog)
  }).catch ((err) => {
      console.log(err);
      res.status(500).json({err:err})
    })
})

router.post('/', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"login first joetato!"})
    }
    try {
      const newBlog = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.delete('/:id', async (req, res) => {
    if(!req.session.logged_in){
      return res.status(401).json({msg:"login first joetato!"})
    }
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;