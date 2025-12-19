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
  const navigate = useNavigate();

  // Categories based on your screenshot
  const categories = [
    "All Categories",
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Meat & Fish",
    "Beverages",
    "Snacks",
    "Bakery",
    "Frozen Foods"
  ];

  // Fetch products
  useEffect(() => {
    setLoading(true);
    getProducts()
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(() => setError("Loading Failed"))
      .finally(() => setLoading(false));
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      // Search filter
      const matchesSearch = search === "" || 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      
      // Category filter - match based on tags and product details
      const matchesCategory = selectedCategory === "All Categories" || (() => {
        const cat = selectedCategory.toLowerCase();
        const tags = (p.tags || []).map(t => t.toLowerCase()).join(' ');
        const title = (p.title || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        const searchText = `${tags} ${title} ${desc}`;
        
        if (cat === 'fruits & vegetables') {
          return tags.includes('fruits') || tags.includes('vegetables') || 
                 searchText.includes('apple') || searchText.includes('cucumber') || 
                 searchText.includes('kiwi') || searchText.includes('pepper');
        }
        if (cat === 'dairy & eggs') {
          return tags.includes('dairy') || searchText.includes('egg') || 
                 searchText.includes('milk') || searchText.includes('cheese');
        }
        if (cat === 'meat & fish') {
          return tags.includes('meat') || tags.includes('seafood') || 
                 searchText.includes('beef') || searchText.includes('chicken') || 
                 searchText.includes('fish');
        }
        if (cat === 'beverages') {
          return tags.includes('beverages') || searchText.includes('juice') || 
                 searchText.includes('drink');
        }
        if (cat === 'snacks') {
          return searchText.includes('snack') || searchText.includes('chips');
        }
        if (cat === 'bakery') {
          return searchText.includes('bread') || searchText.includes('bakery');
        }
        if (cat === 'frozen foods') {
          return searchText.includes('ice cream') || searchText.includes('frozen');
        }
        return false;
      })();
      
      // Price filter
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      
      // Rating filter
      const matchesRating = p.rating >= minRating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      // Sort logic
      switch(sortBy) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return (
    <div className="loading-container">
      <Loader />
      <p>Products is loading</p>
    </div>
  );

  if (error) return <Error message={error} />;

  return (
    <div className="gromuse-container">
      {/* Header */}
      <header className="gromuse-header">
        <h1>Store</h1>
        <input
          className="gromuse-search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <div className="gromuse-main">
        {/* Sidebar Filters */}
        <aside className="gromuse-sidebar">
          <h2>All category</h2>
          
          {/* Categories */}
          <div className="filter-section">
            <h3>Categories</h3>
            {categories.map(cat => (
              <div 
                key={cat} 
                className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </div>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h3>Price</h3>
            <div className="price-slider">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value)})}
                className="slider"
              />
              <div className="price-range">
                <span>₹0</span>
                <span>₹{priceRange.max}</span>
              </div>
            </div>
          </div>

          {/* Review Filter */}
          <div className="filter-section">
            <h3>Review</h3>
            {[0, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="filter-option" onClick={() => setMinRating(rating)}>
                <input 
                  type="radio" 
                  id={`rating-${rating}`} 
                  name="rating-filter"
                  checked={minRating === rating}
                  onChange={() => {}}
                />
                <label htmlFor={`rating-${rating}`}>
                  {rating === 0 ? 'All Ratings' : `★${rating}.0+`}
                </label>
              </div>
            ))}
          </div>

          <button 
            className="all-filters-btn"
            onClick={() => {
              setSearch("");
              setSelectedCategory("All Categories");
              setPriceRange({ min: 0, max: 1000 });
              setMinRating(0);
              setSortBy("default");
            }}
          >
            Remove Filter
          </button>
        </aside>

        {/* Main Product Area */}
        <main className="gromuse-content">
          {/* Sort Bar */}
          <div className="sort-bar">
            <span>{filteredProducts.length} products</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort by</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="gromuse-grid">
            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <p>No products found. Try changing your filters.</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="gromuse-product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;