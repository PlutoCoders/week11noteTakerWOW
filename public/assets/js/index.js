let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.noteList-container');
}

// Show an element
const show = (element) => {
  element.style.display = 'inline';
};

// Hide an element
const hide = (element) => {
  element.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const updateNote = (id, FieldsToUpdate) =>
  fetch(`/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(FieldsToUpdate),
  });

const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const renderActiveNote = (updatedNote) => {
  hide(saveNoteBtn);

  let title = updatedNote ? updatedNote.title : activeNote.title;
  let text = updatedNote ? updatedNote.text : activeNote.text;

  activeNote = {
    ...activeNote,
    title,
    text
  };

  if (activeNote.id) {
    // noteTitle.setAttribute('readonly', true);
    // noteText.setAttribute('readonly', true);
    noteTitle.value = title;
    noteText.value = text;
  } else {
    // noteTitle.removeAttribute('readonly');
    // noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

const handleNoteSave = () => {
  let shouldEditNote = Object.keys(activeNote).length > 0 && activeNote.id;
  if (shouldEditNote) {
     let noteFieldsToUpdate = {
      title: noteTitle.value,
      text: noteText.value,
    };
    updateNote(activeNote.id, noteFieldsToUpdate).then(() => {
      getAndRenderNotes();
      renderActiveNote(noteFieldsToUpdate);
    });
  } else {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value,
    };
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  }
};

// Delete the clicked note
const handleNoteDelete = (event) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (clickEvent) => {
  clickEvent.preventDefault();
  activeNote = JSON.parse(clickEvent.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (saveEvent) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let notesFromOurDBJson = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createNoteElement = (text, deleteButton = true) => {
    const noteContainer = document.createElement('li');
    noteContainer.classList.add(`note-container`, 'list-group-item',);

    const noteTextElement = document.createElement('span');
    noteTextElement.classList.add(`noteTextElement`,'list-item-title');
    noteTextElement.innerText = text;
    noteTextElement.addEventListener('click', handleNoteView);

    noteContainer.append(noteTextElement);

    if (deleteButton) {
      const deleteButtonIcon = document.createElement('i');
      deleteButtonIcon.classList.add(
        `deleteButtonIcon`,
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      deleteButtonIcon.addEventListener('click', handleNoteDelete);
      // delBtnEl.addEventListener('click', (deleteBtnClickEvent) => handleNoteDelete(deleteBtnClickEvent));

      noteContainer.append(deleteButtonIcon);
    }

    return noteContainer;
  };

  if (notesFromOurDBJson.length === 0) {
    noteListItems.push(createNoteElement('No saved Notes', false));
  }

  notesFromOurDBJson.forEach((note) => {
    const noteElement = createNoteElement(note.title);
    noteElement.dataset.note = JSON.stringify(note);

    noteListItems.push(noteElement);
  });

  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();

  $( function() {
    $( ".noteList-container" ).sortable();
  } );
