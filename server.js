const express=require("express");
const mongoose=require("mongoose");
const Article=require("./models/article")
const router=require("./routes/articles");
const methodOverride=require("method-override");
const app=express();


mongoose.connect("mongodb://localhost/myBlog",{ useNewUrlParser: true , useUnifiedTopology: true ,useCreateIndex:true})


app.set("view engine","ejs")

app.use(express.urlencoded({extended:false,}))

app.use(methodOverride("_method"))





app.get("/", async (req,res)=>{
    const articles= await Article.find()
    res.render("articles/index",{articles:articles})
})



app.use("/articles",router)


app.listen(5000,()=>{
    console.log(`server started on http://localhost:5000`)
})