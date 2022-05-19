const express=require("express");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.json());
app.get("/hello",(req,res)=>res.send("Hello")); 
/*
get postman url: http://localhost:8000/hello
post postman url: http://localhost:8000/hello
    body: {"name": "Server"}
*/
app.post("/hello",(req,res)=>res.send(`Hello${req.body.name}`));
app.listen(8000,()=>console.log("Listening on port 8000"));