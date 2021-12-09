import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";

const CartItem = ({ carId }) => {
  const [car, setCar] = useState("");
  const { removeFromCart } = useGlobalContext();

  useEffect(() => {
    let isMounted = true;
    fetchCar();
    return () => {
      isMounted = false;
    };

    async function fetchCar() {
      try {
        const response = await fetch(
          `https://buy-tokunbo-cars.herokuapp.com/cars/${carId}`
        );
        const data = await response.json();
        const { status, car } = data;
        if (status === "success") {
          if (isMounted) {
            setCar(car);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    //eslint-disable-next-line
  }, []);

  const { image, name, price } = car;

  return (
    <section className="cartitem">
      <img src={image} alt={name} />
      <div className="cartitem-details">
        <h3>{name}</h3>
        <h5>N{price}</h5>
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
