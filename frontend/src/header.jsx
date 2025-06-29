import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className='left_holder'>
        <img src='https://www.codelogicx.com/assets/images/logo.svg' width={150} />
      </div>

      <div className='right_holder'>
        <ul className='menu_holder'>
         <NavLink style={{margin:'0 10px'}}  to="/movies" className={({isActive})=>isActive ? ' activeNav': ' '} >Movies</NavLink>
<NavLink to="/stores"  className={({isActive})=>isActive ? ' activeNav': ' '} >Stores</NavLink>

        </ul>
        <div className='user_profile_holder'>
          CX
        </div>
      </div>
    </header>
  );
}
