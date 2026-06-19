require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const farmersData = [
  { name: 'Rattaiah', email: 'rattaiah@farmer.com', farmName: 'Rattaiah Farms', category: ['Vegetables', 'Organic Products'] },
  { name: 'Kiran', email: 'kiran@farmer.com', farmName: 'Kiran Orchards', category: ['Fruits'] },
  { name: 'Ramesh', email: 'ramesh@farmer.com', farmName: 'Ramesh Greens', category: ['Leafy Vegetables'] },
  { name: 'Suresh', email: 'suresh@farmer.com', farmName: 'Suresh Dairy', category: ['Dairy'] },
  { name: 'Srinivas', email: 'srinivas@farmer.com', farmName: 'Srinivas Fields', category: ['Grains'] }
];

async function runUpdate() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
    console.log('Connected to DB');

    const farmerMap = {};

    // Create or find farmers
    for (const data of farmersData) {
      let farmer = await User.findOne({ email: data.email });
      if (!farmer) {
        farmer = new User({
          name: data.name,
          email: data.email,
          phone: '9876543210', // dummy phone
          password: 'password123',
          role: 'farmer',
          address: 'Andhra Pradesh',
          farmName: data.farmName,
          verified: true
        });
        await farmer.save();
        console.log(`Created farmer: ${data.name}`);
      } else {
        console.log(`Farmer already exists: ${data.name}`);
      }
      
      for (const cat of data.category) {
        farmerMap[cat] = farmer._id;
      }
    }

    // Update products based on their category
    const products = await Product.find({});
    let updatedCount = 0;

    for (let product of products) {
      const targetFarmerId = farmerMap[product.category];
      if (targetFarmerId && product.farmer.toString() !== targetFarmerId.toString()) {
        product.farmer = targetFarmerId;
        await product.save();
        updatedCount++;
      }
    }

    console.log(`Updated ${updatedCount} products with new farmers.`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

runUpdate();
