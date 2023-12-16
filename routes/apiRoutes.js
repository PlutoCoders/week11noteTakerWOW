const router = require('express').Router();
const store = require('../db/store');

// How can we make this code simpler using arrow functions?

// Ask for a note, show the notes (getNotes())
router.get('/notes', function(req, res) {
  store
    .getNotes()
    .then(function(notes) {
      return res.json(notes);
    })
    .catch(function(err) {
      return res.status(404).json(err);
    });
});

// User to add a new note, return the new note
router.post('/notes', function(req, res) {
  store
    .addNote(req.body)
    .then(function(note) {
      return res.json(note);
    })
    .catch(function(err) {
      return res.status(404).json(err);
    });
});

// User to change a note that already exists, check for which note is to be changed, (id of note), add in new info (title/text), remove old note and replace with new note, then show the updated note
router.put('/notes/:id', function(req, res) {
  store
    .updateNote(req.params.id, req.body)
    .then(function(note) {
      return res.json(note);
    })
    .catch(function(err) {
      return res.status(404).json(err);
    });
});

// The route name speaks for itself :)
router.delete('/notes/:id', function(request, response) {
  store
    .removeNote(request.params.id)
    .then(function() {
      return response.json({ ok: true });
    })
    .catch(function(err) {
      return response.status(404).json(err);
    });
});

module.exports = router;
