require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

const mealdb = (item) => `https://www.themealdb.com/images/ingredients/${encodeURIComponent(item)}.png`;

const indianProducts = [
  // --- Vegetables (8) ---
  { name: "Fresh Aloo (Potatoes)", category: "Vegetables", description: "Premium quality potatoes.", price: 35, unit: "kg", image: "/images/aloo.png", organic: true },
  { name: "Lal Pyaaz (Red Onions)", category: "Vegetables", description: "Crisp and pungent red onions.", price: 45, unit: "kg", image: "/images/red_onion.png", organic: false },
  { name: "Desi Tamatar (Tomatoes)", category: "Vegetables", description: "Juicy, tangy country tomatoes.", price: 50, unit: "kg", image: "/images/tomato.png", organic: true },
  { name: "Gobi (Cauliflower)", category: "Vegetables", description: "Fresh and crisp cauliflower.", price: 40, unit: "kg", image: "/images/cauliflower.png", organic: true },
  { name: "Bhindi (Okra)", category: "Vegetables", description: "Tender green okra.", price: 60, unit: "kg", image: "/images/okra.png", organic: true },
  { name: "Baingan (Eggplant)", category: "Vegetables", description: "Large, glossy purple eggplants.", price: 45, unit: "kg", image: "/images/eggplant.png", organic: false },
  { name: "Gajar (Carrots)", category: "Vegetables", description: "Sweet and crunchy orange carrots.", price: 50, unit: "kg", image: "/images/carrot.png", organic: true },
  { name: "Shimla Mirch (Capsicum)", category: "Vegetables", description: "Fresh green bell peppers.", price: 70, unit: "kg", image: "/images/capsicum.png", organic: true },

  // --- Fruits (8) ---
  { name: "Alphonso Aam (Mangoes)", category: "Fruits", description: "The king of fruits.", price: 350, unit: "dozen", image: "/images/mango.png", organic: true },
  { name: "Anaar (Pomegranate)", category: "Fruits", description: "Ruby-red, sweet pomegranates.", price: 180, unit: "kg", image: "/images/pomegranate.png", organic: true },
  { name: "Kela (Bananas)", category: "Fruits", description: "Fresh and sweet yellow bananas.", price: 60, unit: "dozen", image: mealdb("Banana"), organic: true },
  { name: "Seb (Apples)", category: "Fruits", description: "Crisp and sweet red apples.", price: 200, unit: "kg", image: mealdb("Apple"), organic: false },
  { name: "Santra (Oranges)", category: "Fruits", description: "Juicy citrus oranges.", price: 120, unit: "kg", image: mealdb("Orange"), organic: true },
  { name: "Strawberries", category: "Fruits", description: "Fresh red strawberries.", price: 250, unit: "box", image: mealdb("Strawberries"), organic: true },
  { name: "Kiwi", category: "Fruits", description: "Tangy and sweet green kiwi.", price: 180, unit: "box", image: mealdb("Kiwi"), organic: false },
  { name: "Pineapple", category: "Fruits", description: "Tropical sweet pineapple.", price: 90, unit: "pc", image: mealdb("Pineapple"), organic: true },

  // --- Leafy Vegetables (8) ---
  { name: "Palak (Spinach)", category: "Leafy Vegetables", description: "Crisp, iron-rich spinach leaves.", price: 30, unit: "bunch", image: "/images/spinach.png", organic: true },
  { name: "Dhaniya (Coriander)", category: "Leafy Vegetables", description: "Fresh green coriander leaves.", price: 20, unit: "bunch", image: mealdb("Coriander"), organic: true },
  { name: "Pudina (Mint)", category: "Leafy Vegetables", description: "Refreshing mint leaves.", price: 15, unit: "bunch", image: mealdb("Mint"), organic: true },
  { name: "Cabbage", category: "Leafy Vegetables", description: "Crunchy green cabbage.", price: 40, unit: "kg", image: mealdb("Cabbage"), organic: false },
  { name: "Lettuce", category: "Leafy Vegetables", description: "Fresh crispy lettuce.", price: 60, unit: "bunch", image: mealdb("Lettuce"), organic: true },
  { name: "Kale", category: "Leafy Vegetables", description: "Nutrient-dense green kale.", price: 80, unit: "bunch", image: mealdb("Kale"), organic: true },
  { name: "Basil", category: "Leafy Vegetables", description: "Aromatic basil leaves.", price: 50, unit: "bunch", image: mealdb("Basil"), organic: true },
  { name: "Parsley", category: "Leafy Vegetables", description: "Fresh green parsley.", price: 40, unit: "bunch", image: mealdb("Parsley"), organic: true },

  // --- Dairy (8) ---
  { name: "Desi Ghee", category: "Dairy", description: "Pure A2 cow ghee.", price: 750, unit: "liter", image: "/images/ghee.png", organic: true },
  { name: "Fresh Milk", category: "Dairy", description: "Farm fresh full cream milk.", price: 65, unit: "liter", image: mealdb("Milk"), organic: true },
  { name: "Paneer", category: "Dairy", description: "Soft and fresh cottage cheese.", price: 350, unit: "kg", image: mealdb("Paneer"), organic: true },
  { name: "Butter", category: "Dairy", description: "Creamy unsalted butter.", price: 400, unit: "kg", image: mealdb("Butter"), organic: true },
  { name: "Cheese", category: "Dairy", description: "Aged cheddar cheese.", price: 600, unit: "kg", image: mealdb("Cheese"), organic: false },
  { name: "Heavy Cream", category: "Dairy", description: "Rich and thick heavy cream.", price: 250, unit: "liter", image: mealdb("Heavy Cream"), organic: true },
  { name: "Yogurt", category: "Dairy", description: "Thick and creamy yogurt.", price: 80, unit: "kg", image: mealdb("Yogurt"), organic: true },
  { name: "Condensed Milk", category: "Dairy", description: "Sweetened condensed milk.", price: 150, unit: "tin", image: mealdb("Condensed Milk"), organic: false },

  // --- Grains (8) ---
  { name: "Basmati Chawal (Rice)", category: "Grains", description: "Long-grain aromatic Basmati rice.", price: 120, unit: "kg", image: "/images/rice.png", organic: true },
  { name: "Toor Dal (Pigeon Pea)", category: "Grains", description: "Unpolished pigeon peas.", price: 140, unit: "kg", image: "/images/toor_dal.png", organic: true },
  { name: "Lentils", category: "Grains", description: "Protein-rich brown lentils.", price: 130, unit: "kg", image: mealdb("Lentils"), organic: true },
  { name: "Gehun (Wheat Flour)", category: "Grains", description: "Freshly milled whole wheat flour.", price: 45, unit: "kg", image: mealdb("Flour"), organic: true },
  { name: "Oats", category: "Grains", description: "Healthy rolled oats.", price: 160, unit: "kg", image: mealdb("Oats"), organic: true },
  { name: "Quinoa", category: "Grains", description: "High protein quinoa seeds.", price: 400, unit: "kg", image: mealdb("Quinoa"), organic: true },
  { name: "Couscous", category: "Grains", description: "Fine durum wheat couscous.", price: 200, unit: "kg", image: mealdb("Couscous"), organic: false },
  { name: "Chickpeas (Chana)", category: "Grains", description: "Large white chickpeas.", price: 150, unit: "kg", image: mealdb("Chickpeas"), organic: true },

  // --- Organic Products (8) ---
  { name: "Organic Haldi (Turmeric)", category: "Organic Products", description: "High curcumin content turmeric.", price: 250, unit: "kg", image: "/images/turmeric.png", organic: true },
  { name: "Kali Mirch (Black Pepper)", category: "Organic Products", description: "Strong whole black pepper.", price: 400, unit: "pack", image: "/images/black_pepper.png", organic: true },
  { name: "Desi Gud (Jaggery)", category: "Organic Products", description: "Chemical-free dark jaggery.", price: 90, unit: "kg", image: "/images/jaggery.png", organic: true },
  { name: "Organic Honey", category: "Organic Products", description: "Pure raw forest honey.", price: 450, unit: "bottle", image: mealdb("Honey"), organic: true },
  { name: "Cold Pressed Olive Oil", category: "Organic Products", description: "Extra virgin olive oil.", price: 800, unit: "bottle", image: mealdb("Olive Oil"), organic: true },
  { name: "Organic Sugar", category: "Organic Products", description: "Unrefined raw sugar.", price: 80, unit: "kg", image: mealdb("Sugar"), organic: true },
  { name: "Pink Salt", category: "Organic Products", description: "Himalayan pink salt.", price: 120, unit: "kg", image: mealdb("Salt"), organic: true },
  { name: "Cinnamon", category: "Organic Products", description: "Organic cinnamon sticks.", price: 300, unit: "pack", image: mealdb("Cinnamon"), organic: true }
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
        rating: (Math.random() * 1 + 4).toFixed(1),
        numReviews: Math.floor(Math.random() * 150) + 20,
      };
    });

    await Product.insertMany(allProducts);
    console.log(`Inserted ${allProducts.length} High-Quality Indian Products (8 per category)!`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedMore();
