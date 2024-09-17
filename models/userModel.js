const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Please enter a valid username" ]
    },
    email : {
        type : String, 
        required : [true, "Please enter the email"],
        unique: [true, "Email Already registered"]
    },
    password: {
        type: String,
        required: [true, "Please enter the password"]
    }
},{
    timestamps: true
})
module.exports = mongoose.model("User",userSchema)
