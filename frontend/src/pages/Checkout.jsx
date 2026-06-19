import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [address, setAddress] = useState(user?.address || "");
  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [frequency, setFrequency] = useState("Weekly");

  const isPremium = user?.isPremium;
  const rawSubtotal = cart?.items?.reduce((acc, i) => acc + (i.product.discountPrice || i.product.price) * i.quantity, 0) || 0;
  const premiumDiscount = isPremium ? rawSubtotal * 0.10 : 0;
  const deliveryCharge = isPremium ? 0 : (rawSubtotal > 1000 ? 0 : 49);
  const totalToPay = rawSubtotal - premiumDiscount + deliveryCharge;

  useEffect(() => {
    if (!cart?.items?.length) nav("/products");
  }, [cart, nav]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/orders", {
        items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.discountPrice || i.product.price })),
        shippingAddress: { address, city: "Local", postalCode: "000000", country: "India" },
        paymentMethod: method,
        itemsPrice: rawSubtotal,
        discount: premiumDiscount,
        deliveryCharge: deliveryCharge,
        totalPrice: totalToPay,
        isSubscription,
        frequency,
      });

      clearCart();
      toast.success("Order placed successfully!");
      nav(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-slide-up" style={{ padding: '4rem 1.5rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>Secure Checkout</h1>

      <div className="checkout-layout">
        <form id="checkoutForm" onSubmit={handlePlaceOrder} style={{ background: '#fff', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>1. Shipping Details</h3>
          <div className="form-group">
            <label>Full Delivery Address</label>
            <textarea 
              className="textarea" 
              placeholder="Enter your complete home/office address..."
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>

          <h3 style={{ fontSize: '1.5rem', margin: '3rem 0 2rem', color: 'var(--primary)' }}>2. Payment Method</h3>
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <label style={{ 
              display: 'flex', alignItems: 'center', gap: '15px', 
              padding: '1.5rem', border: `2px solid ${method === 'COD' ? 'var(--primary)' : 'var(--border)'}`, 
              borderRadius: 'var(--radius)', cursor: 'pointer', background: method === 'COD' ? 'var(--accent)' : '#fff',
              transition: '0.2s'
            }}>
              <input type="radio" name="pay" checked={method === "COD"} onChange={() => setMethod("COD")} style={{ transform: 'scale(1.5)', accentColor: 'var(--primary)' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text)' }}>Cash on Delivery</strong>
                <span className="muted" style={{ fontSize: '0.85rem' }}>Pay when you receive</span>
              </div>
            </label>

          </div>

          <h3 style={{ fontSize: '1.5rem', margin: '3rem 0 2rem', color: 'var(--primary)' }}>3. Subscription / Weekly Baskets 📦</h3>
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', marginBottom: isSubscription ? '1.5rem' : '0' }}>
              <input type="checkbox" checked={isSubscription} onChange={(e) => setIsSubscription(e.target.checked)} style={{ transform: 'scale(1.5)', accentColor: 'var(--primary)' }} />
              <div>
                <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--text)' }}>Subscribe to receive this order regularly</strong>
                <span className="muted" style={{ fontSize: '0.85rem' }}>Automatically receive these fresh products without re-ordering</span>
              </div>
            </label>
            
            {isSubscription && (
              <div style={{ marginTop: '1.5rem', animation: 'slideUp 0.3s ease-out' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Choose Delivery Frequency:</label>
                <div className="grid grid-2" style={{ gap: '10px' }}>
                  {["Daily", "Every 3 Days", "Weekly", "Bi-Weekly", "Monthly"].map((freq) => (
                    <div 
                      key={freq}
                      onClick={() => setFrequency(freq)}
                      style={{ 
                        padding: '1rem', 
                        border: `2px solid ${frequency === freq ? 'var(--primary)' : 'var(--border)'}`, 
                        borderRadius: 'var(--radius)', 
                        cursor: 'pointer', 
                        background: frequency === freq ? 'var(--accent)' : '#fff',
                        textAlign: 'center',
                        fontWeight: '500',
                        transition: '0.2s'
                      }}
                    >
                      {freq}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: 'var(--radius)', fontSize: '0.9rem' }}>
                  <strong>💡 Subscriber Benefit:</strong> Save 5% on all future recurring deliveries automatically!
                </div>
              </div>
            )}
          </div>
        </form>

        <div className="summary sticky-desktop" style={{ background: 'var(--primary)', color: '#fff' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem', color: '#fff' }}>Order Items</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '10px' }}>
            {cart?.items?.map(i => (
              <div key={i.product._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px dashed rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{i.quantity}x</span>
                  <span style={{ fontWeight: '500' }}>{i.product.name}</span>
                </div>
                <span style={{ fontWeight: '700' }}>₹{(i.product.discountPrice || i.product.price) * i.quantity}</span>
              </div>
            ))}
          </div>

          <div className="summary-row" style={{ color: 'rgba(255,255,255,0.8)' }}><span>Subtotal</span> <span>₹{rawSubtotal.toFixed(2)}</span></div>
          {isPremium && (
            <div className="summary-row" style={{ color: '#a7f3d0', fontWeight: 'bold' }}>
              <span>🌟 FarmPass Discount (10%)</span> <span>-₹{premiumDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="summary-row" style={{ color: 'rgba(255,255,255,0.8)' }}>
            <span>Delivery Fee</span> 
            <span>
              {deliveryCharge === 0 ? (
                <span style={{ color: isPremium ? '#a7f3d0' : 'inherit' }}>Free</span>
              ) : `₹${deliveryCharge}`}
            </span>
          </div>
          <div className="summary-row total" style={{ color: '#fff', borderTopColor: 'rgba(255,255,255,0.2)' }}>
            <span>Total to Pay</span> <span>₹{totalToPay.toFixed(2)}</span>
          </div>
          <button form="checkoutForm" type="submit" className="btn btn-block" disabled={loading} style={{ background: '#fff', color: 'var(--primary)', padding: '1.2rem', marginTop: '2rem', fontSize: '1.1rem' }}>
            {loading ? "Processing..." : "Place Order Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
