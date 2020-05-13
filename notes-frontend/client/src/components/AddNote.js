import React, { useState } from 'react';
import notesModel from '../models/Notes';

const AddNote = (props) => {
    const [value, setValue] = useState('');
    const [importantVal, setImportantVal] = useState(false);

    const handleChange = (evt) => {
        setValue(evt.target.value);
    };

    const handleImportantChange = (evt) => {
        setImportantVal(evt.target.checked);
    };

    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        const newNote = {
            content: value,
            data: new Date(),
            important: importantVal,
        };

        notesModel.addNote(newNote)
            .then((result) => {
                props.setNotes(props.notes.concat(result));
                setValue('');
                setImportantVal(false);
                props.notify('New note added successfully', 'info');
            });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>Add new</h1>
            <p>
                {'Content '} 
                <input value={value} onChange={handleChange} />
            </p>
            <p>
                {'Important '}
                <input checked={importantVal} onChange={handleImportantChange} type='checkbox'/>
            </p>
            <button type='submit'>Add</button>
        </form>
    );
};

export default AddNote;