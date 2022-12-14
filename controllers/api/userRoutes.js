const router = require('express').Router();
const { User, Blog, Comment} = require('../../models');

//get all users
router.get('/',(req,res)=>{
  User.findAll({
      include:[Blog, Comment]
  }).then(userData=>{
      res.json(userData)
  }).catch(err=>{
      res.status(500).json({msg:"An error has occurred",err})
  })
})

//create user
router.post('/', async (req,res) => {
    try {
        const userData = await User.create(req.body);
        // res.status(200).json(userData)
        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;

            res.status(200).json(userData)
        })
    }catch (err) {
        res.status(400).json(err)
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    // res.json({ user: userData, message: 'You are now logged in!' });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

//logout user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// router.post('/logout', (req, res) => {
//     if (req.logged_in) {
//       req.destroy(() => {
//         res.status(204).end();
//       });
//     } else {
//       res.status(404).end();
//     }
//   });

module.exports = router;