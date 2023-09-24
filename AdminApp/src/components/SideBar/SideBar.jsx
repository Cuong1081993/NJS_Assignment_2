import {
  faDashboard,
  faHome,
  faHotel,
  faMoneyBill,
  faRestroom,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const handleClick = (e) => {
    setActive(e.target.id);
  };
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    onLogout();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <nav
        className="nav flex-column nav-pills nav-fill shadow"
        id="sidebar-nav"
      >
        <Link className="text-bg-dark nav-link shadow rounded-0">
          Main Menu
        </Link>
        <Link
          className={
            active === "dashboard"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="dashboard"
          to={"/dashboard"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faDashboard} />
          Dashboard
        </Link>
        <Link
          className={
            active === "users"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="users"
          to={"/users"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faUser} />
          User
        </Link>
        <Link
          className={
            active === "hotels"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="hotels"
          to={"/hotels"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faHotel} />
          Hotels
        </Link>
        <Link
          className={
            active === "rooms"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="rooms"
          to={"/rooms"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faHome} />
          Rooms
        </Link>
        <Link
          className={
            active === "transaction"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="transaction"
          to={"/transactions"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faMoneyBill} />
          Transaction
        </Link>
        <Link className="text-bg-dark nav-link shadow rounded-0">NEW</Link>
        <Link
          className={
            active === "newHotels"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="newHotels"
          to={"/newHotel"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faHotel} />
          Add New Hotel
        </Link>
        <Link
          className={
            active === "newRooms"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="newRooms"
          to={"/newRoom"}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faRestroom} />
          Add New Room
        </Link>
        <button
          className={
            active === "logout"
              ? "text-bg-info shadow nav-link rounded-5"
              : "nav-link  rounded-0"
          }
          id="logout"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOut} />
          Logout
        </button>
      </nav>
    </div>
  );
};
export default SideBar;
