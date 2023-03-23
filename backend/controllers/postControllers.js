const asyncHandler=require('express-async-handler')
const  PostMessage =require( '../models/postModels.js');
const User=require('../models/userModels')
// get all post so it is plural
// since retrieving data from db is asyncrounous process so we use async await
const getPosts=asyncHandler(async(req,res)=>{
  //  try {
  //   const PostMessages=await PostMessage.find({user:req.user.id});

  //   res.status(201).json(PostMessages);

  //  } catch (error) {
  //   res.status(400).json({message:error.message})
  //  }
   console.log(req.user.id)
  const PostMessages = await PostMessage.find({ user: req.user.id });

  res.status(200).json(PostMessages);
});








 const createPost= asyncHandler(async(req, res) => {
 const { title, message, selectedFile, creator, tags, fav, createdAt } =
   req.body;
//  const newPostMessage=new PostMessage({
//   title,message,selectedFile,creator,tags
//  })
// try {
//  const val=await newPostMessage.save();
//  res.status(201).json(val);
// } catch (error) {
//  res.status(400).json({ message: error.message });
// }


if(!req.body){
  res.status(400).json({message:'please add all infomation'})
}


 const newPostMessage = await PostMessage.create({
   title: req.body.title,
   message: req.body.message,
   selectedFile: req.body.selectedFile,
   creators: req.body.creators,
   tags: req.body.tags,
   user: req.user.id,
   fav: req.user.fav,
 });
   console.log(req.body.selectedFile);
   res.status(200).json(newPostMessage);
 });






 const editPost = (req, res) => {

  
  res.status(201).json('edit a post');
};








 const deletePost = asyncHandler(async(req, res) => {

  const PostMessages = await PostMessage.findById(req.params.id);
//   console.log(" found the id for deletion")
if (!PostMessages) {
  res.status(400);
  throw new Error('goal not found');
}
// check for user
if (!req.user) {
  res.status(401);
  throw new Error('user not found');
}
// make sure the logged in user matches the goal user
if (PostMessages.user.toString() !== req.user.id) {
  res.status(401);
  throw new Error('user not authirized');
}
await PostMessages.remove()
 console.log("post removed")
  res.status(200).json({id:req.params.id} );


  // res.status(201).json('delete post');
});
module.exports = { getPosts, createPost, editPost, deletePost };