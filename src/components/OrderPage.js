import React from "react";
import { useGlobalContext } from "../context";
import CartItem from "./CartItem";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const { cartItems, showOrderPage, setShowOrderPage, cartsTotal, loggedIn } =
    useGlobalContext();

  return (
    <section
      className={showOrderPage ? "orderpage show-orderpage" : "orderpage"}
    >
      <div className="orderpage-bg"></div>
      <section className="orderpage-details">
        <section className="orderpage-container">
          <article className="orderpage-heading">
            <FaTimes
              className="orderpage-times"
              onClick={() => setShowOrderPage(false)}
            />
            <h1 className="orderpage-title">Cart</h1>
          </article>
          <article className="cartitems">
            {cartItems.map((item) => {
              return <CartItem key={item} carId={item} />;
            })}
          </article>
          {cartItems.length > 0 ? (
            <article className="orderpage-checkout">
              <h1 className="orderpage-checkout-total">Total: ${cartsTotal}</h1>
              {loggedIn ? (
                <button
                  onClick={() => {
                    setShowOrderPage(false);
                  }}
                  className="btn btn-link"
                >
                  <Link className="btn-link" to="/checkout">
                    CHECKOUT
                  </Link>
                </button>
              ) : (
                <h3>Please log in to checkout</h3>
              )}
            </article>
          ) : (
            <h1 className="orderpage-empty">is currently empty...</h1>
          )}
        </section>
      </section>
    </section>
  );
};

export default OrderPage;
