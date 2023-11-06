//routes for csv uploading
const express = require('express');
const multer = require('multer');
const router = express.Router();

//use multer to set up a storage engine
const csvStorage = multer.diskStorage({
    destination: function(request, file, cb) {
        cb(null, 'uploads/') //
    },
    filename: function(request, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.csv')
    }
});

const upload = multer({ storage: storage });

//POST request for the csv file
router.post('/upload-csv', upload.single('file'), (request, response) => {
    if (!request.file) {
        return response.status(400).send('No file uploaded.');
    }

    //authenticate user details (login session) before saving csv, then check csv has correct columns then save

    //let user know file successfully uploaded

});

module.exports = router;