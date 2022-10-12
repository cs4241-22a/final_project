import React from "react";
import header from '../../../public/GoataShop-header.jpg'

import {
  Box
} from "./HeaderStyles";
  
const Header = () => {
  return (
    <Box>
        <img style={{width:'100%', height:'50%'}} src={header} />
    </Box>
  );
};
export default Header;