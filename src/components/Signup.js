import React from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <section className="section signup">
      <h1 className="section-header">Register</h1>
      <article className="section-form">
        <form className="form">
          <div className="form-group">
            <label label="fname">First Name</label>
            <input type="text" name="fname" id="fname" />
          </div>
          <div className="form-group">
            <label label="lname">Last Name</label>
            <input type="text" name="lname" id="lname" />
          </div>
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
          Already A Member? <NavLink to="/login">Login</NavLink>{" "}
        </p>
      </article>
    </section>
  );
};

export default Signup;
