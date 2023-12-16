// node.js module "util" used for javascript object manipulation (access to utility functions)
const util = require('util');
// fs used for interacting with file system. (read/write to files, create directories, etc)
const fileSystem = require('fs');

// util.promisify allows us to convert readFile method to a function that returns a promise
const readFileAsync = 
util.promisify(fileSystem.readFile);
// readFile is a callback based method, but now that we use promisify, we can then also use async/wait .then() syntax
const writeFileAsync = util.promisify(fileSystem.writeFile);
// Same thing goes for the writeFile

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

};

// need addNote

// need updateNote

// need deleteNote

module.exports = new Store();