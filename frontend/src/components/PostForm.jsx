import  React from 'react';
import {useStyles }from './styling';
import  Typography  from '@mui/material/Typography';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import Paper from '@mui/material/Paper';
// import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField';
// import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import CardHeader from '@mui/material/CardHeader';

import {createPost} from '../features/Posts/postSlice'
import{useState} from 'react'





function PostForm() {


const classes=useStyles()

   const [postData, setPostData] = useState({
  creator:'',
  title:'',
  message: '',
  tags:'',
  selectedFile:'',
  fav:false,
   
   });


const { creator, title, message, tags, selectedFile,fav } =
  postData;

const dispatch=useDispatch()










 
   




const handleSubmit=(e)=>{
 e.preventDefault();
  console.log("clicked submit button")
const Data = {
  creator,
  title,
  message,
  tags,
  selectedFile,
  fav,
};
console.log(Data);


  dispatch(createPost(Data))
  
  setPostData({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
    fav:false,
  });
};

  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant='h6'>
            {/* {currentId ? `Editing "${post.title}"` : 'Creating a Memory'} */}
            create a 
          </Typography>
          <TextField
            name='creator'
            variant='outlined'
            label='Creator'
            fullWidth
            value={postData.creator}
            onChange={(e) =>
              setPostData({ ...postData, creator: e.target.value })
            }
          />
          <TextField
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            name='message'
            variant='outlined'
            label='Message'
            fullWidth
            multiline
            rows={4}
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <TextField
            name='tags'
            variant='outlined'
            label='Tags (coma separated)'
            fullWidth
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(',') })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant='contained'
            color='primary'
            size='large'
            type='submit'
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            // onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
}
export default PostForm



