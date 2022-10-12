import React from 'react';
import header from '../../../public/GoataShop-header.jpg'

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
          <NavLink to='/home'>
            Home
          </NavLink>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          <NavLink to='/listings'>
            My Listings
          </NavLink>
          <NavLink to='/messages'>
            My Messages
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/logout'>Log Out</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Navbar;