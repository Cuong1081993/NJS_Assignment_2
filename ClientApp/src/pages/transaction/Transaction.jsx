import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { format } from "date-fns";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";

const Transaction = () => {
  const userId = localStorage.getItem("userId");
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/hotel/transaction",
          method: "POST",
          data: { user: userId },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        if (error) {
          setErrorMessage(error.message);
        }
      }
    };
    console.log(transactions);
    fetchTransaction();
  }, []);
  return (
    <div>
      <NavBar />
      <Header type="list" />
      <div className="container">
        <h1>Transaction List</h1>
        <table className="table text-center">
          <thead className="bg-primary">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Hotel</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                return (
                  <tr key={transaction._id}>
                    <th scope="row">$</th>
                    <td>{transaction.hotel.name}</td>
                    <td>{transaction.room}</td>
                    <td>
                      {format(new Date(transaction.dateStart), "dd/MM/yyyy") +
                        "-" +
                        format(new Date(transaction.dateEnd), "dd/MM/yyyy")}
                    </td>
                    <td>{transaction.price}</td>
                    <td>{transaction.payment}</td>
                    <td>
                      <span
                        className={
                          transaction.status !== "Booked"
                            ? "btn btn-succes"
                            : "btn btn-danger"
                        }
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Footer />
      <MailList />
    </div>
  );
};
export default Transaction;
