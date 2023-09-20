import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../../store/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inititalLoginData = {
    email: "",
    password: "",
    userName: "",
  };
  const [loginData, setLoginData] = useState(inititalLoginData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleReset = (e) => {
    setLoginData(inititalLoginData);
  };
  const hanleChange = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth/login",
        data: loginData,
      });
      dispatch(login(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);
      const remainingMiliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMiliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      navigate("/");
    } catch (err) {
      if (err) {
        setErrorMessage(err.message);
      }
    }
  };
  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="bg-light mt-3 d-flex align-items-center justify-content-center">
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
                    <h1 className="text-center">Login</h1>
                    <p className="text-medium-emphasis text-center">
                      Login to book your favorite hotel
                    </p>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="email" className="form-label">
                        Email :
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        id="email"
                        onChange={hanleChange}
                        value={loginData.email}
                      />
                    </div>
                    <div className="mb-3 mt-2 ">
                      <label htmlFor="password" className="form-label">
                        Password :
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        id="password"
                        onChange={hanleChange}
                        value={loginData.password}
                      />
                    </div>
                    <div className="mb-3 mt-2 d-flex justify-content-around">
                      <button type="submit" className="btn btn-success">
                        Login
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

export default Login;
