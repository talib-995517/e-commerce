import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

// In dono files ko yahan import karna zaroori hai
import "./index.css"; 
import "./App.css"; 

function App() {
  return (
    // "container-div" isliye taaki global padding har page par barabar mile
    <div className="app-wrapper"> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
