import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState([]);



  // SHOWING ALL PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/api/products/all")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [products]);


  // ADD TO CART
  const addToCart = (product) => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = savedCart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      existingProduct.qty = (existingProduct.qty || 1) + 1;
    } else {
      savedCart.push({
        ...product,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(savedCart));
    setCart([...savedCart]); // update UI
  };

  // GET CART ITEMS
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  // REMOVE CART ITEMS
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  return (
    <>
      <div className="container">
        <h1 className="section-title">Featured Products</h1>
        <button className="cart-btn" onClick={() => setIsCartOpen(true)} >
          🛒 Cart ({cart.length})
        </button>

        <div className="products-grid">
          {products?.data?.map(items => (
            <div className="product-card" key={items._id}>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                alt="Premium Wireless Headphones"
                className="product-image"
              />
              <div className="product-info">
                <Link href={`/product/${items._id}`} className="product-name">{items.name}</Link>
                {/* <div className="product-rating">
              <span className="stars">★</span> 4.8 (128 reviews)
            </div> */}
                <div className="product-price-section">
                  <span className="product-price">{items.price}</span>
                  {/* <span className="original-price">$249.99</span> */}
                  <span className="discount-badge">Stock: {items.stock}</span>
                </div>
                <button className="add-to-cart-btn" onClick={() => addToCart(items)}>Add to Cart</button>
              </div>
            </div>
          ))}

        </div>
      </div>


      {/* OPENMODEL */}
      {/* "active" is CSS Element that 'right: 0;' */}
      <div className={`cart-sidebar ${isCartOpen ? "active" : ""}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div className="open_model_grounds">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <h4>{item.name}</h4>
              <p>Qty: {item.qty}</p>
              <p>${item.price}</p>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}

          <Link href={'/checkout/'} className="checkout-btn">CheckOut</Link>
        </div>
      </div>
    </>
  );
}
