import {model, Schema} from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String, 
    lowercase: true, 
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true
  },
  password: {
    type: String, 
    required: true
  },
});

export default model('User', UserSchema);