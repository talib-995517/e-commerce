import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "All Categories", "Fruits & Vegetables", "Dairy & Eggs", 
    "Meat & Fish", "Beverages", "Snacks", "Bakery", "Frozen Foods"
  ];

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(res => setProducts(res.data.products))
      .catch(() => setError("Loading Failed"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "All Categories" || (p.category === selectedCategory.toLowerCase());
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      const matchesRating = p.rating >= minRating;
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "price-low-high") return a.price - b.price;
      if (sortBy === "price-high-low") return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="loading-container"><Loader /><p>Loading...</p></div>;
  if (error) return <Error message={error} />;

  return (
    <div className="gromuse-container">
      <header className="gromuse-header">
        <h1>Gromuse</h1>
        <div className="header-actions" style={{width: '100%', maxWidth: '400px', display: 'flex', gap: '10px'}}>
            <input
            className="gromuse-search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button className="mobile-filter-btn" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                {isFilterOpen ? "Close" : "Filter"}
            </button>
        </div>
      </header>

      <div className="gromuse-main">
        <aside className={`gromuse-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-list">
                {categories.map(cat => (
                <div 
                    key={cat} 
                    className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => { setSelectedCategory(cat); setIsFilterOpen(false); }}
                >
                    {cat}
                </div>
                ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Price: ₹{priceRange.max}</h3>
            <input
                type="range" min="0" max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                className="slider"
            />
          </div>

          {/* --- Rating Filter Section --- */}
          <div className="filter-section">
            <h3>Customer Reviews</h3>
            <div className="rating-filter-container">
                {[4, 3, 2, 1].map((star) => (
                <div 
                    key={star} 
                    className={`rating-option ${minRating === star ? 'active' : ''}`}
                    onClick={() => setMinRating(star)}
                >
                    <div className="stars-wrapper">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < star ? "star filled" : "star"}>★</span>
                    ))}
                    <span className="rating-text">& up</span>
                    </div>
                </div>
                ))}
                <div 
                className={`rating-option ${minRating === 0 ? 'active' : ''}`}
                onClick={() => setMinRating(0)}
                style={{fontSize: '14px', marginTop: '5px'}}
                >
                All Ratings
                </div>
            </div>
          </div>

          <button className="all-filters-btn" onClick={() => { setSelectedCategory("All Categories"); setMinRating(0); setPriceRange({min:0, max:1000}); }}>
            Reset All
          </button>
        </aside>

        <main className="gromuse-content">
          <div className="sort-bar">
            <span>{filteredProducts.length} Items Found</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort By</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="gromuse-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="gromuse-product-card" onClick={() => navigate(`/product/${product.id}`)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;