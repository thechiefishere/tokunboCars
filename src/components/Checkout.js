import React, { useState } from "react";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import { FaCreditCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const { loadingLogin, cartsTotal, loggedIn, placeOrder } = useGlobalContext();
  const [cardHolder, setCardHolder] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCVC] = useState("");
  const navigate = useNavigate();

  if (!loggedIn) {
    return (
      <section className="section profile">
        <h1 className="section-header">CheckOut</h1>
        <h2>
          Please kindly{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </h2>
      </section>
    );
  }

  const submitOrder = (e) => {
    e.preventDefault();
    const valid = checkValidity();
    if (valid) {
      placeOrder();
      navigate("/");
    }
  };

  const checkValidity = () => {
    if (
      cardHolder.length > 3 &&
      cardNum.toString().length === 16 &&
      year.toString().length === 2
    ) {
      return true;
    }
    return false;
  };

  return (
    <section className="section checkout">
      <h1 className="section-header">CheckOut</h1>
      {loadingLogin && <Loading />}
      <article className="section-form">
        <form className="form" onSubmit={submitOrder}>
          <div className="form-details">
            <h2 className="form-total">Order Total: ${cartsTotal}</h2>
            <h4>Credit Or Debit Card</h4>
            <p>Test Using Credit Card 4242 4242 4242 4242</p>
            <p>Enter Any 3 Digits For The CVC</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Card Holder</label>
            <input
              type="text"
              id="name"
              name="name"
              value={cardHolder}
              onChange={(e) => {
                setCardHolder(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <FaCreditCard />
            <input
              type="number"
              id="card-num"
              name="card-num"
              placeholder="Card Number"
              value={cardNum}
              onChange={(e) => {
                setCardNum(e.target.value);
              }}
            />
            <input
              type="number"
              name="month"
              placeholder="MM"
              id="month"
              min="1"
              max="12"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
            />
            <input
              type="number"
              name="year"
              id="year"
              min="21"
              max="28"
              placeholder="YY"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
            <input
              type="number"
              name="cvc"
              id="cvc"
              min="1"
              max="999"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => {
                setCVC(e.target.value);
              }}
            />
          </div>
          <button className="btn btn-submit">SUBMIT</button>
        </form>
      </article>
    </section>
  );
};

export default Checkout;
