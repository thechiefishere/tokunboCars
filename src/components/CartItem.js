import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const CartItem = ({ carId }) => {
  const [car, setCar] = useState("");
  const { removeFromCart } = useGlobalContext();

  const fetchCar = async () => {
    try {
      const response = await fetch(
        `https://buy-tokunbo-cars.herokuapp.com/cars/${carId}`
      );
      const data = await response.json();
      const { status, car } = data;
      if (status === "success") {
        setCar(car);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCar();

    //eslint-disable-next-line
  }, []);

  const { image, name, price } = car;

  return (
    <section className="cartitem">
      <img src={image} alt={name} />
      <div className="cartitem-details">
        <h3>{name}</h3>
        <h5>${price}</h5>
      </div>
      <button
        onClick={() => {
          removeFromCart(carId);
        }}
        className="btn"
      >
        Remove
      </button>
    </section>
  );
};

export default CartItem;
