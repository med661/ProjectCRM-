const router = require('express').Router()
const UserController = require('../controllers/UserController')
const auth = require('../middleware/auth')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authadmin')
const upload = require("../utils/multer");

router.post('/register', UserController.AddUser)
router.post('/login', UserController.login)
router.get('/profil', auth,authUser,UserController.profil)
router.get('/logout', UserController.logout)
router.get('/getalluser',auth,authAdmin, UserController.getalluser)
//update
router.put("/:id", upload.single("image"),auth,authUser, UserController.updateUseprofile)
router.put('/update_role/:id', auth, authAdmin, UserController.updaterole)

router.get('/getuser/:id',auth,authAdmin, UserController.getuser)
router.delete('/delete/:id',auth,authAdmin, UserController.deleteuser)






module.exports = router