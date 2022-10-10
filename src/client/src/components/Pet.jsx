import { useEffect, useState } from "react";

const Pet = ({ hatID, speciesID, colorID, onClick}) => {
    useEffect(() => {
        document.styleSheets[0].insertRule(
            `.change {
                fill: ${colorID};
            }`
        )

        return () => {
            document.styleSheets[0].deleteRule(0);
        }
    }, [colorID])

    return (
        // <img onClick={() => handleClick()} src="https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-9.png" alt="Pet" width="200px" />
        <svg viewBox="0 0 20 15" className="w-1/3" onClick={onClick}>
            <use href={"/assets/species/" + speciesID +".svg#body"} x={7} y={8}/>
            <use href={"/assets/hats/" + hatID +".svg#body"} x={7} y={3}/>
        </svg>
    )
}

export default Pet