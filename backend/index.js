const express=require("express");
const cors=require('cors')
require("./db/config");
const User=require("./db/User");
const product=require('./db/product');
const app=express();

app.use(express.json());
app.use(cors());
app.post("/register",async(req,res)=>{
  let user=new User(req.body)
 
  let result=await user.save();
  result=result.toObject();
  delete result.password
  res.send(result);
})
app.post("/login",async (req,res)=>{
  if(req.body.password && req.body.email)
  {
  let user=await User.findOne(req.body).select("-password")
  if (user)
  {
    res.send(user)
  }
  else{
    res.send({result:"No user Found"})
  }
}
})
app.post("/add-product",(req,res)=>{
  let Product=new product(req.body);
  let result=Product.save();
  res.send(result);
})
app.get("/products", async (req,res)=>{
  const products=await product.find();
  if (products.length>0){
    res.send(products)
  }
  else{
    res.send({result:"No product found"});
  }
})
app.delete("/products/:id", async(req,res)=>{
  let result= await product.deleteOne({_id:req.params.id});
  res.send(result)
})

app.get("/product/:id",async (req,res)=>{
  let result=await product.findOne({_id:req.params.id});
  

  if (result){
    res.send(result)
  }
  else{
    res.send("not found");
  }
})

app.put("/product/:id",async (req,res)=>{
  let result=await product.updateOne({_id:req.params.id},
    {$set:req.body}
  )
  
  res.send(result)
})
app.get("/search/:key",async   (req,res)=>{
  let result=await product.find({
    "$or":[
      {
        name:{$regex:req.params.key}
      },
      {
        company:{$regex:req.params.key}
      },
      {
        category:{$regex:req.params.key}
      },
      {
        price:{$regex:req.params.key}
      }

    ]
  });
  res.send(result);
})

app.listen(5000,()=>{
  console.log("server is running on http://localhost:5000")
});
