const asyncHandler =  require("express-async-handler");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")


//@description Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=> {
    const {username, email, password} = req.body;
    if(!username || !email || !password){ 
        return res.status(400).send("All fields are necessary")
    
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
         return res.status(400).send("email already registered")
    }
    const hashedpassword = await bcrypt.hash(password,10)

    const user = await User.create({username,email,password : hashedpassword})
    if(user){
        res.status(201).json({_id: user.id, email: user.email, username : user.username})
    }else{
        return res.status(400).send("User Not registered")
    }

});

//@description Login the user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=> {
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400).send("All fills are mandatory")
    }
    const user = await User.findOne({email});
    if(user && (bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email : user.email,
                id: user.id,  
            }  
        }, process.env.ACCESS_TOKEN_SECRET ,
        {
            expiresIn: "5m"
        })
        res.status(200).json({accessToken})
    }else{
        res.status(401).send("email or password is not valid")
    }
});

//@description Get current user information 
//@route Get /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=> {
    res.json(req.user)
    
});


module.exports = {registerUser,loginUser,currentUser}