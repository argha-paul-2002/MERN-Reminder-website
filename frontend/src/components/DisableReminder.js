import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const DisableReminder = () => {
  
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
      if(localStorage.getItem('token')){
          getNotes()
      }
      else{
          navigate("/login"); 
      }
      // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    
}

const handleClick = (e)=>{ 
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    swal({
        title: "Success!",
        text: "Note updated successfully",
        icon: "success",
        button: "Ok",
      });
}

const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
    
}
  return (
    <>
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container">
                  {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                  if(note.status){
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                  }
                })}
            </div>
      </>
  )
}

export default DisableReminder
