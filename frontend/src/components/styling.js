import { makeStyles } from '@material-ui/core';

 export const useStyles= makeStyles({
  // root: {
  //   '& .MuiTextField-root': {
  //     margin: theme.spacing(1),
  //   },
  // },
  paper: {
    padding: 2,
    height:500,
    width:300,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },

// fav {
//     backgroundColor: red,
// }

// fav:focus {     
//     background-color:yellow;    
// }



});
