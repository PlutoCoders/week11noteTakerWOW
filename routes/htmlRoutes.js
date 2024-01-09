const path = require('path');
// express.Router() allows us a way to create and manage routes in our web app
// We can't access the methods from express unless we import in ecpress. 
// These methods allow us to create router objects, define routes, etc.
// Here are some basic HTTP Methods for Handling: app.get(), app.post(), app.put(), app.delete(), app.patch()
const router = require('express').Router();

// In this file we are making a get request when the user hits the /notes route, and the note.html file is sent as a response. (This is the page we get directed to)
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 
         '../public/notes.html'));
  });

  //   This is the "catch-all"/home route because any non described route will get sent here due to the *. 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 
         '../public/index.html'));
  });

  
module.exports = router;
