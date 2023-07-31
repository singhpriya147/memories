import { makeStyles } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const useStyles = makeStyles(theme=>({
  root: {
    '& .MuiTextField-root': {},
   
  },

  form: {
  
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: ' 0px 0px 5px #ddd',
    textAlign: 'center',
    width: '100%',
  },

  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
   header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EDE4FF',
  },
  buttonSubmit: {
    marginBottom: 5,
    height: '15px',
  },

  textField: {
    margin: '0.5rem',
  },
 
  


}));

export const theme = createTheme({
palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
