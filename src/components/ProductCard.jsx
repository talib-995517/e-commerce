import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card-inner">
      <div className="product-image-wrapper">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <div className="product-card-meta">
          <span className="card-price">₹{product.price}</span>
          <span className="card-rating">★ {product.rating}</span>
        </div>

        <Link to={`/product/${product.id}`} className="view-details-link">
          <button className="view-btn">View Details</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
