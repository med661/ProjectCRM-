const router = require("express").Router();
const Event = require("../models/Activity");
const handleError = require("../utils/eventErrors")
const eventController = require("../controllers/eventController");
const auth = require("../middleware/auth");
const authUser = require("../middleware/authUser");




router.post("/",auth,authUser,eventController.addevents)

router.get("/",auth,authUser, async(req, res)=>{

    const events = await Event.find({createdBy:req.user.id});
 
    try{
       
       res.status(200).json(events)

      
    }catch(err){
        handleError(err, res)
    }
});

router.get("/show/:id",auth,authUser, eventController.showevent);






router.put("/update/:id",auth,authUser,eventController.updateevents)


//   const result = await Event.findOneAndUpdate(req.params.id,
//         {
//         $set: req.body,
//     }
//     , {new: true, runValidators: true}).clone()

//     try{
//         res.status(200).json(result)
//     }catch(err){
//         // res.status(500).json(Object.keys(result.errors)[0])
//         console.log(err)
//         res.status(400).json(err)
//     }
    // .then((docs, err)=>{
    //     if(docs){
    //         res.status(200).json(docs)
    //     }else{
    //         console.log(err.errors.path)
    //         handleError(err, res)
    //     }
    // })


router.delete("/delete/:id",auth,authUser, async(req, res)=>{
    console.log({id:req.user.id});
    
    const id = req.params.id;
    try{
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    }catch(err){
        handleError(err, res)
    }

})




module.exports = router