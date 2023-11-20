//CREDIT, MODIFIED VERSION OF ANSWER FROM https://stackoverflow.com/questions/30027494/how-to-write-a-jest-configuration-file
module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // An array of file extensions your modules use
    moduleFileExtensions: ["js", "jsx", "json", "node"],

    // The test environment that will be used for testing
    testEnvironment: "jsdom",

    // Increase the default Jest timeout for longer tests
    testTimeout: 150000,

    // A map from regular expressions to module names or to arrays of module names
    // that allow to stub out resources with a single module
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
    },

    // The glob patterns Jest uses to detect test files
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],

    // Transform ignore patterns
    transformIgnorePatterns: [
        "!node_modules/"
    ],

    // Setup files after the environment setup
    setupFilesAfterEnv: [
        "<rootDir>/jest.setup.js"
    ],
};
