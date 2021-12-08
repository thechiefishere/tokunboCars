import React from "react";
import { Link } from "react-router-dom";

const Car = ({ car }) => {
  const { _id, name, image, price } = car;

  return (
    <article className="car">
      <div className="car-img-cont">
        <img src={image} alt={name} className="car-img" />
        <button className="btn btn-car">
          <Link className="btn-link" to={`/car-details/${_id}`}>
            Details
          </Link>
        </button>
      </div>
      <div className="car-detail">
        <p>{name}</p>
        <p>${price}</p>
      </div>
    </article>
  );
};

export default Car;
