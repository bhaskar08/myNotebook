import React, { useState,useEffect ,useRef} from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom' ;

const Notes = (props) => {
  const navigate = useNavigate();
    const context=useContext(noteContext);
    const{notes,getAllNotes,editNote}=context;
    const [note,setNote]=useState({_id:"",etitle:"",edescription:"",etag:""});

    const handleClick=(e)=>{
      refClose.current.click();
      editNote(note._id,note.etitle,note.edescription,note.etag)
      props.setCustomAlert("Note Updated",'success')
        // addNote(note.title,note.description,note.tag);
    }

    const handleChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        getAllNotes();
      }
      else
      {
        navigate("/login")
      }
      // eslint-disable-next-line
    },[])

    const ref=useRef(null);
    const refClose=useRef(null);
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({_id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }

  return (
    <>

  <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='container my-4'>
      <div className="container">
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label" >Title</label>
          <input type="text" className="form-control" value={note.etitle}onChange={handleChange} id="etitle" name="etitle" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" className="form-control" value={note.edescription} id="edescription" onChange={handleChange} name="edescription" />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="etag" value={note.etag} onChange={handleChange} name="etag" />
        </div>
      </form>
      </div>
    </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose} >Close</button>
        <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='row'>
      <h2 className="my-4 mx-2">Your Notes</h2>
      <div className="container mx-2">
      {notes.length===0 && 'No Notes to Display'}
      </div>
      {notes.map((note)=>{
        return <Noteitem key={note._id} note={note} updateNote={updateNote} setCustomAlert={props.setCustomAlert} />;
      })}
    </div>
    </>
  )
}

export default Notes
