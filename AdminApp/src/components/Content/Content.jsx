import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import User from "../User/User";
import Hotel from "../Hotel/Hotel";
import AddHotel from "../addHotel/AddHotel";
import AddRoom from "../addRoom/AddRoom";
import Room from "../room/Room";
import EditHotel from "../editHotel/EditHotel";
import EditRoom from "../editRoom/EditRoom";
import Transaction from "../transaction/Transaction";

const Content = ({ isAuth }) => {
  const RequieAuth = ({ children }) => {
    const location = useLocation();
    return isAuth === true ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  };
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          name="Dashboard"
          element={
            <RequieAuth>
              <Dashboard />
            </RequieAuth>
          }
        />
        <Route
          path="/users"
          name="user"
          element={
            <RequieAuth>
              <User />
            </RequieAuth>
          }
        />
        <Route
          path="/hotels"
          name="hotel"
          element={
            <RequieAuth>
              <Hotel />
            </RequieAuth>
          }
        />
        <Route
          path="/rooms"
          name="room"
          element={
            <RequieAuth>
              <Room />
            </RequieAuth>
          }
        />
        <Route
          path="/newHotel"
          name="newHotel"
          element={
            <RequieAuth>
              <AddHotel />
            </RequieAuth>
          }
        />
        <Route
          path="/newRoom"
          name="newRoom"
          element={
            <RequieAuth>
              <AddRoom />
            </RequieAuth>
          }
        />
        <Route
          path="/editHotel/:hotelId"
          name="Edit Hotel"
          element={
            <RequieAuth>
              <EditHotel />
            </RequieAuth>
          }
        />
        <Route
          path="/editRoom/:roomId"
          name="Edit Room"
          element={
            <RequieAuth>
              <EditRoom />
            </RequieAuth>
          }
        />
        <Route
          path="/transaction"
          name="Transaction"
          element={
            <RequieAuth>
              <Transaction />
            </RequieAuth>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};
export default Content;
