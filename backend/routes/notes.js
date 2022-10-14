const express = require('express');
const router=express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Route 1: Fetching all the notes of a user GET "/api/auth/fetchallnotes" login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
        const userNotes= await Notes.find({user:req.user.id});
        res.json(userNotes);
        
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// Route 2: Adding a note POST "/api/auth/addnote" login required
router.post('/addnote',fetchuser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description', 'Password should be atleast 6 characters').isLength({ min: 6 }),
],async (req,res)=>{

    //Checking if there are some validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {title,description,tag}=req.body;
        const note=new Notes({
            title,description,tag,user:req.user.id
        })
        const saveNote=await note.save();
    
        res.json(saveNote);
        
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

// Route 3 : Updating an existing note PUT "/api/auth/getuser"  Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try {
        const {title,description,tag}=req.body;
        let newNote={};
        if(title)
        {
            newNote.title=title;
        }
        if(description)
        {
            newNote.description=description;
        }
        if(tag)
        {
            newNote.tag=tag;
        }

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("Not Found");
        }

        //checking if the user is same that owns the note
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed");
        }

        note= await Notes.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
        res.json(note);

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


// Route 4 : Delete an existing note DELETE "/api/auth/getuser"  Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try {
        //Find the note to be deleted
        let note = await Notes.findById(req.params.id);
        if(!note)
        {
            return res.status(404).send("Not Found");
        }

        //checking if the user is same that owns the note
        if(note.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed");
        }

        note= await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note has been successfully deleted", note:note});

    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})


module.exports=router