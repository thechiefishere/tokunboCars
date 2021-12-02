import React from "react";

const Car = ({ car }) => {
  const { name, image, price } = car;

  return (
    <article className="car">
      <div className="car-img-cont">
        <img src={image} alt={name} className="car-img" />
        <button className="btn btn-car">Details</button>
      </div>
      <div className="car-detail">
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </article>
  );
};

export default Car;
