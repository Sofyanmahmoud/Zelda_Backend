const { error } = require("console");
const express=require("express");
const multer=require("multer");
const path=require("path");
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config();
mongo_Url=process.env.MONGO_URL

const app = express();

const PORT=process.env.PORT || 911;

app.use(cors())
app.use(express.json())


mongoose.connect(mongo_Url).then(()=>{
    console.log("DATABASE CONNECTED")
})

const checkApi=(req,res,next)=>{
const apiKey=req.query.API_KEY
if(!apiKey || apiKey !== process.env.API_KEY){
    return res.status(401).json({error:"unauthorized"})
}
next()
}

const storage= multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,process.env.IMAGE_LOCATION)
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname)

    }
})
const upload= multer({storage:storage})

app.post("/upload",checkApi,upload.single("file"),(req,res)=>{
res.status(200).json({massage:"file uploaded successfully"})
})

app.use("/image",checkApi,express.static(process.env.IMAGE_LOCATION))

const PostRouter=require("./routes/Post_route")
app.use("/post",checkApi,PostRouter);



app.listen(PORT,()=>{
   console.log(`server running on PORT ${PORT}`)
})