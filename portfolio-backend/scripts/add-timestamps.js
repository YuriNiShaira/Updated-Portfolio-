const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const addTimestamps = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const Visitor = require('../models/Visitor');

    const result = await Visitor.updateMany(
      { timestamp: { $exists: false } },
      { $set: { timestamp: new Date() } }
    );
    
    console.log(`✅ Updated ${result.modifiedCount} documents with timestamp`);
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

addTimestamps();