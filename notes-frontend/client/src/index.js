import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Notes from './components/Notes';
import AddNotes from './components/AddNote';
import Notification from './components/Notification';
import notesModel from './models/Notes';

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');

  // get all notes
  useEffect(() => {
      notesModel.getAll().then(result => {
          setNotes(result);
      });
  }, [])

  const updateNote = (note) => {
    const newNotes = notes.map((n) => n.id !== note.id ? n : note);
    setNotes(newNotes);
  }

  const updateNotification = (message='', type='info') => {
    setNotificationMessage(message);
    setNotificationType(type);
  }

  return (
    <>
      <Notification message={notificationMessage} type={notificationType} reset={setNotificationMessage} />
      <h1>Notes App</h1>
      <Notes updateNote={updateNote} notes={notes} notify={updateNotification} />
      <AddNotes setNotes={setNotes} notes={notes} notify={updateNotification} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);