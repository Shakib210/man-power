import asyncHandler from "../utills/async.js";
import bcrypt from "bcryptjs";
import {
  registerService,
  findAllUsersService,
  userByEmailService,
  loadUserService,
} from "../services/authServices.js";
import { BadRequest } from "../utills/error.js";
import sendTokenResponse from "../utills/sendTokenResponse.js";
import Admin from '../models/admin.js'


const userController = asyncHandler(async (req, res) => {
  console.log(req.author);
  const data = await findAllUsersService();
  res
    .status(200)
    .json({ success: true, data, msg: "User fetched successfully" });
});

const signupController = asyncHandler(async (req, res) => {
  const user = req.body;
  console.log('user', user)
  const userExists = await userByEmailService(user.email);
  if (userExists) {
    throw new Error("User already exists");
  }
  user.password = await bcrypt.hash(user.password, 11);
  const registeredUser = await registerService(user);
  res
    .status(200)
    .json({ success: true, registeredUser, msg: "User register success" });
});

const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userByEmailService(email);
  if (!user) {
    throw new Error("Email does not exist!");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }
  sendTokenResponse(user, 200, res);
});

const userLoader = asyncHandler(async (req, res) => {
  const userId = req.author.id;
  console.log(userId);
  const response = await loadUserService(userId);
  res.json(response);
});

export const makeAdmin=async(req, res)=>{
    const {email}=req.body;
    console.log(email);
    const response=await Admin.create({email})
    res.json(response)
}

export const isAdminController= async (req, res)=>{
  const {email}=req.body
     const user= await Admin.findOne({email})
     res.json(user)
}

export {
  userController,
  signupController,
  loginController,
  userLoader,
};
