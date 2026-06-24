const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      console.log('⚠️ Setup aborted: An admin account already exists.');
      await mongoose.connection.close(); 
      process.exit(0);
    }
    
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    
    await Admin.create({ email, password });
    console.log('✅ Admin created successfully!');
    
    await mongoose.connection.close(); 
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();