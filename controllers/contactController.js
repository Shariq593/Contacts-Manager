const asyncHandler =  require("express-async-handler");
const Contact = require("../models/contactModel")
//@description Get All Contact
//@route Get /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts= await Contact.find({user_id: req.user.id})
    res.json(contacts)
    // res.status();
});
 
//@description create A Contact
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req,res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400).send("All fields are mandatory")
    } 
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    }) 
    res.status(201);
    res.json(contact)
});

//@description GET  Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404)
        throw new Error("Contact not FOund")
    }
    res.json(contact)
    res.status(200);
});

//@description Put a Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(400).send('id not found')
    }
    
        console.log("res",contact.user_id)
        console.log("res",req.user.id)

    if(contact.user_id.toString() != req.user.id){
        res.status(403).send("User is not Autherized to Update other contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.json(updatedContact)
    res.status(200);
});

//@description Delete Contact
//@route DELETE /api/contacts/:id
//@access private
 const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        return res.status(400).send('id not found')
    }

    if(contact.user_id.toString() != req.user.id){
        res.status(403).send("User is not Autherized to Delete other contact")
 
    }
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
});





module.exports = {getContact , createContact, getContacts , updateContact, deleteContact, }