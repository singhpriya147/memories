import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
 export const useStyles = makeStyles({
   root: {
     '& .MuiTextField-root': {},
     // 'background-color':red
   },
 
   form: {
     display: 'flex',

     flexWrap: 'wrap',
     justifyContent: 'center',
     height: 320,
     width: 600,
   },
   fileInput: {
    //  width: '97%',
     margin: '10px 0',
   },
   buttonSubmit: {
    //  marginBottom: 5,
     height: '15px',
   },
  //  buttonClear: {
  //   //  marginBottom: 5,
  //    height: '25px',
  //  },
   

 });



 export const theme = createTheme({
   components: {
     // Name of the component
     MuiAppBar: {
       styleOverrides: {
         // Name of the slot
         root: {
           // Some CSS
           backgroundColor: '#917FB3',
         },
       },
     },
     MuiButton: {
       styleOverrides: {
         // Name of the slot
         root: {
           // Some CSS
           backgroundColor: '#E5BEEC',
           color: '#2A2F4F',
         },
       },
     },
   },
 });
