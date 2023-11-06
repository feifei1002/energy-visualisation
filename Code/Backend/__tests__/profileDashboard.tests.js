const UserController = require('../controllers/ProfileController');
const User = require('../models/User');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

//mock user model
jest.mock('../models/User');

describe('User Profile', () => {
    let mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should fetch the correct user details', async () => {
        //GIVEN
        const request = { user: { id: '6547a45b34f0a29c8b36978f' } };
        const response = {
            json: jest.fn(),
            status: jest.fn(() => response),
        };

        //mock findbyID method in user model
        User.findById.mockResolvedValue({
            _id: '6547a45b34f0a29c8b36978f',
            fullName: 'Bob',
            username: 'bobadmin',
            password: 'bob@456', //this should be hashed and will be in future
            email: 'bob@def.com',
        });

        //WHEN
        await UserController.getUserProfile(request, response);

        //THEN
        expect(response.json).toHaveBeenCalledWith({
            _id: '6547a45b34f0a29c8b36978f',
            fullName: 'Bob',
            username: 'bobadmin',
            email: 'bob@def.com',
            //we do not return hashed password (can stil lbe cracked with hashcat for example)
        });

        //make sure password isnt included in response for security
        expect(response.json.mock.calls[0][0].password).toBeUndefined();
    });
});
