const router = require('express').Router()
const ContactController = require('../controllers/ContactController')
const auth = require('../middleware/auth')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authadmin')
const upload = require("../utils/multer");

router.post('/addContact',upload.single("image"),auth,authUser,ContactController.AddContact)
router.get('/contactListe',auth,authUser,ContactController.getallcontact)

router.delete('/delete/:id', auth, authUser, ContactController.deleteContact)

router.get('/getContact/:id', auth, authUser, ContactController.getContact)
router.put('/updateContact/:id', auth, authUser, ContactController.updateContact)



module.exports = router