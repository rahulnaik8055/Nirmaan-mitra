import React, { createContext, useState, useEffect } from "react";

// Create Context
export const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Calculate total amount based on cart items
    const calculatedTotal = cartItems.reduce(
      (total, item) => total + item.Price * item.Quantity,
      0
    );
    setTotalAmount(calculatedTotal);

    // Store the total amount in localStorage if needed
    localStorage.setItem("totalAmount", JSON.stringify(calculatedTotal));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      // Update quantity of existing item
      const updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, Quantity: item.Quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Add new item to cart
      const updatedCart = [...cartItems, { ...product, Quantity: 1 }];
      setCartItems(updatedCart);
    }
  };

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent setting quantity to less than 1

    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, Quantity: quantity } : item
    );
    setCartItems(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    // Find the item to be removed
    const itemToRemove = cartItems.find((item) => item._id === productId);

    if (itemToRemove) {
      // Remove the item from the cart
      const updatedCart = cartItems.filter((item) => item._id !== productId);

      // Calculate the total amount based on remaining cart items
      const updatedTotal = updatedCart.reduce(
        (total, item) => total + item.Price * item.Quantity,
        0
      );

      setCartItems(updatedCart);
      setTotalAmount(updatedTotal);
    }
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setTotalAmount(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalAmount");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalAmount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setCartItems,
        setTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
