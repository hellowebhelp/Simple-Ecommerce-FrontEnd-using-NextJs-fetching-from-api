import { useEffect, useState } from "react";
import Link from "next/link";
export default function Checkout() {

    // ========================================
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cart, setCart] = useState([]);
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

    // Totle Price
    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * (item.qty || 1);
    }, 0);

    // REMOVE CART ITEMS
    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item._id !== id);

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // =========================================


    return (
        <>
            <button className="cart-btn" onClick={() => setIsCartOpen(true)} >
                🛒 Cart ({cart.length})
            </button>
            <div style={styles.container}>

                {/* LEFT FORM */}
                <div style={styles.left}>
                    <h2>Checkout</h2>

                    <input style={styles.input} placeholder="Full Name" />
                    <input style={styles.input} placeholder="Phone Number" />
                    <input style={styles.input} placeholder="Address" />
                    <input style={styles.input} placeholder="City" />

                    <button style={styles.button}>Place Order</button>
                </div>

                {/* RIGHT CART */}
                <div style={styles.right}>
                    <h3>Order Summary</h3>

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

                    <hr />

                    <h4> Total: ${totalPrice}</h4>
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

const styles = {
    container: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        background: "#f7f7f7",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap", // ✅ responsive magic
    },

    left: {
        flex: "1 1 300px",
        maxWidth: "600px",
        background: "#fff",
        padding: "18px",
        borderRadius: "10px",
        width: "100%",
    },

    right: {
        flex: "1 1 220px",
        maxWidth: "400px",
        background: "#fff",
        padding: "18px",
        borderRadius: "10px",
        width: "100%",
        height: "fit-content",
    },

    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        outline: "none",
    },

    button: {
        width: "100%",
        padding: "10px",
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },

    item: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
    },
};