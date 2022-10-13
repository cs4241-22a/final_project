import React, {useEffect, useState} from 'react';
import header from '../../../public/goat.png'

import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
  
const Navbar = (props) => {
  useEffect(() => {
    props.getUser()
  }, []);
  return (
    <>
      <Nav>
      <img src={header} />
        {/* <Bars /> */}
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
          <NavLink to='/contact'>
            Contact Us
          </NavLink>
        </NavMenu>
        {props.user.name ?
        <NavBtn>
          <NavBtnLink to='/logout'>Log Out</NavBtnLink>
        </NavBtn> : <></>}
      </Nav>
    </>
  );
};
  
export default Navbar;