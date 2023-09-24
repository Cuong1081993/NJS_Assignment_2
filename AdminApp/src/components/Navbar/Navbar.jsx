import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faHouse,
  faMoneyBill,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Navbar.css";
const NavBar = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/hotels`,
          method: "GET",
        });
        setHotels(response.data.hotels);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/rooms`,
          method: "GET",
        });
        setRooms(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/users`,
          method: "GET",
        });
        setUsers(response.data.users);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
      try {
        const response = await axios({
          url: `http://localhost:5000/api/admin/transactions`,
          method: "GET",
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchTransaction();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap flex-row justify-content-around">
        <Link className="link" to={"/hotels"}>
          <div className="card my-4 shadow">
            <div className="card-header bg-danger text-white">
              <h5 className="card-title">Hotel</h5>
            </div>
            <div className="card-body">
              <FontAwesomeIcon icon={faHotel} />
              <p className="card-text">Total Hotels : {hotels.length} </p>
            </div>
          </div>
        </Link>
        <Link className="link" to={"/rooms"}>
          <div className="card my-4 shadow">
            <div className="card-header bg-danger text-white">
              <h5 className="card-title">Room</h5>
            </div>
            <div className="card-body">
              <FontAwesomeIcon icon={faHouse} />
              <p className="card-text">Total Rooms : {rooms.length} </p>
            </div>
          </div>
        </Link>
        <Link className="link" to={"/users"}>
          <div className="card my-4 shadow">
            <div className="card-header bg-danger text-white">
              <h5 className="card-title">User</h5>
            </div>
            <div className="card-body">
              <FontAwesomeIcon icon={faUserCircle} />
              <p className="card-text">Total Users :{users.length} </p>
            </div>
          </div>
        </Link>
        <Link className="link" to={"/transactions"}>
          <div className="card my-4 shadow">
            <div className="card-header bg-danger text-white">
              <h5 className="card-title">Transaction</h5>
            </div>
            <div className="card-body">
              <FontAwesomeIcon icon={faMoneyBill} />
              <p className="card-text">
                Total Transaction :{transactions.length}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default NavBar;
