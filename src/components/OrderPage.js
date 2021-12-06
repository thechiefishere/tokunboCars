import React from "react";
import { useGlobalContext } from "../context";
import CartItem from "./CartItem";
import { FaTimes } from "react-icons/fa";

const OrderPage = () => {
  const { cartItems, showOrderPage, setShowOrderPage } = useGlobalContext();
  return (
    <section
      className={showOrderPage ? "orderpage show-orderpage" : "orderpage"}
    >
      <article className="orderpage-heading">
        <FaTimes
          className="orderpage-times"
          onClick={() => setShowOrderPage(false)}
        />
        <h1 className="orderpage-title">Cart</h1>
      </article>
      <article className="cartitems">
        {cartItems.map((item, index) => {
          return <CartItem key={index} carId={item} />;
        })}
      </article>
    </section>
  );
};

export default OrderPage;
