import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/index'>
            Home
          </NavLink>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          <NavLink to='/profile'>
            Profile
          </NavLink>
          <NavLink to='/listings'>
            Listings
          </NavLink>
          <NavLink to='/messages'>
            Messages
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Log-In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;