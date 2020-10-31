const mongoose=require("mongoose");
const marked=require("marked");
const slugify=require("slugify");

const createDomPrufier=require("dompurify");
const {JSDOM}=require("jsdom");
const dompurify=createDomPrufier(new JSDOM().window)

const aticleSchema=new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        
    },
    markdown:{
        type:String,
        required: true
        
    },
    created_at:{
        type:Date,
        default:Date.now
        
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    sanitizedHtml:{
        type:String,
        required:true,

    }
})

aticleSchema.pre("validate",function(next){
    if(this.title){
        this.slug = slugify(this.title,{lower:true,strict: true})
    }
    if(this.markdown){
        this.sanitizedHtml=dompurify.sanitize(marked(this.markdown) ) 
    }
    next()
})

module.exports = mongoose.model("Article",aticleSchema)
