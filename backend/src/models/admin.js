import mongoose from "mongoose";

const { Schema } = mongoose;
const adminModel = new Schema({
  email:{
    type:String,
    required: true,
  } 
});

const Admin = mongoose.model("admin", adminModel);
export default Admin;