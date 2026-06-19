const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
  
  const existingAdmin = await User.findOne({ email: 'admin@demo.com' });
  if (existingAdmin) {
    console.log("Admin already exists!");
    process.exit(0);
  }

  const admin = new User({
    name: 'System Admin',
    email: 'admin@demo.com',
    phone: '0000000000',
    password: 'password123',
    role: 'admin',
    verified: true
  });

  await admin.save();
  console.log("Admin account created: admin@demo.com / password123");
  process.exit(0);
}

createAdmin();
