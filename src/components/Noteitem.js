import React from "react";
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const Noteitem = (props) => {
  const context=useContext(noteContext);
  const {deleteNote}=context;

  const { note ,updateNote,setCustomAlert} = props;
  return (
    <div className=" d-flex col-md-3 my-3">
      <div className="card">
        <div className="card-body" style={{width:'300px'}}>
            <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title">{note.title} <span style={{'marginLeft':'20px'}} className="badge bg-secondary">{note.tag}</span></h5>
          <div>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);setCustomAlert("Note Deleted",'success')}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i></div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
