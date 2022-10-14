import React from 'react'
import { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        props.setCustomAlert("Note Added Successfully","success")
        setNote({title:"",description:"",tag:""})
    }

    const handleChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


  return (

    <div className='containe my-4'>
      <h2 className='mx-2'>Add a Note</h2>
      <div className="container">
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" onChange={handleChange} id="title" value={note.title} name="title" minLength={10} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" rows={7} onChange={handleChange} value={note.description} name="description" placeholder='Description should be at least 5 charachters'/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" onChange={handleChange} value={note.tag} name="tag" />
        </div>
        <button type="submit" disabled={note.description.length<5 || note.title.length===0} onClick={handleClick} className="btn btn-primary">Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
