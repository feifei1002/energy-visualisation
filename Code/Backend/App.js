//Define librairies we are using in the backend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// // Define the root route for API
// app.get('/', (req, res) => res.send('index route!'));
// app.get('/authorized', function (req, res) {
//   res.send('Secured Resource');
// });
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

//Configure CORS and JSON parsing
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
//app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(bodyParser.json()); // Using bodyParser for JSON parsing
app.use(bodyParser.urlencoded({ extended: true }));

//Import and configure the API routes
const apiRouter = require('./routes/api/Api');
const dataRouter = require('./routes/data/Data');
const RegisterController = require("./controllers/RegisterController");
app.use('/api', apiRouter);
app.use('/data', dataRouter);

app.get('/api/register', (req, res) => {
  res.send('Server is running. /api/register endpoint is accessible.');
});

app.post('/api/register', async (req, res) => {
  try {
    // Await the promise returned by registerNewUser
    await RegisterController.registerNewUser(req, res);
    // Respond to the client once the promise is resolved
    res.status(201).json({ message: 'Registration successful. Awaiting approval.' });
  } catch (error) {
    console.error('Error handling registration:', error);
    res.status(500).json({ message: 'Registration failed.' });
  }
});




//Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
