//Define librairies we are using in the backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// for login authentication
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require(jsonwebtoken);
const User = require("./models/User"); 

// Define the root route for API
// go to http://localhost:8082/ for backend
app.get('/', (req, res) => res.send('index route!'));

//Define port
const port = process.env.PORT || 8082;


//Get MongoDB password from environment variables
const password = process.env.MONGODB_PASSWORD;

// Construct the MongoDB URI
const uri = `mongodb+srv://milliganec:${password}@climatedata.fh5ht06.mongodb.net/ClimateData?retryWrites=true&w=majority`;

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);

    // Use the new URL parser
    await mongoose.connect(uri, {
      useNewUrlParser: true,
    });

    // Log a success message WITH THE DATABASE ITS CONNECTED TO
    console.log('MongoDB is connected to database:', mongoose.connection.name);

  } catch (err) {
    //Log an error message and exit with an error code
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

//Connect to the MongoDB database
connectDB();

const Schema = mongoose.Schema;

console.log(Schema)

//Configure CORS and JSON parsing
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ extended: false }));
app.use(bodyParser.json()); // Using bodyParser for JSON parsing
app.use(bodyParser.urlencoded({ extended: true }));

//Import and configure the API routes
const apiRouter = require('./routes/api/Api');
const dataRouter = require('./routes/data/Data');
const PendingUser = require("./models/PendingUser");
const User = require("./models/User");
const registerRouter = require("./routes/api/Register");
app.use('/register', registerRouter);
const csvRouter = require('./routes/api/Csv');
const profileRouter = require('./routes/api/Profile');
app.use('/api', apiRouter);
app.use('/data', dataRouter);
app.use('/api',csvRouter);
app.use('/api',profileRouter);



// app.get('/api/register', (req, res) => {
//   res.send('Server is running. /api/register endpoint is accessible.');
// });
//
// app.post('/api/register', async (req, res) => {
//   try {
//     // Await the promise returned by registerNewUser
//     await RegisterController.registerNewUser(req, res);
//     res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
//   } catch (error) {
//     console.error('Error handling registration:', error);
//     return res.status(500).json({ message: 'Registration failed.' });
//   }
// });
// app.get('/api/pending-users', async (req, res) => {
//   const pendingUsers = await PendingUser.find({ approved: false });
//   res.json(pendingUsers);
// });
//
// app.post('/api/approve-user/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { approved } = req.body;
//
//   try {
//     // Update the approval status in the PendingUser schema
//     await PendingUser.findByIdAndUpdate(userId, { approved });
//
//     // If approved, move the user to the User schema
//     if (approved) {
//       const pendingUser = await PendingUser.findById(userId);
//
//       if (pendingUser) {
//         // Create a new User based on the pending user's details
//         const newUser = new User({
//           fullName: pendingUser.fullName,
//           username: pendingUser.username,
//           email: pendingUser.email,
//           password: pendingUser.password,
//         });
//
//         // Save the new User
//         await newUser.save();
//
//         // Remove the pending user from the PendingUser schema
//         await PendingUser.findByIdAndRemove(userId);
//       }
//     }
//
//     res.json({ message: 'User approval status updated.' });
//   } catch (error) {
//     console.error('Error approving user:', error);
//     res.status(500).json({ message: 'Error approving user. Please try again.' });
//   }
// });
//
// app.post('/api/deny-user/:userId', async (req, res) => {
//   const { userId } = req.params;
//
//   try {
//     // Delete the user from the PendingUser schema
//     const deletedUser = await PendingUser.findByIdAndRemove(userId);
//
//     if (deletedUser) {
//       res.json({ message: 'User deleted successfully.' });
//     } else {
//       res.status(404).json({ message: 'User not found.' });
//     }
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Error deleting user. Please try again.' });
//   }
// });

//Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));



