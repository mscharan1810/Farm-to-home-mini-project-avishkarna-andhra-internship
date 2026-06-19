const router = require("express").Router();
const { register, login, getProfile, updateProfile, upgradePremium, cancelPremium } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/premium", protect, upgradePremium);
router.put("/premium/cancel", protect, cancelPremium);

module.exports = router;
