const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

mongoose.connect('mongodb://localhost:27017/farm-to-home').then(async () => {
  const user = await User.findOne({ email: 'rattaiah@gmail.com' });
  if (!user) { console.log('User not found'); process.exit(0); }
  
  // Reassign all products
  await Product.updateMany({}, { $set: { farmer: user._id } });
  
  // Reassign all order items
  const orders = await Order.find();
  for (const o of orders) {
    let changed = false;
    for (const item of o.items) {
      if (item.farmer.toString() !== user._id.toString()) {
        item.farmer = user._id;
        changed = true;
      }
    }
    if (changed) await o.save();
  }
  
  console.log('Reassigned all products and existing orders to rattaiah');
  process.exit(0);
});
