import React from 'react'

const Resource = ({filePath, onClick}) => {
    return (
        <img className="w-full h-full" src={filePath} onClick={onClick} draggable={false}/>
    )
}

export default Resource