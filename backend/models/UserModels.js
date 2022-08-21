const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    image:{
        type: String,
        default:'https://res.cloudinary.com/dmjrzsis4/image/upload/v1660695453/lqvs0biveo3f4m1u39z7.png'


    },
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    adress: {
        type: String,
        required: [true, "Please enter your adress!"]
    },
    role: {
        type: String,
        enum: ['user', 'admin',"client"],
        default: 'user'
    },
   
    mobile:{
        type: String,
    },
    cloudinary_id: {
        type: String,
       // default: 'lqvs0biveo3f4m1u39z7'
      },
    
}, {
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)