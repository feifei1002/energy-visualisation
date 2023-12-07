//routes for csv uploading
const express = require('express');
const multer = require('multer');
const router = express.Router();
const key = process.env.ACCESS_TOKEN;
const fileSystem = require('fs');
const path = require('path');
const { expressjwt } = require("express-jwt");

//Verify token before accessing protected routes
const verifyToken = expressjwt({
    secret: key,
    algorithms: ['HS256'],
    getToken: (request) => {
        const token = request.headers.authorization?.split(' ')[1] || null;
        return token;
    },
});

const csvStorage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, '../data/') //make sure directory does exist
    },
    filename: function(request, file, callback) {
        const originalName = file.originalname;
        const targetPath = path.join('../data/', originalName);

        if (fileSystem.existsSync(targetPath)) {
            //if csv exists, rename it by appending _OLD so we can rollback to it incase
            const oldFileName = path.parse(originalName).name + '_OLD' + path.extname(originalName);
            const oldFilePath = path.join('../data/', oldFileName);

            //rename the existing file
            fileSystem.renameSync(targetPath, oldFilePath, (error) => {
                if (error) throw error;
            });
        }
        // TODO: do some auth stuff later on here on user permissions/session

        //save the new file with the original name
        callback(null, originalName);
    }
});

const upload = multer({ storage: csvStorage });

//POST request for saving the csv file, protected using jwt token
router.post('/upload-csv', verifyToken, upload.single('file'), (request, response) => {
    if (!request.file) {
        return response.status(400).send('No file uploaded.');
    }

    //multer auto saves the file to the directory we specified above
    //maybe do some additional checks on columns if fails then revert to old file?

    //tell the user that the file has been saved successfully
    response.send('File has been uploaded and saved successfully.');
});

module.exports = router;
