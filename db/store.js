// node.js module "util" used for javascript object manipulation (access to utility functions)
const util = require('util');

// fs used for interacting with file system. (read/write to files, create directories, etc)
const fileSystem = require('fs');

// TO use unique ids
// In terminal, do: npm i uuid
// This is how you install the node packages
// Difference between import and require?
// https://stackoverflow.com/questions/74172640/error-err-package-path-not-exported-package-subpath-is-not-defined-by-export
const { v4: uuidv4 } = require('uuid');

// util.promisify allows us to convert readFile method to a function that returns a promise
// readFile is a callback based method, but now that we use promisify, we can then also use async/wait .then() syntax
const readFileAsync = 
util.promisify(fileSystem.readFile);
const writeFileAsync = util.promisify(fileSystem.writeFile);



class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }
  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  // Retrieve our notes using the read method
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
           // parse the retrieved notes as JSON, and then merge the arrays to return them as a new combined array
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        // If there is an error during parsing, return an empty array
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNote(note) {
    // destructuring input object to extract title and text properties from the note (which is passed in as an argument)
    const { title, text } = note;
    // validation check; if EITHER || (not AND &&) title or text is empty, then handle then throw error
    if (!title || !text) {
      throw new Error("Can't have empty input");
    }

    // this.read().then((notes) => {
      // Add a unique id to the note using uuid package
      const newNote = { title, text, id: `note-${uuidv4()}`};
      return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    // });

  }

  // Fields to update object is where we retrieve the altered values
  updateNote(id, fieldsToUpdate) {
    // updates notes based on its specific id
    return this.getNotes()
    // Map over each note in the array of notes
      .then((notes) => notes.map((note) => {
        // checking if the note id matches the provided id
        if (note.id == id) {
          return {
            // spreads existing note to create a new updated note object,
            ...note, 
            // changing the old title value to the new title value
           title: fieldsToUpdate.title,
          //  changing the old text value to the new text value
           text: fieldsToUpdate.text,
          };
        } else {
          return note;
        }
      }))
      // write this updated note back into data storage
      .then((mappedNotes) => this.write(mappedNotes));
  }

  removeNote(id) {
    return this.getNotes()
    // grab an array of notes, and use the filter method to create a new array that removes the provided id. (Filters out the note which had its id match the argument id)
    // Now we will be left with an array that only contains non-deleted notes
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
      // The new array is written back to data storage
  }
};

module.exports = new Store();