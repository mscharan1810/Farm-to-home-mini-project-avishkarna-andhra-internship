const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

async function fixImages() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
  console.log("Connected. Fixing images...");

  // Update Brown Rice image to actual brown rice
  await Product.updateMany(
    { name: 'Brown Rice' },
    { $set: { "images.0.url": "https://images.unsplash.com/photo-1673158190671-cd4e3baffbec?w=500&q=80" } }
  );

  console.log("Images fixed successfully.");
  process.exit(0);
}

fixImages();
