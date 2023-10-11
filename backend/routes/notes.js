const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');



//ROUTE 1: ========== Get All the notes using: GET "/api/notes/getuser". Login required  =============

router.get('/fetchallnotes',fetchuser,async (req,res)=>{

    try {
        // Fetch all the notes where user id matches and store it to notes variable
        const notes = await Note.find({user: req.user.id})
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//ROUTE 2: ========== Add a new Note using: POST "/api/notes/addnote". Login required  =============

router.post('/addnote',fetchuser,[
    body('contact', 'Phone No must be atleast 10 characters').isLength({ min: 10 }),
   
],async (req,res)=>{

    try {
        const {rdate, subject,desc, email, contact,sms,d7,d5,d3,d2,status} = req.body;
        // If there are errors, return bad request ans the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            rdate, subject,desc, email, contact,sms,d7,d5,d3,d2,status, user: req.user.id
        })
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE 3: ==========Update an Existing Note using: PUT "/api/notes/updatenote". Login required  =============

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
        if(subject){newNote.subject = subject};
        const {rdate, subject,desc, email, contact,sms,d7,d5,d3,d2,status} = req.body;
    try {
        // Create a newNote object
        const newNote={};
        if(rdate){newNote.rdate = rdate};
        if(subject){newNote.subject = subject};
        if(desc){newNote.desc = desc};
        if(email){newNote.email = email};
        if(contact){newNote.contact = contact};
        if(sms){newNote.sms = sms};
        if(d7){newNote.d7 = d7};
        if(d5){newNote.d5 = d5};
        if(d3){newNote.d3 = d3};
        if(d2){newNote.d2 = d2};
        if(status){newNote.status = status};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        // Check , whether the author is changing the notes, If anyone else is trying to do so....send error
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})


//ROUTE 4: ==========Delete an Existing Note using: DELETE "/api/notes/deletenote". Login required  =============

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try {
        // Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not Found")}

        // Allow deletion only if user owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router ;