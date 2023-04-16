import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService'

const initialState={
 posts:[],
 isError:false,
 isSuccess:false,
 isLoading:false,
 // message:'',
}

// create new post
 
export const createPost=createAsyncThunk('posts/create',async(postData,thunkAPI)=>{

 try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.createPost(postData, token)
      
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
        }
})

// Get user Feed posts basically all following user post 
// export const getFeedPosts = createAsyncThunk(
//   'posts/getFeedPosts',
//   async (thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token
//       return await postService.getFeedPosts(token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// );








// Get post of  one user

export const getUserPosts = createAsyncThunk(
  'posts/getOnlyUserPosts',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(id,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);





// Delete user post
export const deletePost = createAsyncThunk(
  'post/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await postService.deletePost(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
);






export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // .addCase(getFeedPosts.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getFeedPosts.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.posts = action.payload;
      // })
      // .addCase(getFeedPosts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })



      // .addCase(getUserPosts.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(getUserPosts.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.posts = action.payload;
      // })
      // .addCase(getUserPosts.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      // })


      
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export  const {reset}=postSlice.actions
export default postSlice.reducer;