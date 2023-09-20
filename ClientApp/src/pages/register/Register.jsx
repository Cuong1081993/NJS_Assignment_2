import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { signUp } from "../../store/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
    fullName: "",
    phoneNumber: 0,
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(initialState);

  const handleChange = (e) => {
    setUser((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleReset = () => {
    setUser(initialState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "PUT",
        url: "http://localhost:5000/api/auth/signup",
        data: user,
      });
      dispatch(signUp(response.data));
      console.log("Register successfull");
      navigate("/login");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-6">
              {errorMessage ? (
                <h5 className="d-flex mb-3 justify-content-center btn btn-danger">
                  {errorMessage}
                </h5>
              ) : (
                ""
              )}
              <div className="card mx-4">
                <div className="card-body p-4">
                  <form method="POST" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p>Create Your Account</p>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        className="form-control"
                        value={user.email}
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        value={user.password}
                        placeholder="Enter password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Your name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="userName"
                        placeholder="Enter your name"
                        name="userName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Full Name"
                        name="fullName"
                        id="fullName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        id="phoneNumber"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3 mt-2 d-flex justify-content-between">
                      <button type="submit" className="btn btn-success">
                        Register
                      </button>
                      <button
                        type="btn"
                        className="btn btn-danger"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
