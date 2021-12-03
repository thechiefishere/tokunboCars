import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "./Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loadingLogin, setLoadingLogin } = useGlobalContext();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setLoggedIn(false);
    setLoadingLogin(true);
    try {
      const response = await fetch(
        "https://buy-tokunbo-cars.herokuapp.com/authenticate/login",
        {
          method: "POST",
          body: JSON.stringify({
            email: email.toLowerCase(),
            password: password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      const { status } = data;
      if (status === "success") {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        setEmail("");
        setPassword("");
        navigate("/");
        setLoadingLogin(false);
      }
    } catch (error) {
      console.log(error);
      setLoadingLogin(false);
    }
  };

  return (
    <section className="section login">
      <h1 className="section-header">Sign In</h1>
      {loadingLogin && <Loading />}
      <article className="section-form">
        <form className="form" onSubmit={loginUser}>
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
          Need To Register?{" "}
          <NavLink to="/signup" className="form-link">
            Sign Up
          </NavLink>
        </p>
      </article>
    </section>
  );
};

export default Login;
