import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "./CartContext";
import { v4 as uuidv4 } from "uuid";
import CartComponent from "./CartComponent";
import { useNavigate } from "react-router-dom";
import Orders from "./Orders";
import config from "../../../config";
import { useFlashMessage } from "../../OtherComponents/FlashMessageContext";
import useUserProfile from "../../customHooks/userStatus";

const Cart = () => {
  const { cartItems, totalAmount, setCartItems, setTotalAmount } =
    useContext(CartContext);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useUserProfile(); // Get authentication status from the custom hook
  const navigate = useNavigate();
  const { showMessage } = useFlashMessage();

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);

    const updatedTotal = updatedCart.reduce(
      (total, item) => total + item.Price * item.Quantity,
      0
    );
    setTotalAmount(updatedTotal);
  };

  useEffect(() => {
    // Redirect to login if user is not authenticated
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleOrder = () => {
    setLoading(true);

    const orderData = {
      items: cartItems.map((item) => ({
        key: uuidv4(),
        productId: item._id,
        quantity: item.Quantity, // Include quantity of each item
      })),
      total: totalAmount,
    };

    axios
      .post(`${config.apiBaseUrl}/orders`, orderData, { withCredentials: true })
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Order placed successfully!...Delivery soon");
        showMessage("Order placed Successfully", "success");
        navigate("/orderplaced");
        setCartItems([]);
        setTotalAmount(0);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data?.message);
      });
  };

  return (
    <div className="container mb-5 margin text-center">
      <h3 className="mt-5 mb-5 text-warning display-4 fw-bold shadow-text fs-1">
        My Cart
      </h3>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cartItems.length === 0 ? (
          <p className="no-items mt-5 mb-5">No items in cart.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="col">
              <CartComponent
                title={item.title}
                imgSrc={item.imgSrc}
                Price={item.Price}
                Quantity={item.Quantity}
                onRemove={() => removeFromCart(item._id)}
              />
            </div>
          ))
        )}
      </div>
      {cartItems.length === 0 ? (
        ""
      ) : (
        <div className="col-12">
          <p className="col-12">Total Amount: &#8377;{totalAmount}</p>
          <button
            className="btn btn-warning"
            onClick={handleOrder}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      )}

      <Orders />
    </div>
  );
};

export default Cart;
