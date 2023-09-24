import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initialLoginData = {
    email: "",
    password: "",
  };
  const [errorMessage, setErrorMessage] = useState("");
  const [loginData, setLoginData] = useState(initialLoginData);

  const handleChange = (e) => {
    setLoginData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleReset = () => {
    setLoginData(initialLoginData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/api/auth/login",
        data: loginData,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", response.data.userName);

      const remainingMiliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMiliseconds);
      localStorage.setItem("expirydate", expiryDate.toISOString());
      onLogin();
      navigate(state?.path || "/");
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex flex-column mt-3 align-items-center justify-content-center">
          {errorMessage ? (
            <h5 className="shadow rounded-3 p-3 my-3 text-danger w-50">
              {errorMessage}
            </h5>
          ) : (
            ""
          )}
          <div className="card w-25 shadow">
            <div className="card-body">
              <form method="POST" onSubmit={handleSubmit}>
                <h1 className="text-center">Login</h1>
                <div className="form-floating my-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={handleChange}
                    name="email"
                    required
                  />
                  <label htmlFor="email" className="form-label">
                    Email :
                  </label>
                </div>
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={handleChange}
                    name="password"
                    required
                  />
                  <label htmlFor="password" className="form-label">
                    Password :
                  </label>
                </div>
                <div className="mb-3 d-flex justify-content-around">
                  <button type="btn" className="btn btn-primary">
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
    </>
  );
};
export default Login;
