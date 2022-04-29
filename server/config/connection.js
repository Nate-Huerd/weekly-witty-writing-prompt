const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/weekly-witty-writing-prompt',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

module.exports = mongoose.connection;