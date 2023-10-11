import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import swal from "sweetalert";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const deletedSuccessfully = () => {
    swal({
      title: "Success!",
      text: "Note deleted successfully",
      icon: "success",
      button: "Ok",
    });
  };
  var name = note.subject;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">Name: {name.substring(0,30)}</h5>
          <p className="card-title">Subject: {note.subject}</p>
          <p className="card-text">Description: {note.desc}</p>
          <p className="card-text">Email: {note.email}</p>
          <p className="card-text">Contact: {note.contact}</p>
          <p className="card-text">SMS: {note.sms}</p>
          <i
            className="fa-regular fa-trash-can mx-2 border border-success p-2 rounded-circle"
            onClick={() => {
              deleteNote(note._id);
              deletedSuccessfully();
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2  border border-danger p-2 rounded-circle"
            onClick={() => {
              swal({
                title: "Error!",
                text: "Can not be updated",
                icon: "error",
                button: "Ok",
              });
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
