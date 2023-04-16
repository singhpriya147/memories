const mongoose=require('mongoose');
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, 'please add a email'],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
      // select:false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostMessage',
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    profilePicture: {
      type: String,
      default: '',
    },
    location: String,
    occupation: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User',userSchema);
