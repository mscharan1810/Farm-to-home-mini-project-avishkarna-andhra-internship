const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function fixPorts() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
  console.log("Connected. Fixing image ports...");
  
  const products = await Product.find({});
  let updatedCount = 0;
  for (let p of products) {
    let changed = false;
    p.images.forEach(img => {
      if (img.url && img.url.includes('http://localhost:5000')) {
        img.url = img.url.replace('http://localhost:5000', 'http://localhost:5002');
        changed = true;
      }
    });
    if (changed) {
      await p.save();
      updatedCount++;
    }
  }

  console.log(`Updated ports for ${updatedCount} products.`);
  process.exit(0);
}

fixPorts();
