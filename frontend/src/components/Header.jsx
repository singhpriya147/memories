
import * as React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import { theme } from '../components/styling'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

import {useSelector,useDispatch} from 'react-redux';
import{logout,reset} from '../features/auth/authSlice'
import { useSelect } from '@mui/base';
import { ThemeProvider, } from '@mui/material/styles';





export default function ButtonAppBar() {
 const navigate=useNavigate()
 const dispatch=useDispatch()

 // from state we only want user so we use useselector 
 const {user}=useSelector((state)=>state.auth);


const onLogout=()=>{
  console.log(" clicked on logout button")
  dispatch(logout())
  dispatch(reset())
  navigate('/login')
}


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ pr: 2 }}
            >
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/' style={{ textDecoration: 'none' }}>
                Memories
              </Link>
            </Typography>
            <>
              {user ? (
                <>
                  <Button sx={{ mr: 2 }} onClick={onLogout}>
                    Logout
                  </Button>

                  <Link to='/MyPosts'>
                    <Button>My Post</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to='/Register'>
                    <Button>Register</Button>
                  </Link>
                  <Link to='/Login'>
                    <Button>Login</Button>
                  </Link>
                </>
              )}
            </>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}