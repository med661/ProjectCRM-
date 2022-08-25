const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    image:{
        type: String,
        default:'https://res.cloudinary.com/individuel/image/upload/v1661368042/profile-g7098385ae_640_yavuwb.png'


    },
    firstname: {
        type: String,
        required: [true, "Please enter your firstname!"],
        trim: true
    },
    lastname: {
        type: String,
       // required: [true, "Please enter your lastname!"],
        trim: true
    },
   
    state: {
        type: String,
        trim: true,
        
    },
    zipcode:{
        type: Number,
        trim: true,
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
        
    },
    organization:{
        type: String,
       // required: [false, "Please enter your organization!"]
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