import React from "react";
import AddNoteBar from "./components/AddNoteBar";
import Note from "./components/Note";

export default function Board({
  notes,
  handleAddNote,
  handleDeleteNote,
  currentBoardId,
  handleSaveNewNote,
  handleEditNote,
}) {
  //add some kind of token
  const filterNotesByBoardId = (item) => {
    if (item.boardId == currentBoardId) {
      return true;
    } else {
      return false;
    }
  };

  function getFilteredNotes() {

    console.log("getFilteredNotes(): currentboard ID: " + currentBoardId )
    let filteredNotes = [];
    for (let index in notes) {
      if (filterNotesByBoardId(notes[index])) {
        filteredNotes.push(notes[index]);
      }
    }
    return filteredNotes;
  }

  return (
    <div className="board-wrapper">
      <div className="board">
        {getFilteredNotes().map((note) => (
          <Note
            key={note._id}
            id={note._id}
            title={note.noteTitle}
            content={note.noteContent}
            color={note.noteColor}
            posX={note.posX}
            posY={note.posY}
            boardId={currentBoardId}
            deleteNote={handleDeleteNote}
            saveNote={handleSaveNewNote}
            editNote={handleEditNote}
          />
        ))}
      </div>

      <AddNoteBar handleAddNote={handleAddNote}></AddNoteBar>
    </div>
  );
}
