require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const indianProducts = [
  {
    name: "Fresh Aloo (Potatoes)",
    category: "Vegetables",
    description: "Premium quality, earthy and fresh potatoes straight from the farms of Punjab. Perfect for your everyday curries and parathas.",
    price: 35,
    unit: "kg",
    image: "/images/aloo.png",
    organic: true
  },
  {
    name: "Lal Pyaaz (Red Onions)",
    category: "Vegetables",
    description: "Crisp and pungent red onions, harvested at the peak of their freshness. A staple for Indian cooking.",
    price: 45,
    unit: "kg",
    image: "/images/red_onion.png",
    organic: false
  },
  {
    name: "Desi Tamatar (Tomatoes)",
    category: "Vegetables",
    description: "Juicy, tangy country tomatoes grown without harmful pesticides. Perfect for gravies and chutneys.",
    price: 50,
    unit: "kg",
    image: "/images/tomato.png",
    organic: true
  },
  {
    name: "Alphonso Aam (Mangoes)",
    category: "Fruits",
    description: "The king of fruits. Hand-picked, naturally ripened Alphonso mangoes from Ratnagiri.",
    price: 350,
    unit: "dozen",
    image: "/images/mango.png",
    organic: true
  },
  {
    name: "Anaar (Pomegranate)",
    category: "Fruits",
    description: "Ruby-red, sweet, and juicy pomegranates. Rich in antioxidants and fresh from Maharashtra.",
    price: 180,
    unit: "kg",
    image: "/images/pomegranate.png",
    organic: true
  },
  {
    name: "Palak (Spinach)",
    category: "Leafy Vegetables",
    description: "Crisp, iron-rich spinach leaves. Harvested in the morning and delivered to you on the same day.",
    price: 30,
    unit: "bunch",
    image: "/images/spinach.png",
    organic: true
  },
  {
    name: "Desi Ghee",
    category: "Dairy",
    description: "Pure, aromatic, and rich A2 cow ghee. Made using the traditional Bilona method.",
    price: 750,
    unit: "liter",
    image: "/images/ghee.png",
    organic: true
  },
  {
    name: "Basmati Chawal (Rice)",
    category: "Grains",
    description: "Long-grain, aromatic Basmati rice aged to perfection. Essential for authentic biryanis.",
    price: 120,
    unit: "kg",
    image: "/images/rice.png",
    organic: true
  },
  {
    name: "Toor Dal (Pigeon Pea)",
    category: "Grains",
    description: "Unpolished and rich in protein. A daily essential for the perfect comforting dal.",
    price: 140,
    unit: "kg",
    image: "/images/toor_dal.png",
    organic: true
  },
  {
    name: "Organic Haldi (Turmeric)",
    category: "Organic Products",
    description: "High curcumin content turmeric powder. Farm-fresh, unadulterated, and brightly colored.",
    price: 250,
    unit: "kg",
    image: "/images/turmeric.png",
    organic: true
  },
  {
    name: "Kali Mirch (Black Pepper)",
    category: "Organic Products",
    description: "Strong, pungent whole black pepper sourced directly from the spice gardens of Kerala.",
    price: 400,
    unit: "pack",
    image: "/images/black_pepper.png",
    organic: true
  },
  {
    name: "Desi Gud (Jaggery)",
    category: "Organic Products",
    description: "Chemical-free, dark, and natural sugarcane jaggery. A perfect healthy substitute for sugar.",
    price: 90,
    unit: "kg",
    image: "/images/jaggery.png",
    organic: true
  }
];

async function seedMore() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farm-to-home');
    console.log('Connected to DB for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    let farmer = await User.findOne({ email: 'farmer@demo.com' });
    if (!farmer) {
      farmer = new User({
        name: 'Demo Farmer',
        email: 'farmer@demo.com',
        phone: '1234567890',
        password: 'password123',
        role: 'farmer',
        address: '123 Farm Lane, Agriculture City',
        farmName: 'Green Acres Demo Farm',
        verified: true
      });
      await farmer.save();
    }

    const allProducts = indianProducts.map((p, i) => {
      return {
        name: p.name,
        category: p.category,
        description: p.description,
        price: p.price,
        discountPrice: p.price - Math.floor(p.price * 0.1),
        stock: Math.floor(Math.random() * 50) + 20,
        unit: p.unit,
        images: [{ url: p.image, publicId: `prod_${i}` }],
        organic: p.organic,
        seasonal: Math.random() > 0.5,
        farmer: farmer._id,
        rating: (Math.random() * 1 + 4).toFixed(1), // 4.0 to 5.0
        numReviews: Math.floor(Math.random() * 150) + 20,
      };
    });

    await Product.insertMany(allProducts);
    console.log(`Inserted ${allProducts.length} High-Quality Indian Products!`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedMore();
