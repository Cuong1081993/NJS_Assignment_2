import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Booking from "./pages/booking/Booking";
import Transaction from "./pages/transaction/Transaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/hotels/:id/booking" element={<Booking />} />
        <Route path="/transactions" element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
