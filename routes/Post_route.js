const router=require("express").Router()

const Post=require("../models/post_model")

//get all posts
router.route("/").get((req,res)=>{
Post.find()
    .then(Post => res.json(Post))
    .catch(err=> res.status(400).json("Error:"+err))
})
//get single post
router.route("/:id")
.get((req,res)=>{
Post.findById(req.params.id)
    .then(Post => res.json(Post))
    .catch(err=> res.status(400).json("Error:"+err))
})
//delete post 
router.route("/:id")
.delete(async(req,res)=>{
try {
    await Post.findByIdAndDelete(req.params.id)
    res.json({massage: "post deleted successfully"})
} catch (error) {
    
    console.error("error deleting post:"+error)
    res.status(500).json({error:"internal server error"})
}})
//add post
router.route("/add")
.post((req,res)=>{
    const{title,ReleaseYear,system,ImagePath,content}=req.body
    const newPost= new Post({title,ReleaseYear,system,ImagePath,content})
    newPost.save()
    .then(()=>res.json("post add successfully"))
    .catch(err => res.status(400).json("Error: " + err))

})




module.exports=router