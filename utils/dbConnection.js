const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfuyc.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Conectada base de datos');
  } catch (error) {
    console.log('Error conectando a database:', error);
  }
};

module.exports = {
  connectDB,
};
