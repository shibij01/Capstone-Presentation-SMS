// Import Express, Mongoose
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Import dotenv for private info
require("dotenv").config();

//Import Routes
const muaRoutes = require("./routes/muaRoutes");

//Add App Uses 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Connect to DB
const mongoDBUser = process.env.MONGOOSEUSER;
const mongoDBPwd = process.env.MONGOOSEPWD;
mongoose.connect(`mongodb+srv://${mongoDBUser}:${mongoDBPwd}@capstone.abcweit.mongodb.net/Capstone`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error!"));
db.once("open", () => {
    console.log("Connected to DB");
})

//use Routes
app.use("/cakedByKim", muaRoutes);

//assign PORT (3000)
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

