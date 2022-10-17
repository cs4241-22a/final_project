import React, { useState } from "react";
import Board from "../Board";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const getBoardIdList = (newNotes) => {
    let boardIdList = [];
    console.log("in getBoardIdList", newNotes);

    for (let note of newNotes) {
      console.log(note.boardId);
      if (boardIdList.includes(note.boardId)) {
        continue;
      } else if (note.boardId != undefined) {
        boardIdList.push(note.boardId);
      }
    }
    return boardIdList.sort();
  };

  const addNote = (color) => {
    const newNote = {
      noteTitle: "",
      noteContent: "",
      noteColor: getColor(color),
      posX: 25,
      posY: 25,
      boardId: currentBoardId, // TODO: make this dynamic
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const saveNewNote = async (note) => {
    const res = await fetch("/notes/add", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    return res;
  };

  const editNote = async (note) => {
    const res = await fetch("/notes/edit", {
      method: "POST",
      body: JSON.stringify(note),
      headers: { "Content-Type": "application/json" },
    });
    return res;
  };

  // get a list of notes from the server
  const getAllNotes = async () => {
    const notesResponse = await fetch("/notes", {
      method: "GET",
    });

    if (notesResponse.ok) {
      const newNotes = await notesResponse.json();
      console.log("in getAllNotes", newNotes);
      setNotes(newNotes);
      setBoardIdList(getBoardIdList(newNotes));
    } else {
      console.log("Failed get all notes, no auth");
      sessionStorage.setItem("loggedIn", "false");
      navigate("/", { replace: true });
    }
  };

  const deleteNote = (id) => {
    // Deleteing needs noteID, and boardID
    console.log("DELETEING STICKY NOTE");
    const json = { noteId: id, boardId: currentBoardId }, // TODO: need to get board id as well
      body = JSON.stringify(json);
    fetch("/notes/delete", {
      method: "POST",
      body: body,
      headers: { "Content-Type": "application/json" },
    }).then(function (response) {
      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      } else {
        console.log("Failed to delete note with id:", id);
      }
    });
  };

  const getColor = (color) => {
    let hexcode = "#89EBB6";
    switch (color) {
      case "red":
        hexcode = "#FB9D9D";
        break;
      case "blue":
        hexcode = "#89B0EB";
        break;
      case "green":
        hexcode = "#89EBB6";
        break;
      case "yellow":
        hexcode = "#FFF495";
        break;
      case "purple":
        hexcode = "#E989EB";
        break;
      default:
        hexcode = "#89EBB6";
    }

    return hexcode;
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const [notes, setNotes] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState(1); // TODO make dynamic
  const [boardIdList, setBoardIdList] = useState([]); // TODO make dynamic

  return (
    <div className="home-wrapper">
      {console.log("In <Home>")}
      <Sidebar
        boardIdList={boardIdList}
        setBoardIdList={setBoardIdList}
        currentBoardId={currentBoardId}
        setCurrentBoardId={setCurrentBoardId}
      />
      <Board
        notes={notes}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        currentBoardId={currentBoardId}
        handleSaveNewNote={saveNewNote}
        handleEditNote={editNote}
      />
    </div>
  );
}
