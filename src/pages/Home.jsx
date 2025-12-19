import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState(100);
  
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const categories = ["All Categories", "Beauty", "Fragrances", "Groceries", "Furniture"];

  useEffect(() => {
    getProducts().then(res => {
      setProducts(res.data.products);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = products.filter(p => {
    const mSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const mCat = selectedCat === "All Categories" || p.category.toLowerCase() === selectedCat.toLowerCase();
    const mPrice = p.price <= maxPrice;
    return mSearch && mCat && mPrice;
  });

  if (loading) return <Loader />;

  return (
    <div className="gromuse-container">
      <header className="gromuse-header">
        <h1 onClick={() => navigate('/')}>Gromuse</h1>
        <div className="header-actions">
          <input className="gromuse-search" placeholder="Search products..." onChange={e => setSearch(e.target.value)} />
          <div className="cart-badge" onClick={() => navigate('/cart')}>
            🛒 <span>{totalItems}</span>
          </div>
        </div>
      </header>

      <div className="gromuse-main">
        <aside className="gromuse-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            {categories.map(c => (
              <div key={c} className={`category-item ${selectedCat === c ? 'active' : ''}`} onClick={() => setSelectedCat(c)}>
                {c}
              </div>
            ))}
          </div>

          <div className="filter-section">
            <h3>Price: Up to ₹{maxPrice}</h3>
            <div className="price-slider-container">
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="5"
                value={maxPrice} 
                onChange={e => setMaxPrice(Number(e.target.value))} 
                className="slider" 
              />
              <div className="price-range">
                <span>₹0</span>
                <span>₹200</span>
              </div>
            </div>
          </div>

          <button 
            className="all-filters-btn" 
            onClick={() => {
              setSelectedCat("All Categories");
              setMaxPrice(200);
              setSearch("");
            }}
          >
            Reset All
          </button>
        </aside>

        <main className="gromuse-content">
          <div className="gromuse-grid">
            {filtered.map(p => (
              <div key={p.id} className="card-wrapper" onClick={() => navigate(`/product/${p.id}`)}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;