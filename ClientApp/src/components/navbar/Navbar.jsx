import { Link } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const [logout, setLogout] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setLogout(true);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo btn btn-warning">
          <Link to={"/"}>Booking Website</Link>
        </span>
        <div className="navItems">
          {userId ? (
            <div>
              <button className="navButton btn btn-success">
                <Link to={"/"}>User:{userName || ""}</Link>
              </button>
              <button className="navButton btn btn-success">
                <Link to={"/transactions"}>Transaction</Link>
              </button>
              <button
                onClick={handleLogout}
                className="navButton btn btn-danger"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button className="navButton btn btn-success">
                <Link to={"/register"}>Register</Link>
              </button>
              <button className="navButton btn btn-success">
                <Link to={"/login"}>Login</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
