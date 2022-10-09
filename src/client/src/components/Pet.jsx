import { useEffect, useState } from "react";

const Pet = ({ hatID, speciesID, colorID }) => {

    return (
        // <img onClick={() => handleClick()} src="https://clipartix.com/wp-content/uploads/2019/02/black-cat-clipart-2-2019-9.png" alt="Pet" width="200px" />
        <svg>
            <use href={"/assets/hats/" + hatID +".svg#body"} />
        </svg>
    )
}

export default Pet