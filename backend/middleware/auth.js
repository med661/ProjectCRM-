const jwt = require('jsonwebtoken')


const auth = async (req, res, next) => {
  console.log("auth?");
    try {
      
        const token = req.header("Authorization")
       
        if (!token) return res.status(400).json({ msg: "Invalid Authentication." })

        const decode = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        req.user = decode
        //console.log({user:req.user});

        next()

        
    } catch (err) {

        return res.status(500).json({ msg: "auth err" + err.message })
    }
}

module.exports = auth