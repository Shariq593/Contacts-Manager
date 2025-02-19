const mongoose = require("mongoose")
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected ",connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb