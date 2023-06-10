import {model, Schema} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto  from "crypto";
import jwt from "jsonwebtoken";

const secret ="oui"

const UserSchema = new Schema({
    email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: String,
});
// const UserSchema = new Schema({
// const UserSchema = new Schema({
//   username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
//   email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
//   bio: String,
//   image: String,
//   hash: String,
//   salt: String
// });

// UserSchema.methods.setPassword = function(password){
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// UserSchema.methods.validPassword = function(password) {
//   var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   return this.hash === hash;
// };

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// UserSchema.methods.generateJWT = function() {
//   var today = new Date();
//   var exp = new Date(today);
//   exp.setDate(today.getDate() + 60);

//   return jwt.sign({
//     id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime() / 1000),
//   }, secret);
// };

// UserSchema.methods.toAuthJSON = function(){
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generateJWT(),
//     bio: this.bio,
//     image: this.image
//   };
// };


export default model('User', UserSchema);