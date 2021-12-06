import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "./Loading";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loadingLogin, setUserDetails } = useGlobalContext();
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://buy-tokunbo-cars.herokuapp.com/authenticate/register",
        {
          method: "POST",
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { status, userDetails, token } = data;
      if (status === "success") {
        localStorage.setItem("tokunbo-token", token);
        setLoggedIn(true);
        setUserDetails(userDetails);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section signup">
      <h1 className="section-header">Register</h1>
      {loadingLogin && <Loading />}
      <article className="section-form">
        <form className="form" onSubmit={addUser}>
          <div className="form-group">
            <label label="fname">First Name</label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label label="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label label="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label label="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <p className="form-warning">Please Fill Out All Form Fields</p>
          <button className="btn btn-submit">SUBMIT</button>
        </form>
        <p>
          Already A Member?{" "}
          <NavLink to="/login" className="form-link">
            Login
          </NavLink>
        </p>
      </article>
    </section>
  );
};

export default Signup;
