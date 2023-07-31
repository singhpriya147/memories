
import * as React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import{useState} from 'react';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import {useSelector,useDispatch} from 'react-redux';
import{logout,reset} from '../features/auth/authSlice'
import { useMediaQuery } from '@mui/material';






export default function Header() {
 const navigate=useNavigate()
 const dispatch=useDispatch()
 
 // from state we only want user so we use useselector 
 const {user}=useSelector((state)=>state.auth);

 const isNonMobileScreens=useMediaQuery("(min-width:960px)");
const onLogout=()=>{
  // console.log(" clicked on logout button")
  dispatch(logout())
  // dispatch(reset())
  navigate('/login')
}


 const [anchorel, setAnchorel] = useState(null);
 const open = Boolean(anchorel);
 const handleClick = (event) => {
   setAnchorel(event.currentTarget);
 };
 const handleClose = () => {
   setAnchorel(null);
 };




  return (
  
      <div className={`${classes.header}`}>
      {/* <FlexBetween gap='1.75rem'> */}
      <Typography
        // //  fontSize='clamp(1rem,2rem,2.25rem)'

        style={{
          fontFamily: 'Amatic SC',
          fontWeight: 'bold',
          fontSize: '2.8rem',
          paddingLeft: '1rem',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          Memorify
        </Link>
      </Typography>
      {/* </FlexBetween> */}

      {/* desktop version  */}
      {isNonMobileScreens ? (
        <div>
          {user ? (
            <>
              <Link to='/MyPosts' style={{ textDecoration: 'none' }}>
                My Post
              </Link>
              <button sx={{ mr: 2 }} onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to='/Register' style={{ textDecoration: 'none' }}>
                Register
              </Link>
              <Link to='/Login' style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </>
          )}
        </div>
      ) : (
        // <IconButton
        //   onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        // >
        //   <Menu />
        // </IconButton>

        <>
          <button
            id='demo-positioned-button'
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </button>
          <Menu
            id='demo-positioned-menu'
            aria-labelledby='demo-positioned-button'
            anchorel={anchorel}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem component='a' href='/MyProfile'>
              Profile
            </MenuItem>

            <MenuItem component='a' href='/MyPosts'>
              My Posts
            </MenuItem>

            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </>
      )}

      
    </div>
    
  );
}
