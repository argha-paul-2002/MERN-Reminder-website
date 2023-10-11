import React, {useContext, useState} from 'react';
import noteContext from "../context/notes/noteContext";
import swal from 'sweetalert';


const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})
  const handleClick =(e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    swal({
      title: "Success!",
      text: "Note added Successfully",
      icon: "success",
      button: "Ok",
    });
    setNote({title: "", description: "", tag: ""})
  }
  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div>
      <h2 className='my-3'>Add a Reminder:</h2>
      <div className="container">
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}  minLength={5}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>          
          <button disabled = {note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote;
