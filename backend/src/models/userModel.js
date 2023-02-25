import mongoose from 'mongoose';

const { Schema} =mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
         type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
}, {timestamps: true})

const User = mongoose.model('user', userSchema)

export default User;
