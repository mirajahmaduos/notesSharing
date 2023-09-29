const express = require("express");
const Note = require('../models/Note');
const router = express();

router.get('/:userId', async (req, res) => {
    console.log('my notes api triggered....');
    const notes = await Note.find({user:req.params.userId}).populate({path: 'user', model: 'Users'}).exec();
    if(notes.length > 0){
         res.json(notes);
        console.log('getting my notes backend', notes);
    }else{
         res.json("no notes found");
    }
});

module.exports = router;


