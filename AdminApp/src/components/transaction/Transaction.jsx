import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { format } from "date-fns";
const Transaction = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  console.log("Transaction");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios({
          url: "http://localhost:5000/api/admin/transactions",
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
    <div>
      <div className="container">
        <div className="d-flex flex-row justify-align-content-between p-3 align-align-items-center">
          <h1>Transactions</h1>
        </div>
        <table className="table text-center shadow">
          <thead className="bg-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Hotel</th>
              <th scope="col">Room</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Payment method</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {!transactions.length ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                return (
                  transaction.hotel &&
                  transaction.user && (
                    <tr key={transaction._id}>
                      <th scope="row">{transaction._id}</th>
                      <td>{transaction.user.userName}</td>
                      <td>{transaction.hotel.name}</td>
                      <td>
                        {transaction.room.map((r, i) => (
                          <span key={i}>
                            {r}
                            {i < transaction.room.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                      <td>
                        {format(new Date(transaction.dateStart), "dd/MM/yyy") +
                          "-" +
                          format(new Date(transaction.dateEnd), "dd/MM/yyyy")}
                      </td>
                      <td>{transaction.price}</td>
                      <td>{transaction.payment}</td>
                      <td>
                        <span
                          className={
                            transaction.status !== "Booked"
                              ? "btn btn-outline-success"
                              : "btn btn-outline-danger"
                          }
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  )
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Transaction;
