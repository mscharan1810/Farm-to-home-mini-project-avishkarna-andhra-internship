require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

async function assignAllToFarmer() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
    console.log('Connected to DB');

    // Default to rattaiah@farmer.com if no email provided as arg
    const farmerEmail = process.argv[2] || 'rattaiah@farmer.com';
    
    const farmer = await User.findOne({ email: farmerEmail });
    if (!farmer) {
      console.log('Farmer not found!');
      process.exit(1);
    }

    const result = await Product.updateMany({}, { farmer: farmer._id });
    console.log(`Successfully assigned all ${result.modifiedCount} products to ${farmer.name} (${farmer.email})`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

assignAllToFarmer();
