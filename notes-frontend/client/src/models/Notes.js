import axios from 'axios';
import config from '../utils/config';

const getAll = async () => {
    const notes = await axios.get(`${config.baseUrl}/api/notes`);
    return notes.data;
};

const addNote = async (note) => {
    const newNote = await axios.post(`${config.baseUrl}/api/notes`, note);
    return newNote.data;
};

const updateNote = async (id, note) => {
    const updatedNote = await axios.put(`${config.baseUrl}/api/notes/${id}`, note);
    return updatedNote.data;
};

export default {
    getAll,
    addNote,
    updateNote,
};
