const User = require('../models/User');

// post login data
const getLogin = async (request, response) => {
    try {
        //placeholder until alex merges how he will be handling logged in users
        //const userId = request.user._id;
        const userName = "aliceadmin"; //this is temporary until login functionality and session ids get added
        const user = await User.findOne({username: userName}).select('password'); //to exclude the password field
        // console log is to the server console
        console.log("password is "+user);
        // response.json(user);
    } catch (error) {
        console.error('Error fetching password:', error);
        response.status(500).json({ message: 'Error fetching password' });
    }
};

module.exports = {
    getLogin
};