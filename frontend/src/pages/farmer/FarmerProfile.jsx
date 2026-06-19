import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function FarmerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ 
    name: user.name, 
    phone: user.phone || "", 
    address: user.address || "", 
    farmName: user.farmName || "" 
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/profile", form);
      updateUser(res.data);
      toast.success("Profile updated successfully!");
    } catch { 
      toast.error("Failed to update profile"); 
    }
  };

  return (
    <div className="container dash">
      <aside className="sidebar">
        <Link to="/farmer">Overview</Link>
        <Link to="/farmer/products">My Products</Link>
        <Link to="/farmer/products/new">Add Product</Link>
        <Link to="/farmer/orders?status=current">Current Orders</Link>
        <Link to="/farmer/orders?status=delivered">Delivered Orders</Link>
        <Link to="/farmer/profile" className="active">Profile</Link>
      </aside>
      <div>
        <h1 className="mb-2">Update Profile</h1>
        <form className="card" style={{ padding: "2rem", maxWidth: "600px" }} onSubmit={submit}>
          <div className="form-group">
            <label>Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Farm Name</label>
            <input className="input" value={form.farmName} onChange={(e) => setForm({ ...form, farmName: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Farm Address</label>
            <textarea className="textarea" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required rows={4} />
          </div>
          <button className="btn" type="submit" style={{ marginTop: "1rem" }}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}
