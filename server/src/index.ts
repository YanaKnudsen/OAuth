//https://blog.logrocket.com/how-to-set-up-node-typescript-express/

import {Application, Request, Response} from "express";

const express=require('express');
const app:Application=express();

app.get("/",(req:Request,res:Response)=>{
    res.send('<a href="/auth/google">Authenticate with Google<a/>')
})

//route that can be seen unless user is registred
app.get("/mainPage",(req:Request,res:Response)=>{
    res.send("You are authorize to see this page!")
})

app.listen(4000,()=>{
    console.log("app is running on port 4000");
});