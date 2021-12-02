import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <section className="section login">
      <h1 className="section-header">Sign In</h1>
      <article className="section-form">
        <form className="form">
          <div className="form-group">
            <label label="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="form-group">
            <label label="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <p className="form-warning">Please Fill Out All Form Fields</p>
          <button className="btn btn-submit">SUBMIT</button>
        </form>
        <p>
          Need To Register? <NavLink to="/signup">Sign Up</NavLink>{" "}
        </p>
      </article>
    </section>
  );
};

export default Login;
