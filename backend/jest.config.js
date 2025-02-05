module.exports = {
    rootDir: ".",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "js"],
    testEnvironment: "node"
};
