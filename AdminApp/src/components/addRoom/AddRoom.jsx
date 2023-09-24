import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "http://localhost:5000/api/admin/addRoom",
        method: "POST",
        data: newRoom,
      });
      navigate("/rooms");
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  const handleChange = (e) => {
    setNewRoom((prevState) => {
      if (e.target.name === "roomNumbers") {
        return {
          ...prevState,
          [e.target.name]: e.target.value.split(","),
        };
      }
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="container">
      <h3 className="shadow rounded-3 p-3 my-3 text-success">Add New Room</h3>
      <form
        className="mx-auto my-3 shadow rounded-3 p-5"
        onSubmit={submitHandler}
      >
        <div className="row my-2">
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Title"
              name="title"
              required
              onChange={handleChange}
            />
            <label htmlFor="title" className="form-label ms-2">
              Title
            </label>
          </div>
          <div className="col form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Description"
              name="desc"
              required
              onChange={handleChange}
            />
            <label htmlFor="desc" className="form-label ms-2">
              Description
            </label>
          </div>
          <div className="col form-floating">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Max People"
              name="maxPeople"
              required
              onChange={handleChange}
            />
            <label htmlFor="maxPeople" className="form-label ms-2">
              Max People
            </label>
          </div>
          <div className="col form-floating">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Price"
              name="price"
              required
              onChange={handleChange}
            />
            <label htmlFor="price" className="form-label ms-2">
              Price
            </label>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-3 form-floating  me-5 ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Rooms Number"
              name="roomNumbers"
              required
              onChange={handleChange}
            />
            <label htmlFor="roomNumbers" className="form-label ms-2">
              Rooms Number
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-outline-success  rounded-5 mx-auto text-center nt-4 fw-semibold"
          onClick={submitHandler}
        >
          Add Room
        </button>
      </form>
    </div>
  );
};
export default AddRoom;
