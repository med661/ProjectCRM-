const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
    image:{
        type: String,
        default:'https://res.cloudinary.com/individuel/image/upload/v1661368042/profile-g7098385ae_640_yavuwb.png'


    },
    cloudinary_id: {
        type: String,
       // default: 'lqvs0biveo3f4m1u39z7'
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
   company: {
        type: String,
        required: [true, "Please enter your adress!"]
    },
  
    adress: {
        type: String,
        required: [true, "Please enter your adress!"]
    },
   status: {
        type: String,
      
        enum: ['Contact', 'Client','prospect'],
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true },
    
    mobile:{
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Contact", ContactSchema)