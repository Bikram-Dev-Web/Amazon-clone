import React, { useEffect } from "react";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 2999,
      image: "/images/earbuds.jpg",
    },
    {
      id: 2,
      name: "Smart LED TV",
      price: 22999,
      image: "/images/tv.jpg",
    },
    {
      id: 3,
      name: "Casual Sneakers",
      price: 1999,
      image: "/images/sneakers.jpg",
    },
  ];

  useEffect(() => {
    const container = document.getElementById("widget-container");
    if (container) {
      container.innerHTML = ""; // Clear the placeholder
      const widget = document.createElement("div");
      widget.innerHTML = "📦 [Widget loaded here]";
      container.appendChild(widget);
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>📦 Featured Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button style={{ padding: "5px 10px" }}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Widget Section */}
      <div
        id="widget-container"
        style={{
          border: "2px dashed gray",
          padding: "20px",
          marginTop: "40px",
          height: "200px",
          textAlign: "center",
        }}
      ></div>
    </div>
  );
};

export default Home;
