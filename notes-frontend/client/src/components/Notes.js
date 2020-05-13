import React from 'react';
import notesModel from '../models/Notes';

const Note = ({note, updateNote, notify}) => {

    const toggleImportant = (evt) => {
        const copyNote = {...note};

        copyNote.important = !copyNote.important;

        console.log(copyNote);

        notesModel.updateNote(copyNote.id, copyNote)
            .then((updatedNote) => {
                updateNote(copyNote);
                notify(`Not updated successfully.`);
            })
            .catch((err) => {
                notify(`Error: ${err.message}`, 'error');
            })
    };

    return (
        <p>{note.content} - {note.date} - <button onClick={toggleImportant}>Change to {note.important ? 'important': 'unimportant'}</button></p>
    );
}

const Notes = ({ notes, updateNote, notify }) => {

    return (
        <ul>
            {notes.map((note) => (<Note updateNote={updateNote} notify={notify} key={note.id} note={note}/>))}
        </ul>
    );
};

export default Notes;