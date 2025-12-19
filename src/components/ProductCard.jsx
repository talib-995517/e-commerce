import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      <img src={product.thumbnail} width="150" />
      <h3>{product.title}</h3>
      <p>₹ {product.price}</p>
      <p>Rating: {product.rating}</p>

      <Link to={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
