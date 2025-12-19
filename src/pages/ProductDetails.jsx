import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import Loader from "../components/Loader";
import Error from "../components/Error";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => setError("Product loading failed"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="product-details-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">
  <span className="arrow">←</span> Back to Products
</button>
        
        {/* Ye hai wo box (div) jiske andar details hongi */}
        <div className="details-card">
          <div className="image-section">
            <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
          </div>
          
          <div className="info-section">
            <span className="category-tag">{product.category}</span>
            <h1>{product.title}</h1>
            <p className="price-text">₹{product.price}</p>
            
            <div className="rating-row">
              <span className="star-icon">★</span>
              <span>{product.rating}</span>
              <span className="stock-status">In Stock</span>
            </div>

            <div className="description-box">
              <h3>About this item</h3>
              <p>{product.description}</p>
            </div>

            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;