const mongoose= require ('mongoose');
const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    requires: true,
    ref: 'User',
  },
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  fav: Boolean,
  // favorites:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
  

  createdAt: {
    type: Date,
    default: new Date(),
  },

 
    
   
  
});

module. exports=mongoose.model('PostMessage',postSchema);