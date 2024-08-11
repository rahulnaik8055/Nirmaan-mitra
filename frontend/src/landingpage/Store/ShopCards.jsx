import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CardComponent from "./cardComponent";
import { CartContext } from "./CartContext";
import config from "../../../config";

const ShopCards = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`${config.apiBaseUrl}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row shopcards">
        {products.map((product) => (
          <CardComponent
            key={product._id}
            imgSrc={product.imgSrc}
            title={product.title}
            Price={product.Price}
            Quantity={product.Quantity}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopCards;
