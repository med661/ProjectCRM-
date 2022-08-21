

const vm = require("v-response");
const { body, validationResult ,check} = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Contact=require('../models/Contact')
const ValidateUser =require('../validation/Users.validation')
   
const ContactController={
AddContact:async (req,res)=>{
    const {errors,isValid}=ValidateUser(req.body)
    const { name, email, mobile ,adress} = req.body;
try {
    if (!isValid) {
        res.status(404).json(vm.ApiResponse(false,404,errors))

    }else{
     await   Contact.findOne({email:req.body.email}).then(async(exist)=>{
            if ((exist)) {
                errors.email="email already exist"
                res.status(404).json(vm.ApiResponse(false,404,errors))

                     }
            else{

           

              const newUser = new Contact({
                name:name,
                email:email,
                mobile:mobile,
                adress:adress,
                createdBy:req.user.id
              })
            newUser
              .save()
              .then((insc) => {
                return res.status(201).json(vm.ApiResponse(true, 201, insc));
              })
              .catch((err) => {
                return res.status(500).json(vm.ApiResponse(false, 500, err));
              });         
            }
        })
       
    }

   
} catch (err) {
    res.status(500).json({"mmm":err})
    console.log({err:err});
    
}

},



getallcontact: async (req, res) => {
  Contact.find({createdBy: req.user.id})
  .populate('createdBy')
  .then(items => {
    return  res.status(200).json({message: items})
  })
},




getalluser:async (req, res) => {
  try {
    const users = await Contact.find();

    res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

},

deleteContact: async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }


},
getContact:async (req, res) => {
 id= req.params.id
 await Contact.findById({_id:id}).exec( async(err,contact) => {
  if (err) {
    return res.status(404).json(vm.ApiResponse(false, 404, err))
    
  }else{
    return res.status(200).json({success:true,code:200,message:contact})

  }

})},

updateContact:async (req, res) => {
  const id = req.params.id
  const {email,name,mobile,adress} = req.body
  
  console.log({id});
  await Contact.findByIdAndUpdate({_id:id},{
    email:email,
    name:name,
    mobile:mobile,
    adress:adress
  }).exec((err,contact) => {
if (err) {

      return res.status(404).json(vm.ApiResponse(false, 404, err))

}else{
  return res.status(200).json(vm.ApiResponse(false, 200, contact))


}
  })
//await Contact.findOneAndUpdate
  
}





 }
 module.exports = ContactController;
