const mongoose= require ('mongoose');
const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: String,
  message: String,
  location: String,
  tags: [String],
  selectedFile: String,
  
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
   { comment:{
      type:String,
      required:true,
    }}


  ],

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module. exports=mongoose.model('PostMessage',postSchema);