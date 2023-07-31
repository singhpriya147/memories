import  React from 'react';
import {useStyles }from './styling';


import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'

import TextField from '@mui/material/TextField';
import {createPost} from '../features/Posts/postSlice'
import{useState} from 'react'




function PostForm() {


const classes=useStyles()

   const [postData, setPostData] = useState({
  
  title:'',
  message: '',
  
  selectedFile:'',
 
   location:'',
   });


const {  title, message, tags, selectedFile,location} =
  postData;

const dispatch=useDispatch()










 
   




const handleSubmit=(e)=>{
 e.preventDefault();
  // console.log("clicked submit button")
const Data = {

  title,
  message,
  tags,
  selectedFile,
  fav,
  location,
};
// console.log(Data);


  dispatch(createPost(Data))
  
  setPostData({
    
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    location:'',
  });
};

  return (
    <>
      <form
        autoComplete='off'
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <TextField
          name='title'
          variant='outlined'
          label='Caption'
          fullWidth
          multiline
          value={postData.title}
          // className={classes.textField}
          inputProps={classes.textField}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name='message'
          variant='outlined'
          label='Message'
          multiline
          fullWidth
          rows={1}
          value={postData.message}
          className={classes.textField}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />

        <TextField
          name='location'
          variant='outlined'
          label='Location'
          fullWidth
          multiline
          value={postData.location}
          className={classes.textField}
          onChange={(e) =>
            setPostData({ ...postData, location: e.target.value })
          }
        />

        {/* <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma separated)'
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        /> */}
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
         <button className='form-button'>submit</button>
        
        
          
      </form>
    </>
  );
}
export default PostForm



