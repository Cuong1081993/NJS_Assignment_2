import { useEffect, useState } from "react";
import "./booking.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const Booking = () => {
  let { id } = useParams();
  const initialBookingData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    IDCard: "",
  };
  const userId = localStorage.getItem("userId");

  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [bookingData, setBookingData] = useState(initialBookingData);
  const [hotel, setHotel] = useState({});
  const [roomsBooked, setRoomsBooked] = useState([]);
  const [payment, setPayment] = useState("cash");
  const [totalBill, setTotalBill] = useState(0);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const handleChange = (e) => {
    setBookingData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const handleOnCheck = (e, roomPrice) => {
    const day =
      (Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) / 86400000 >
      0
        ? (Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) /
          86400000
        : ((Date.parse(date[0].endDate) - Date.parse(date[0].startDate)) /
            86400000) *
          -1;

    const index = roomsBooked.findIndex(
      (roomBked) => roomBked === e.target.value
    );
    if (e.target.checked) {
      setTotalBill(totalBill + roomPrice * day);
      if (index < 0) {
        setRoomsBooked([...roomsBooked, e.target.value]);
      } else if (!e.target.checked) {
        setTotalBill(totalBill + roomPrice * day);
        if (index >= 0) {
          setRoomsBooked(
            roomsBooked.filter((room) => room !== e.tartget.value)
          );
        }
      }
    }
  };

  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await axios({
          url: `http://localhost:5000/api/hotel/${id}`,
        });
        setHotel(response.data.hotel);
        setRooms(response.data.rooms);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    fetchHotelById();
  }, []);
  const handleSumbit = async (e) => {
    const data = {
      user: userId,
      hotel: hotel._id,
      room: roomsBooked,
      dateStart: date[0].startDate,
      dateEnd: date[0].endDate,
      price: totalBill,
      payment: payment,
      status: "Booked",
    };
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `http://localhost:5000/api/hotel/${hotel._id}/booking`,
        data: data,
      });
    } catch (error) {
      if (error) {
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <>
      <div>
        <Navbar />
        <Header type="list" />
        {hotel === undefined ? (
          <Loading />
        ) : (
          <div className="container mt-3 bg-light">
            <div className="row">
              <div className="col-8">
                <h1>{hotel.name}</h1>
                <p>{hotel.desc}</p>
              </div>
              <div
                className="col-4 bg-info p-2 d-flex flex-column align-items-center"
                style={{ height: "fit-content" }}
              >
                <div className="mb-3 mt-3">
                  <h2>
                    <b>$ {hotel.cheapestPrice}</b>/ night
                  </h2>
                </div>
                <div className="mb-3 mt-3">
                  <button className="btn btn-primary">
                    <Link to={"booking"}>Reserve or Book Now!</Link>
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 col-md-4 d-flex flex-column align-items-baseline">
                  <h3>
                    <b>Dates :</b>
                    {/* <span className="headerSearchText d-flex flex-column align-items-center ">
                    {`${format(date[0].startDate, "MM/dd/yyy")} to ${format(
                      date[0].endDate,
                      "MM/dd/yyyy"
                    )}`}
                  </span> */}
                  </h3>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="bg-light"
                    minDate={new Date()}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <div className="row d-flex justify-content-center ms-3">
                    <div className="card">
                      <div className="card-body">
                        <form method="POST">
                          <h1 className="text-center">Reverse Info</h1>
                          <p className="text-medium-emphasis text-center">
                            Create Your Account
                          </p>
                          <div className="mb-3 mt-3">
                            <label htmlFor="fullname" className="form-label">
                              Your Fullname
                            </label>
                            <input
                              value={bookingData.fullName}
                              type="text"
                              className="form-control"
                              id="fullname"
                              placeholder="Enter fullname"
                              name="fullName"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                              Your Email
                            </label>
                            <input
                              value={bookingData.email}
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Enter Email"
                              name="email"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                              Your Phone Numbers:
                            </label>
                            <input
                              value={bookingData.phoneNumber}
                              type="tel"
                              className="form-control"
                              id="phoneNumber"
                              placeholder="Enter your phone number"
                              name="phoneNumber"
                              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                              Your Identity Card Numbers:
                            </label>
                            <input
                              value={bookingData.IDCard}
                              type="number"
                              className="form-control"
                              id="IDcard"
                              placeholder="Enter your ID card number"
                              required
                              name="IDcard"
                              onChange={handleChange}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  {rooms.map((room) => {
                    return (
                      <div key={room._id} className="col-5">
                        <div className="col-8">
                          <div className="row d-flex justify-content-between">
                            <div className="col-8">
                              <h4>{room.title}</h4>
                              <p>{room.desc}</p>
                              <div className="d-flex flex-row justify-content-around">
                                {room.roomNumbers.map((roomN) => {
                                  return (
                                    <div key={roomN}>
                                      <input
                                        type="checkbox"
                                        id={roomN}
                                        name={roomN}
                                        value={roomN}
                                        onChange={(e) =>
                                          handleOnCheck(e, room.price)
                                        }
                                      />
                                      <label className="ms-1" htmlFor={roomN}>
                                        {roomN}
                                      </label>
                                    </div>
                                  );
                                })}
                              </div>
                              <p>Max people: {room.maxPeople}</p>
                              <h4>${room.price}</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="row">
                  <div className="col-4 d-flex flex-column align-items-start">
                    <h2>Total bill : {totalBill}</h2>
                    <label htmlFor="payment">Select payment method: </label>
                    <br />
                    <select
                      className="form-select form-select-lg"
                      name="payment"
                      id="payment"
                      onChange={(e) => setPayment(e.target.value)}
                    >
                      <option defaultValue="none" disabled hidden>
                        Select an option
                      </option>
                      <option value="cash">Cash</option>
                      <option value="card">Card</option>
                    </select>
                  </div>
                  <div className="col-8 d-flex justify-content-center align-items-end">
                    <button
                      type="btn"
                      onClick={handleSumbit}
                      className="btn btn-primary"
                    >
                      Reverse Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Booking;
