const express = require('express');
const app = express();
const dotenv=require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use('/user', require('./routers/UserRouter'))
app.use('/contact', require('./routers/ContactRouter'))
app.use("/events", require('./routers/eventRoute'))



const URI =process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,

}, err => {
    if(err) {
    console.log("err connecting to MongoDB");
    }else{

        console.log("Connected to mongodb")

    }
})




const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});


