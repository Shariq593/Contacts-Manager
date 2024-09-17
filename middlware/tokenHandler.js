const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const tokenHandler = asyncHandler( async(req,res,next) => { 
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
            if(error){
                res.status(400).send("User is not autherized")
            }
            req.user = decoded.user;
 
            // console.log(req.user)
            next(); 
        })
        if(!token){
            res.status(401).send("User is not Autherized or token is missing in the req")
        }
    }

});

module.exports = tokenHandler