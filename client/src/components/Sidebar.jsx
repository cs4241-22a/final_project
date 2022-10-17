import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import stickyImg from "../../public/icons/stickyNote.png";
import plusImg from "../../public/icons/boardPlus.png";
import gearImg from "../../public/icons/settingsGear.png";
import whiteStickyImg from "../../public/icons/whiteNote.png";

import "../sidebar.css";

async function logoutUser() {
  const res = await fetch("/logout", {
    method: "GET",
  });
  return res;
}

export default function Sidebar({
  boardIdList,
  setBoardIdList,
  currentBoardId,
  setCurrentBoardId,
}) {
  function handleNewBoard(e) {
    e.preventDefault();
    createNewBoard();
  }

  function createNewBoard() {
    console.log("create new board");

    const boardList = document.getElementById("boardList");
    const newBoard = document.createElement("li");
    const newSpan = document.createElement("span");
    newSpan.classList.toggle("boardListElement");
    currentBoardId = Math.max(...boardIdList) + 1;
    if (currentBoardId == -Infinity) {
      currentBoardId = 1;
    }
    boardIdList.push(currentBoardId);
    newSpan.innerHTML =
      "<img src=" +
      whiteStickyImg +
      " class='whiteNotes'/><h2>Board " +
      currentBoardId +
      "</h2>";
    newBoard.appendChild(newSpan);
    boardList.appendChild(newBoard);

    
    setCurrentBoardId(currentBoardId);
    setBoardIdList(boardIdList);

    console.log("just added a new board to the list");
  }
  const navigate = useNavigate();
  const handleLogout = async () => {
    const logout = await logoutUser();
    if (logout.ok) {
      // Server said correct creds
      sessionStorage.setItem("loggedIn", "false");
      navigate("/", { replace: true });
      console.log("User logged out");
    } else {
      console.log("Failed to logout");
    }
  };

  const renderBoards = () => {
    console.log("Trying to render boards", boardIdList);
    const boardList = document.getElementById("boardList");
    boardList.innerHTML = "";

    for (let boardId of boardIdList) {
      const newBoard = document.createElement("li");
      newBoard.classList.add("list-item");
      if (boardId == currentBoardId) {
        newBoard.classList.add("selected-board");
      }
      newBoard.onclick = function () {
        document
          .getElementsByClassName("selected-board")
          .item(0)
          .classList.remove("selected-board");
        currentBoardId = boardId;
        newBoard.classList.add("selected-board");
        setCurrentBoardId(currentBoardId);
      };
      const newSpan = document.createElement("span");
      newSpan.classList.toggle("boardListElement");
      newSpan.innerHTML =
        "<img src=" +
        whiteStickyImg +
        " class='whiteNotes'/><h2>Board " +
        boardId +
        "</h2>";
      newBoard.appendChild(newSpan);
      boardList.appendChild(newBoard);
      setCurrentBoardId(currentBoardId);
    }
  };

  useEffect(() => {
    renderBoards();
  }, [boardIdList, currentBoardId]);
  return (
    <div id="sidebarDiv">
      <div id="header">
        <img src={stickyImg} className="stickyNotes" id="headerImage" />
        <h2 id="headerText">Quick Notes</h2>
      </div>
      <div id="addBoardBtn" onClick={handleNewBoard}>
        <img src={plusImg} id="boardPlus" />
        <p>New Board</p>
      </div>
      <ul id="boardList"></ul>

      <div id="logoutBtn" onClick={(e) => handleLogout(e)}>
        <img src={gearImg} id="gear" />
        <h2 style={{ "margin-left": "10px" }}>Log out</h2>
      </div>
    </div>
  );
}
