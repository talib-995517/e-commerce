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
      .then(res => {
        setProduct(res.data);
      })
      .catch(() => {
        setError("Product loading failed");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!product) return <Error message="Product not found" />;

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back to Products
      </button>
      
      <div className="details-container">
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} />
        <div className="info">
          <h1>{product.title}</h1>
          <p className="category">{product.category}</p>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>
          <div className="rating">
            Rating: {product.rating} ⭐
          </div>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;