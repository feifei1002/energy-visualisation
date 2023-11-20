//CREDIT, MODIFIED VERSION OF ANSWER FROM https://stackoverflow.com/questions/30027494/how-to-write-a-jest-configuration-file
module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "jsx", "json", "node"],

    // The test environment that will be used for testing
    testEnvironment: "node",

    // A map from regular expressions to module names or to arrays of module names
    // that allow to stub out resources with a single module
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],

    // A preset that is used as a base for Jest's configuration
    preset: 'react-native',
};
