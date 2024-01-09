const router = require('express').Router();
const store = require('../db/store');

// Many routes are commented out because of issues that will be resolved later 
// but the code itself is good progress to improving the code structure
// separating error handling makes the code look cleaner and more compact

// Updated get route with better error handling
// router.get('/notes', async (req, res, next) => {
//   try {
//     const notes = await dbStore.fetchNotes();
//     res.json(notes);
//   } catch (err) {
//     next(err);
//   }
// });

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

// Updated post route with better error handling
// router.post('/notes', async (req, res, next) => {
//   try {
//     const note = await dbStore.addNote(req.body);
//     res.json(note);
//   } catch (err) {
//     next(err);
//   }
// });

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

// Updated put route with better error handling
// router.put('/notes/:id', async (req, res, next) => {
//   try {
//     const note = await dbStore.updateNote(req.params.id, req.body);
//     res.json(note);
//   } catch (err) {
//     next(err);
//   }
// });

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

// updated delete route with better error handling
// router.delete('/notes/:id', async (req, res, next) => {
//   try {
//     await dbStore.removeNote(req.params.id);
//     res.json({ ok: true });
//   } catch (err) {
//     next(err);
//   }
// });

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

// Error handling middleware
// Didn't work so try it again later
// router.use((err, req, res, next) => {
//   res.status(404).json({ error: err.message });
// });

module.exports = router;
