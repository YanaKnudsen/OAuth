//https://blog.logrocket.com/how-to-set-up-node-typescript-express/

import {Application, NextFunction, Request, Response} from "express";
import {GoogleToken, TokenInfo} from "../@types/GoogleToken";

const express=require('express');
const app:Application=express();
require('dotenv').config();

app.get("/",(req:Request,res:Response)=>{

       const options:any = {
         client_id: process.env.GOOGLE_CLIENT_ID,
         redirect_uri: process.env.GOOGLE_CALLBACK_URL,
         access_type: 'offline',
         response_type: 'code',
         prompt:"consent",
         scope: ["https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"].join(" "),
       };
       const queryString = new URLSearchParams(options);
       res.redirect(`${process.env.GOOGLE_OAUTH_URL}?${queryString}`);
})

 app.get("/google/callback",OAuthToken,async(req:Request,res:Response)=> {
        //obtain user data
        const token_info_response = await fetch(
          `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${res.locals.id_token}`
        );
         const token_info:TokenInfo= await token_info_response.json() as TokenInfo              ;
         const { email, name } = token_info;
         console.log( email, name)  ;
       
       
       
       
       
       
       
       
       
        res.send('callback')

 })


async function OAuthToken(req:Request,res:Response,next:NextFunction){
         const { code } = req.query;
         const data = {
             code,
             client_id: process.env.GOOGLE_CLIENT_ID,
             client_secret: process.env.GOOGLE_CLIENT_SECRET,
             redirect_uri: process.env.GOOGLE_CALLBACK_URL,
             grant_type: "authorization_code",
           };
         console.log(data);
           // send code to get access token & id_token
           const response=await fetch("https://oauth2.googleapis.com/token", {
               method: "POST",
               body: JSON.stringify(data),
           })
           const access_token_data:GoogleToken= await response.json()  as GoogleToken;
           const {id_token}=access_token_data;
           res.locals.id_token=id_token;
           next();
}





app.listen(4000,()=>{
    console.log("app is running on port 4000");
});