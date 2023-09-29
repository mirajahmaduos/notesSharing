const express = require('express');
const router = express.Router();
const path = require('path');
const Note = require('../models/Note'); // Replace with your Note model import

// Endpoint to get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate({path:'user', model: 'Users'});
    
    const notesWithDownloadLinks = notes.map(note => ({
      ...note.toObject(),
      downloadLink: `/download/${note._id}` // Adjust this URL as needed
    }));
    console.log('notes with download links', notesWithDownloadLinks);
    res.json(notesWithDownloadLinks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to download a specific note by ID
router.get('/download/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const filePath = path.join(__dirname, '../upload', note.fileName); // Assuming your files are stored in the 'upload' directory
    res.download(filePath, note.fileName);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
