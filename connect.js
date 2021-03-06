const mongoose = require("mongoose");

const connect = async (dbConnectionString) => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    const conn = mongoose.connection;
    console.log(`Console connected to the "${conn.name}" database`);
    return conn;
  } catch (error) {
    console.log(`Error on db connection - Code:`, error);
  }
};

module.exports = connect;
