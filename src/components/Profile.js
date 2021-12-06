import React from "react";
import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Profile = () => {
  const {
    userDetails: {
      firstName,
      lastName,
      carsInCart,
      pendingCars,
      deliveredCars,
    },
    loggedIn,
  } = useGlobalContext();

  if (!loggedIn) {
    return (
      <section>
        <Link to="/signup">Sign Up</Link>
        OR
        <Link to="/login">Log in</Link>
      </section>
    );
  }

  return (
    <section className="section profile">
      <article className="profile-user">
        <CgProfile className="profile-logo" />
        <h2 className="profile-name">
          {firstName} {lastName}
        </h2>
      </article>
      <article className="profile-orders">
        <div>
          <h3>Cart Items</h3>
          {carsInCart.length > 0 ? (
            carsInCart.map((car) => {
              return <h4 key={car._id}>{car.name}</h4>;
            })
          ) : (
            <h4>NO CAR TO SHOW</h4>
          )}
        </div>
        <div>
          <h3>Pending Orders</h3>
          {pendingCars.length > 0 ? (
            pendingCars.map((car) => {
              return <h4 key={car._id}>{car.name}</h4>;
            })
          ) : (
            <h4>NO CAR TO SHOW</h4>
          )}
        </div>
        <div>
          <h3>Bought Cars</h3>
          {deliveredCars.length > 0 ? (
            deliveredCars.map((car) => {
              return <h4 key={car._id}>{car.name}</h4>;
            })
          ) : (
            <h4>NO CAR TO SHOW</h4>
          )}
        </div>
      </article>
    </section>
  );
};

export default Profile;
