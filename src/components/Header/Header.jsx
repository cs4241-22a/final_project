import React from "react";
import header from '../../../public/goat.png'

import {
  Box
} from "./HeaderStyles";
  
const Header = () => {
  return (
    <div>
        <img style={{width:'100%', height:'50%'}} src={header} />
    </div>
  );
};
export default Header;