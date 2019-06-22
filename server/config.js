module.exports = {
    secret: 'frankSecreateWord',
    // For Docker only
    MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/treecalc'
    // For local server
    // MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/treecalc'
};