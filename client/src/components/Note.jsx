import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function Note({
  id,
  title,
  content,
  color,
  posX,
  posY,
  boardId,
  deleteNote,
  saveNote,
  editNote,
}) {
  //add some kind of token

  const [noteContent, setNoteContent] = useState(content);
  const [noteTitle, setNoteTitle] = useState(title);
  const characterLimit = 200;
  // const { ref, isComponentVisible } = useComponentVisible(true);
  // setNoteContent(content)

  // const ref = useRef(null);

  // const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       // Update Note
  //       console.log("CLicked outside note, save it!")
  //     }
  // };

  // useEffect(() => {
  //     document.addEventListener('click', handleClickOutside, true);
  //     return () => {
  //         document.removeEventListener('click', handleClickOutside, true);
  //     };
  // }, []);

  const showSaveButton = () => {
    if (id == null) {
      document
        .getElementsByClassName("save-button-visibility-temp")
        .item(0)
        .classList.remove("hidden");
    } else {
      document
        .getElementsByClassName("save-button-visibility-" + id)
        .item(0)
        .classList.remove("hidden");
    }
  };

  const handleNoteChange = (event) => {
    showSaveButton();
    if (characterLimit - event.target.value.length >= 0) {
      //if we are less then or equal to the limit, then set text
      setNoteContent(event.target.value);
      console.log("Setting Note Text");
    }
  };

  const handleNoteTitleChange = (event) => {
    showSaveButton();
    setNoteTitle(event.target.value);
    console.log("Setting Note TITLE");
  };

  const handleDeleteNote = (event) => {
    console.log("Delete Note Clicked!");
    deleteNote(id);
  };

  const handleSaveNote = () => {
    console.log("Save Note Clicked!");
    // create note JSON
    const note = {
      noteTitle: noteTitle,
      noteContent: noteContent,
      noteColor: color,
      posX: posX,
      poxY: posY,
      boardId: boardId,
    };
    if (id == null) {
      console.log("ID is null in note, calling /notes/add");
      document
        .getElementsByClassName("save-button-visibility-temp")
        .item(0)
        .classList.add("hidden");
      document
        .getElementsByClassName("save-button-visibility-temp")
        .item(0)
        .classList.remove("save-button-visibility-temp"); // remove temp status

      saveNote(note);
    } else {
      console.log("ID is not null in notes, calling /notes/edit");
      document
        .getElementsByClassName("save-button-visibility-" + id)
        .item(0)
        .classList.add("hidden");

      note._id = id;
      editNote(note);
    }
  };
  return (
    <div className="note" style={{ backgroundColor: color }}>
      <div className="note-header">
        <input
          type="text"
          className="note-title"
          value={noteTitle}
          onChange={handleNoteTitleChange}
        />

        <input
          className={
            id == null
              ? "save-btn hidden save-button-visibility-temp"
              : "save-btn hidden save-button-visibility-" + id
          }
          type="image"
          src="/twotone_save_black_24dp.png"
          onClick={handleSaveNote}
        />

        <input
          className="delete-btn"
          type="image"
          src="/twotone_cancel_black_24dp.png"
          onClick={handleDeleteNote}
        />
      </div>
      <hr className="note-line" />
      <div className="note-content">
        <TextareaAutosize
          minRows="8"
          className="note-text-area"
          cols="10"
          placeholder="Type to add a note..."
          value={noteContent}
          onChange={handleNoteChange}
        ></TextareaAutosize>
      </div>
    </div>
  );
}