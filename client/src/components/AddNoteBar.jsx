import React from 'react';

export default function AddNoteBar({ handleAddNote}) { //add some kind of token


    //I know this is a terrible way of doing this, but its the only thing that works right now
    const handleAddNote_Green = (event) => {

        console.log("CLicked Green BTN " + event)
        handleAddNote("green")
    };
    const handleAddNote_Blue = (event) => {

        console.log("CLicked Blue BTN " + event)
        handleAddNote("blue")
    };
    const handleAddNote_Purple = (event) => {

        console.log("CLicked Purple BTN " + event)
      
        handleAddNote("purple")
        
    };
    const handleAddNote_Red = (event) => {

        console.log("CLicked Red BTN " + event)
        handleAddNote("red")
    };

    const handleAddNote_Yellow = (event) => {

        console.log("CLicked Yellow BTN " + event)
        handleAddNote("yellow")
    };

    return (
        <div className='AddNoteBar-container'  >


            <input className='green-Note' type="image" src="/ic_StickyNote_Solid_Plus_black.png" onClick={handleAddNote_Green} />
            <input className='blue-Note' type="image" src="/ic_StickyNote_Solid_Plus_black.png" onClick={handleAddNote_Blue} />
            <input className='purple-Note' type="image" src="/ic_StickyNote_Solid_Plus_black.png" onClick={handleAddNote_Purple} />
            <input className='red-Note' type="image" src="/ic_StickyNote_Solid_Plus_black.png" onClick={handleAddNote_Red} />
            <input className='yellow-Note' type="image" src="/ic_StickyNote_Solid_Plus_black.png" onClick={handleAddNote_Yellow} />
           



        </div>
    )
}
