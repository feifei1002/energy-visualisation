//Define librairies we are using in the backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Define the root route for API
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