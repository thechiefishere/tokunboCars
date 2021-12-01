import React from "react";

const Car = ({ car }) => {
  const { name, image, price } = car;

  return (
    <article className="car">
      <img src={image} alt={name} className="car-img" />
      <div className="car-detail">
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </article>
  );
};

export default Car;
