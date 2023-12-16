const router = require('express').Router();

// need a get for /notes
// need a post for /notes
// need a delete for /notes (but not all of notes, just the specific id of a note)
router.get('/path', (req, res) => {
    // callback function
    // (Route handler/middleware to be executed when the request matches a specific route)
    // Handle the GET request logic here
  });

  router.post('/path', (req, res) => {
    // call bunch function
    // We will handle the post here
  });

  router.delete('/path', (req, res) => {
    // callback function
    // We will handle the delete here
  });

module.exports = router;
