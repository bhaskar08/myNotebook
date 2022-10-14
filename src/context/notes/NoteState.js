import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{

    const host="http://localhost:5000";

    const notesInitial=[];


    const [notes,setNotes]=useState(notesInitial);

    const getAllNotes=async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
  
          'auth-token':localStorage.getItem('token')
    
        }
      });
      const json=await response.json();
      setNotes(json);
    
    }
    const addNote=async(title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
          
        },
        body: JSON.stringify({title,description,tag}) 
      });
      getAllNotes();
    }

    const editNote=async(id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
    
        },
        body:JSON.stringify({title,description,tag})
      });
      getAllNotes();
    }


    const deleteNote=async(id)=>{
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
    
        }
      });
      // const json=await response.json();
      // setNotes(json);
      // const newNote=notes.filter((e)=>{return e._id!==id});
      // setNotes(newNote);
      getAllNotes();
    }
   
    return (
        <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;