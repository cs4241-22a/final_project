import {  useEffect, useState } from "react";

const Pet = ({ hatID, speciesID, colorID }) => {

    const [hatFilePath, setHatFilePath] = useState("")
    const [speciesFilePath, setSpeciesFilePath] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
        fetch(`/api/resource/hat/${hatID}`).then((response) => {
            response.json().then((data) => {
                setHatFilePath(data.filePath);
            })
        })
    }, [hatID])

    useEffect(() => {
        fetch(`/api/resource/color/${colorID}`).then((response) => {
            response.json().then((data) => {
                setColor(data.filePath);
            })
        })
    }, [colorID])

    useEffect(() => {
        fetch(`/api/resource/species/${speciesID}`).then((response) => {
            response.json().then((data) => {
                setSpeciesFilePath(data.filePath);
            })
        })
    }, [speciesID])

    return (
        // <img onClick={() => handleClick()} src="https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-9.png" alt="Pet" width="200px" />
        <svg>
            <use xlinkHref={`${hatFilePath}#body`} fill={color} />
        </svg>
    )
}

export default Pet