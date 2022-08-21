const Activity = require("../models/Activity");
const handleError = require("../utils/eventErrors")
const EventController={
    addevents:async(req, res)=>{
   
        const newEvent = await new Activity({
            title:req.body.title,
            start:req.body.start,
            end:req.body.end,
            describe:req.body.describe,
            createdBy:req.user.id,
            typeActivity:req.body.typeActivity,

        
        })

      const ev= await Activity.find({CreatedBy:req.user.id,start:req.body.start,end:req.body.end})
      if (ev.length!==0) {
        console.log({ev});
        return res.status(400).json({n:"you have somthing to do"})

      } 
     
        try{
           await newEvent.save((err, event)=>{
                if(err){
                    handleError(err, res)
                }else{
                    res.status(200).json(event)
                }
            })
        }catch(err){
            handleError(err, res)
        }
    },

    updateevents: async (req, res)=>{
        const id = req.params.id
         try{
            const event = await Activity.findOne({_id : id})
            if(event){
                Object.assign(event, req.body);
                 event.save((err, event)=>{
                    if(err){
                        handleError(err, res)
                    }else{
                        res.status(200).json(event)
                    }
            })
        }   
            if(!event){
                res.status(404).json({error: "event is not found"})
            }
         }catch (err){
           console.log(err)
           handleError(err,res)
         }
     
    
        },


    showevent:  async(req, res)=>{
        const id =   req.params.id
        const event = await Activity.findById(id);
     
        try{
           res.status(200).json(event)
    
          
        }catch(err){
            handleError(err, res)
        }
    }
}
module.exports = EventController