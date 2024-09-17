const  express  = require("express");
const app = express()
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middlware/errorHandler")
const port = 3000;
connectDb();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoute"));
// app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Port running at ${port}, visit http://localhost:${port}/ `)
})