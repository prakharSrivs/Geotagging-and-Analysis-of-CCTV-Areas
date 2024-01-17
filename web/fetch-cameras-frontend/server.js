const express = require("express")
const path = require('path');
const { returnCamerasList } = require("./onvif");
const app = express();

app.set('view engine','ejs')
app.set('views', path.join(__dirname , '/views'))
app.use(express.static( path.join(__dirname , 'public')))

//parsing Application data
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/:userId",async(req,res)=>{
    const {userId} = req.params;
    const userCameras = await fetch("https://rjpoliceleftshift.onrender.com/camera/user?uid="+userId) || [];
    let allCameras = await returnCamerasList() || [        {
        manufacturerName:"Sony",
        modelName:"VB - S30D",
        srNo:"VB - S30D",
        xAddr:"http://192.168.10.14:1008lksfjsldkfjas",
    }];
    res.render('pages/allCameras.ejs',{allCameras})
})
 
app.listen(4000,()=>{
    console.log("Listening on Port 4000")
})

