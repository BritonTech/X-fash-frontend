import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import "./ProductDetails.css"; // optional styling
import Price from '../../Components/Price/Price';

const ProductDetails = () => {
  const { id } = useParams();
  const { all_product, addToCart } = useContext(StoreContext);

  const product = all_product.find((item) => item._id === id);

  if (!product) {
    return <div style={{ padding: 20 }}>Product not found</div>;
  }

  return (
    <div className="product-details-container">

      <img src={product.image} alt={product.name} className="product-details-image" />

      <div className="product-details-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>New Price:</strong> <Price amountInKES={product.new_price}/></p>
        <p>Old Price: <s><Price amountInKES={product.old_price}/></s></p>

        <button onClick={() => addToCart(product._id)}>ADD TO CART 🛒</button>
      </div>
    </div>
  );
};

export default ProductDetails;
