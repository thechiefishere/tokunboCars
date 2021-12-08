import React, { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Profile = () => {
  const { setUserDetails, userDetails, loggedIn } = useGlobalContext();

  useEffect(() => {
    async function getSingleUser() {
      const token = localStorage.getItem("tokunbo-token");
      try {
        const response = await fetch(
          "https://buy-tokunbo-cars.herokuapp.com/authenticate/user",
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        const { status, userDetails } = data;
        if (status === "success") {
          setUserDetails(userDetails);
        }
      } catch (error) {
        console.log("error");
      }
    }

    getSingleUser();
  }, []);

  if (!loggedIn) {
    return (
      <section className="section profile">
        <h1 className="section-header">Profile</h1>
        <h2>
          Please kindly{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </h2>
      </section>
    );
  }

  const { firstName, lastName, carsInCart, pendingCars, deliveredCars } =
    userDetails;

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
