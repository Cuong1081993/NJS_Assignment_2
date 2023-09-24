import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook, faBookmark } from "@fortawesome/free-regular-svg-icons";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="header d-flex justify-content-between align-items-center">
      <h3 className="ms-3 text-light">
        <Link to={"/"}>
          <FontAwesomeIcon icon={faAddressBook} />
          Admin Page
        </Link>
      </h3>
      <div className="info">
        {userId ? (
          <div>
            <button className="btn btn-primary rounded-5 me-3 shadow">
              <Link to={"/"}>User: {userName || ""}</Link>
            </button>
            <button className="btn btn-primary rounded-5 me-3 shadow">
              <Link to={"/transaction"}>Transaction</Link>
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger rounded-5 me-3"
            >
              Log out
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-dark me-3">
              <Link to={"/register"}>
                <FontAwesomeIcon icon={faBookmark} /> Register
              </Link>
            </button>
            <button className="btn btn-dark me-3">
              <Link to={"/login"}>
                <FontAwesomeIcon icon={faSignIn} /> Login
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
