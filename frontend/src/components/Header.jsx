
import * as React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
// import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

import {useSelector,useDispatch} from 'react-redux';
import{logout,reset} from '../features/auth/authSlice'
import { useSelect } from '@mui/base';





export default function ButtonAppBar() {
 const navigate=useNavigate()
 const dispatch=useDispatch()

 // from state we only want user so we use useselector 
 const {user}=useSelector((state)=>state.auth);


const onLogout=()=>{
  dispatch(logout())
  dispatch(reset())
  navigate('/')
}


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to='/'> Memories app</Link>
          </Typography>
          <>
            {user ? (
              <>
                <Button color='inherit' onClick={onLogout}>
                  Logout
                </Button>
                <Link to='/favorites'>
                  <Button>Favorites</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to='/Register'>
                  <Button color='inherit'>Register</Button>
                </Link>
                <Link to='/Login'>
                  <Button color='inherit'>Login</Button>
                </Link>
              </>
            )}
          </>
        </Toolbar>
      </AppBar>
    </Box>
  );
}