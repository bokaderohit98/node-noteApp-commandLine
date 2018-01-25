const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (err) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes), function (err) {
			if (err) {
				console.log("error writing to file");
			}
		});
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body,
	};	

	var duplicateNotes = notes.filter((note) => note.title === title);

	if (duplicateNotes.length == 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	var notes = fetchNotes();
	return notes;
};

var getNote = (title) => {
	var notes = fetchNotes();
	var filteredNote = notes.filter((note) => note.title === title);
	return filteredNote[0];
};

var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes); 

	return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
	console.log('----');
	console.log('Title: ', note.title);
	console.log('Body:  ', note.body);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote,
};