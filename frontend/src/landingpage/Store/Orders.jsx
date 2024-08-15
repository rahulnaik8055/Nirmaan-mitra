import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import config from "../../../config";
import useUserProfile from "../../customHooks/userStatus";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated } = useUserProfile(); // Use hook for authentication status

  // Fetch orders once the user is authenticated
  useEffect(() => {
    if (!isAuthenticated) return; // Skip fetching orders if not authenticated

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${config.apiBaseUrl}/orders`, {
          withCredentials: true,
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  return (
    <div className="container text-center mt-5">
      <h2 className="text-warning display-4 fw-bold shadow-text fs-1 mb-5">
        Your Recent Orders
      </h2>
      <div className="row shopcards text-center">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="mb-4">
              <div className="card border-5">
                <div className="card-body">
                  <h6 className="text-warning display-4 fw-bold shadow-text fs-3 mb-5">
                    Items:
                  </h6>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item) => (
                      <li key={uuidv4()} className="list-group-item">
                        <div className="row">
                          <div className="col-3">
                            <img
                              src={item.productId.imgSrc}
                              alt={item.productId.title}
                              className="img-fluid rounded"
                              style={{ width: "5rem", height: "5rem" }}
                            />
                          </div>
                          <div className="col-9">
                            <h6>{item.productId.title}</h6>
                            <p>Price: &#8377;{item.productId.Price}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h6 className="mt-3 border p-3">
                    <b>Total:</b> &#8377;{order.total}
                  </h6>
                  <br />
                  <br />
                  <p className="card-text">
                    <b>Date:</b> {new Date(order.date).toLocaleDateString()}{" "}
                    <br />
                    <b>Order ID :</b> {order._id}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
