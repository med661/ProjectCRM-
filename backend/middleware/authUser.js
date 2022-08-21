const Users = require('../models/UserModels')

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})
       // console.log(user);

      //  if(user.role !== "user") 
           // return res.status(500).json({msg: "user resources access denied."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin
