const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 
         '../public/notes.html'));
  });

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 
         '../public/index.html'));
  });
//   This is the "catch-all" route because any non described route will get sent here due to the *. 
  
module.exports = router;
