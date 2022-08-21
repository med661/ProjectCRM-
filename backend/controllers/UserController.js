

const vm = require("v-response");
const { body, validationResult ,check} = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User=require('../models/UserModels')
const ValidateUser =require('../validation/Users.validation')
const cloudinary = require("../utils/cloudinary");

const UserController={
AddUser :async (req,res)=>{
    const {errors,isValid}=ValidateUser(req.body)
    const { name, email, password, mobile ,adress} = req.body;
console.log({ name, email, password, mobile ,adress});
try {
    if (!isValid) {
        res.status(404).json(vm.ApiResponse(false,404,errors))

    }else{
     await   User.findOne({email:req.body.email}).then(async(exist)=>{
            if ((exist)) {
                errors.email="email already exist"
                res.status(404).json(vm.ApiResponse(false,404,errors))

            }
            else{

              const passwordHash = await bcrypt.hash(password, 12);
           
              console.log(passwordHash);

              const newUser = new User({
                name:name,
                email:email,
                password:passwordHash,
                mobile:mobile,
                adress:adress,
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
    
}

},



login: async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: user._id });


    res.json({ msg: "Login success!", refresh_token: refresh_token });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},

profil:async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log({user});
    res.status(200).json(vm.ApiResponse(true,200,user));
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},

logout: async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
},


getalluser:async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

},
updateUseprofile:async (req, res) => {
  console.log(req.user.id == req.params.id);
  if (req.user.id !== req.params.id) {
    return   res.status(400).json(vm.ApiResponse(false,400,"not permitted to change this profil"));

    
  }else{
    try {
      const user = await User.findById(req.params.id);
      //const password=req.body.password 

    //const passwordHash = await bcrypt.hash(password, 12);

      if (!req.file || req.file.path ==undefined || req.file.path ==null){

        const data1 = {
          name: req.body.name || user.name,
          adress:req.body.adress || user.adress,
          mobile:req.body.mobile || user.mobile
         // password:passwordHash || user.password

        }
  
        const    newuser1 = await User.findByIdAndUpdate(req.params.id, data1, {
          new: true
          });
             res.status(200).json(vm.ApiResponse(true,200,newuser1));
                        
      }else{

        await cloudinary.uploader.destroy(user.cloudinary_id);

        const result = await cloudinary.uploader.upload(req.file.path);

        var data = {
          image: result.secure_url || user.image,
          cloudinary_id: result.public_id || user.cloudinary_id,
          name: req.body.name || user.name,
          adress:req.body.adress || user.adress,
          mobile:req.body.mobile || user.mobile
          //password:passwordHash || user.password

          
        };
  

    
  const    newuser = await User.findByIdAndUpdate(req.params.id, data, {
        new: true
        });
           res.status(200).json(vm.ApiResponse(true,200,newuser));
        
          }
      
  
    } catch (err) {
      console.log({err:err});
      res.status(500).json(vm.ApiResponse(false,500,err));
    }
  }
 

}, 
getuser:async (req, res) => {
  id=req.params.id
  await User.findById({_id:id}).then((user)=>{

     res.status(200).json(vm.ApiResponse(false,200,user));

  
  }).catch((err)=>{
      res.status(500).json(vm.ApiResponse(false,500,err));
      


    })
},
updaterole:async (req, res) => {

  try {
    const { role } = req.body;

    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        role,
      }
    );

    res.status(200).json(vm.ApiResponse(true,200,"updated role"));
  } catch (err) {
   

    return  res.status(500).json(vm.ApiResponse(false,500,"err server"));
  }

},

deleteuser: async (req, res) => {
  id=req.params.id
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: "Deleted Success!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
    
}
  

  
 

}



 


    const createRefreshToken = (payload) => {
      return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });


   
    };


    
    module.exports = UserController;
