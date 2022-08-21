const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
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
  
    adress: {
        type: String,
        required: [true, "Please enter your adress!"]
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