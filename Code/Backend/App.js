//Define librairies we are using in the backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Define the root route for API
// go to http://localhost:8082/ for backend
app.get('/', (req, res) => res.send('index route!'));

//Define port
const port = process.env.PORT || 8082;


//Get MongoDB password from environment variables
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB URI
const uri = `mongodb+srv://milliganec:${password}@climatedata.fh5ht06.mongodb.net/?retryWrites=true&w=majority/ClimateData`;

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

     // Use the new URL parser
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });

     // Log a success message
     console.log('MongoDB is connected');
  } catch (err) {
     //Log an error message and exit with an error code
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

//Connect to the MongoDB database
connectDB();

//
const Schema = mongoose.Schema;

console.log(Schema)

//Configure CORS and JSON parsing
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

//Import and configure the API routes
const apiRouter = require('./routes/api/Api');
app.use('/api', apiRouter);

//Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));



// https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/ 06/11
// var express = require("express"), 
//     mongoose = require("mongoose"), 
//     passport = require("passport"), 
//     bodyParser = require("body-parser"), 
//     LocalStrategy = require("passport-local"), 
//     passportLocalMongoose =  
//         require("passport-local-mongoose") 
const User = require("./models/User"); 
// var app = express(); 
  
  
// app.set("view engine", "ejs"); 
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(require("express-session")({ 
//     secret: "Rusty is a dog", 
//     resave: false, 
//     saveUninitialized: false
// })); 
  
// app.use(passport.initialize()); 
// app.use(passport.session()); 
  
// passport.use(new LocalStrategy(User.authenticate())); 
// passport.serializeUser(User.serializeUser()); 
// passport.deserializeUser(User.deserializeUser()); 
  
//===================== 
// ROUTES 
//===================== 
  
  
//Showing login form 
app.get("/login", function (req, res) { 
    res.render("login"); 
}); 
  
//Handling user login 
app.post("/login", async function(req, res){ 
    try { 
        // check if the user exists 
        const user = await User.findOne({ username: req.body.username }); 
        if (user) { 
          //check if password matches 
          const result = req.body.password === user.password; 
          if (result) { 
            res.render("secret"); 
          } else { 
            res.status(400).json({ error: "password doesn't match" }); 
          } 
        } else { 
          res.status(400).json({ error: "User doesn't exist" }); 
        } 
      } catch (error) { 
        res.status(400).json({ error }); 
      } 
}); 
  
