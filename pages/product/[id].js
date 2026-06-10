import React from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(`http://localhost:5000/api/products/${params.id}`);
  const product = await res.json();

  if (!product.data) {
    return { notFound: true };
  }

  return {
    props: { product: product.data },
  };
}

export default function ProductPage({ product }) {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.name}>{product.name}</h1>

          <p style={styles.price}>${product.price}</p>

          <p style={styles.stock}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* <button style={styles.button}>Add to Cart</button> */}
        </div>
      </div>
    </>

  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f5f5f5",
  },
  card: {
    padding: "20px",
    borderRadius: "10px",
    background: "#fff",
    width: "500px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  name: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  price: {
    fontSize: "18px",
    color: "green",
    marginBottom: "10px",
  },
  stock: {
    marginBottom: "15px",
    color: "#555",
  },
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    background: "black",
    color: "white",
    cursor: "pointer",
  },
};