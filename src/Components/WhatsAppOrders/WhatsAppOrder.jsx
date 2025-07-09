import React, { useState, useEffect } from 'react';
import './WhatsAppOrder.css';
import axios from 'axios';

const WhatsAppOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', product: '' });
  const [products, setProducts] = useState([]);

  // Fetch product list from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products'); // Update URL if different
        setProducts(res.data); // Assuming res.data is an array of products
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    const { name, address, product } = form;
    if (!name || !address || !product) {
      alert('Please fill in all fields.');
      return;
    }

    const message = `Hello, I would like to place an order:\n\n*Name:* ${name}\n*Address:* ${address}\n*Product:* ${product}`;
    const encodedMessage = encodeURIComponent(message);
    const adminPhone = '254712345678'; // Replace with admin number
    const whatsappURL = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    setIsOpen(false);
    setForm({ name: '', address: '', product: '' });
  };

  return (
    <>
      <footer className="footer">
        <img
          src="/whatsapp-icon.png"
          alt="WhatsApp"
          className="whatsapp-icon"
          onClick={() => setIsOpen(true)}
        />
      </footer>

      {isOpen && (
        <div className="whatsapp-popup">
          <div className="whatsapp-form">
            <span className="close-btn" onClick={() => setIsOpen(false)}>×</span>
            <h3>Place Your Order</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={form.address}
              onChange={handleChange}
            />
            <select name="product" value={form.product} onChange={handleChange}>
              <option value="">Select Product</option>
              {products.map((p, i) => (
                <option key={i} value={p.name}>{p.name}</option>
              ))}
            </select>
            <button onClick={sendToWhatsApp}>Send to WhatsApp</button>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppOrder;
