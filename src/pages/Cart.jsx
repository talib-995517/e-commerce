import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    updateQuantity(id, newQty);
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button 
          onClick={() => navigate('/')} 
          className="continue-shopping-btn"
          style={{
            padding: '12px 24px',
            background: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '20px',
            transition: 'all 0.3s ease'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '15px',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      <h1 style={{
        fontSize: 'clamp(22px, 5vw, 28px)',
        margin: '0 0 25px 0',
        color: '#333',
        textAlign: 'center',
        fontWeight: '600'
      }}>Your Shopping Cart</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '25px',
        alignItems: 'start',
        '@media (min-width: 992px)': {
          gridTemplateColumns: '1fr 350px',
          gap: '30px'
        }
      }}>
        <div className="cart-items" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {cart.map(item => (
            <div key={item.id} style={{
              background: 'white',
              borderRadius: '10px',
              padding: '15px',
              border: '1px solid #eee',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              position: 'relative',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              '@media (min-width: 576px)': {
                flexDirection: 'row',
                gap: '20px'
              }
            }}>
              <div style={{
                width: '100%',
                maxWidth: '120px',
                height: '120px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                margin: '0 auto',
                '@media (min-width: 576px)': {
                  margin: '0',
                  width: '120px'
                }
              }}>
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                  onClick={() => navigate(`/product/${item.id}`)}
                />
              </div>
              
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                '@media (min-width: 576px)': {
                  width: 'auto'
                }
              }}>
                <div>
                  <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '18px',
                    color: '#333',
                    cursor: 'pointer'
                  }} 
                  onClick={() => navigate(`/product/${item.id}`)}
                  >
                    {item.title}
                  </h3>
                  <p style={{
                    color: '#2ecc71',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: '5px 0 10px'
                  }}>
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '10px'
                }}>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.qty - 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    -
                  </button>
                  <span style={{
                    minWidth: '30px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {item.qty}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.qty + 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      border: '1px solid #2ecc71',
                      background: '#2ecc71',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0
                    }}
                  >
                    +
                  </button>
                  
                  <span style={{
                    marginLeft: 'auto',
                    color: '#666',
                    fontWeight: '600'
                  }}>
                    ₹{(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  color: '#999',
                  cursor: 'pointer',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#f8f9fa'}
                onMouseOut={(e) => e.target.style.background = 'none'}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #eee',
          position: 'sticky',
          top: '20px',
          '@media (min-width: 992px)': {
            position: 'sticky',
            top: '90px'
          }
        }}>
          <h3 style={{
            marginTop: 0,
            paddingBottom: '15px',
            borderBottom: '1px solid #eee',
            fontSize: '20px',
            color: '#333'
          }}>Order Summary</h3>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            margin: '20px 0',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '15px',
              color: '#666'
            }}>
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.qty, 0)} items)</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '15px',
              color: '#666'
            }}>
              <span>Shipping</span>
              <span style={{color: '#2ecc71'}}>FREE</span>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '18px',
            fontWeight: 'bold',
            margin: '20px 0',
            paddingTop: '15px',
            borderTop: '1px solid #eee'
          }}>
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={() => alert('Proceeding to checkout')}
            style={{
              width: '100%',
              padding: '14px',
              background: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '10px'
            }}
            onMouseOver={(e) => e.target.style.background = '#27ae60'}
            onMouseOut={(e) => e.target.style.background = '#2ecc71'}
          >
            Proceed to Checkout
          </button>
          
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '12px',
              background: 'white',
              color: '#2ecc71',
              border: '1px solid #2ecc71',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '15px'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f5f5f5';
              e.target.style.color = '#27ae60';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#2ecc71';
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
