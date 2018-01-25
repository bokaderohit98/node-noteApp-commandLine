const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
			describe: 'Title of note',
			demand: true,
			alias: 't'
};

const bodyOptions = {
			describe: 'Body of note',
			demand: true,
			alias: 'b'
};

const argv = yargs
	.command('add', 'Add a new note',{
		title : titleOptions,
		body: bodyOptions
	})
	.command('list', 'List all notes')
	.command('read', 'Read an individual note', {
		title :titleOptions
	})
	.command('remove', 'Remove an individual note', {
		title : titleOptions
	})
	.argv;

var command = argv._[0];

if (command === 'add') {
	var note = notes.addNote(argv.title, argv.body);

	if (note != null) {
		console.log('Node Created');
		notes.logNote(note);
	} else {
		console.log('Title already exist');
	}

} else if (command === 'list') {
	var allNotes = notes.getAll();
	if (allNotes === []) {
		console.log('No Note Exist');
	} else {
		console.log(`Printing ${allNotes.length} Notes`);
		allNotes.forEach((note) => notes.logNote(note));
	}

} else if (command === 'read') {
	var note = notes.getNote(argv.title);

	if (note != null) {
		console.log('Note:');
		notes.logNote(note);
	} else {
		console.log(`Note ${argv.title} doesn't Exist`);
	}

} else if (command === 'remove') {

	if (notes.removeNote(argv.title)) {
		console.log(`Note ${argv.title} Removed`);
	} else {
		console.log('Note not removed');
	}

} else {
	console.log('Command not recognised');
};