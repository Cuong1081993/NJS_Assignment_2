import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";

const User = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUser = async () => {
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
    };
    fetchAllUser();
  }, []);

  return (
    <div className="container">
      <div className="d-flex flex-row justify-content-between p-3 align-items-center">
        <h1>User List</h1>
        <Link
          className="btn btn-outline-success align-items-center rounded-5"
          to={"/"}
        >
          Add User
        </Link>
      </div>
      <table className="table text-center table-sm align-middle shadow">
        <thead className="bg-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User Name</th>
            <th scope="col">Full Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Email</th>
            <th scope="col">Admin</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {users.length === 0 ? (
            <tr>
              <td colSpan={6}>
                <Loading />
              </td>
            </tr>
          ) : (
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{user._id}</th>
                  <td>{user.userName}</td>
                  <td>{user.fullName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin.toString()}</td>
                  <td>
                    <button
                      className={
                        user.isAdmin
                          ? "btn disable btn secondary"
                          : "btn btn-danger"
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
export default User;
