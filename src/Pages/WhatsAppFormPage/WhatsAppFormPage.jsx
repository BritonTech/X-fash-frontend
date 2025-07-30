import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'; // adjust the path as needed
import './WhatsAppFormPage.css';
import Select from 'react-select'; // at the top


const WhatsAppFormPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { all_product,url } = useContext(StoreContext); // ✅ Use global context

    console.log(all_product);


    const [form, setForm] = useState({
        name: '',
        address: '',
        product: [],
        quantity: 1,
        deliveryMethod: 'Delivery',
    });

    const previousPath = location.state?.from || '/';

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const { name, address, product, quantity, deliveryMethod } = form;

        if (!name || !address || product.length === 0) {
            alert('Please fill in all required fields.');
            return;
        }

        // 🟢 Extract selected product names from React Select values
        const productNames = product.map((item) => item.value).join(', ');

        const message = `*Hello, I would like to place an order:*\n\n*Name:* ${name}\n*Address:* ${address}\n*Products:* ${productNames}\n*Quantity:* ${quantity}\n*Delivery Method:* ${deliveryMethod}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/254740935676?text=${encodedMessage}`;
        window.location.href = whatsappURL;
    };


    return (
        <div className="order-page">
            <div className="order-form">
                <div className='whatsapp-order-hearder'>
                    <h2 className='whatsapp-order-header-text'>Place Your Order⤵️</h2>
                </div>
                <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
                <input name="address" placeholder="Your Address" value={form.address} onChange={handleChange} />


                {/* <select name="product" value={form.product} onChange={handleChange}   multiple >
                    <option value="">Select Product</option>

                    {Array.isArray(all_product) && all_product.length > 0 ? (
                        all_product.map((p, i) => (
                            <option key={i} value={p.name || p.title || `Product ${i}`}>
                                {p.name || p.title || `Unnamed Product ${i + 1}`}
                            </option>
                        ))
                    ) : (
                        <option disabled>⚠ No products available</option>
                    )}
                </select> */}
                {/* <Select
                    isMulti
                    name="product"
                    options={all_product.map((p, i) => ({
                        value: p.name || p.title || `Product ${i}`,
                        label: p.name || p.title || `Unnamed Product ${i + 1}`,
                    }))}
                    value={form.product}
                    onChange={(selectedOptions) => {
                        setForm((prev) => ({
                            ...prev,
                            product: selectedOptions || [],
                        }));
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                /> */}
                <Select
                    isMulti
                    name="product"
                    options={all_product.map((p, i) => ({
                        value: p.name || p.title || `Product ${i}`,
                        label: p.name || p.title || `Unnamed Product ${i + 1}`,
                        image: p.image, // assuming your product has an image field like p.image
                    }))}
                    formatOptionLabel={({ label, image }) => (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img
                                src={image}
                                alt={label}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '4px',
                                    objectFit: 'cover',
                                }}
                            />
                            <span>{label}</span>
                        </div>
                    )}
                    value={form.product}
                    onChange={(selectedOptions) => {
                        setForm((prev) => ({
                            ...prev,
                            product: selectedOptions || [],
                        }));
                    }}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />




                <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="Quantity"
                />

                <select name="deliveryMethod" value={form.deliveryMethod} onChange={handleChange}>
                    <option value="Delivery">Delivery</option>
                    <option value="Pickup">Pickup</option>
                </select>

                <div className="form-actions">
                    <button className="submit" onClick={handleSubmit}>Send to WhatsApp</button>
                    <button className="cancel" onClick={() => navigate(previousPath)}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppFormPage;
