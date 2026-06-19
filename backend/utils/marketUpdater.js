const cron = require('node-cron');
const Product = require('../models/Product');

/**
 * Updates product prices everyday at midnight.
 * Simulates real market fluctuations (e.g. +/- 5% to 10%).
 */
const runMarketUpdate = async () => {
  try {
    console.log('📈 Running manual/daily market price update...');
    const products = await Product.find({});
    let updatedCount = 0;

    for (let product of products) {
      const fluctuationPercent = (Math.random() * 10) - 5; 
      const oldPrice = product.price;
      let newPrice = oldPrice + (oldPrice * (fluctuationPercent / 100));
      
      if (newPrice < 5) newPrice = 5;
      newPrice = Math.round(newPrice);
      
      if (product.discountPrice && product.discountPrice > 0) {
        let newDiscountPrice = product.discountPrice + (product.discountPrice * (fluctuationPercent / 100));
        if (newDiscountPrice < 5) newDiscountPrice = 5;
        product.discountPrice = Math.round(newDiscountPrice);
      }

      product.price = newPrice;
      await product.save();
      updatedCount++;
    }
    
    console.log(`✅ Successfully updated market prices for ${updatedCount} products.`);
    return updatedCount;
  } catch (error) {
    console.error('❌ Error updating market prices:', error);
    throw error;
  }
};

const startMarketUpdater = () => {
  // Run every day at 00:00 (Midnight)
  cron.schedule('0 0 * * *', () => {
    runMarketUpdate();
  });
};

module.exports = { startMarketUpdater, runMarketUpdate };
