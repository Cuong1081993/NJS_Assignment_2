import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, createContext, useState } from "react";
import Loading from "./components/Loading/Loading";
import Login from "./pages/login/Login";
import Register from "./pages/Register/Register";
import Page404 from "./pages/404/404";
import Page500 from "./pages/500/500";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import Transaction from "./components/transaction/Transaction";
import RequieAuth from "./RequieAuth";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect } from "react";
const AuthContext = createContext();

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const loginHandler = () => {
    setIsAuth(true);
  };
  const logoutHandler = () => {
    setIsAuth(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsAuth(userId.length > 0);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/login"
              exact
              name="Login Page"
              element={<Login onLogin={loginHandler} />}
            />
            <Route
              path="/register"
              exact
              name="Register Page"
              element={<Register />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />

            {/* <Route path="/" element={<DefaultLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route element={<RequieAuth />}>
                <Route path="/transactions" element={<Transaction />} />
              </Route>
            </Route> */}
            <Route
              path="*"
              name="Admin Home Page"
              element={
                <AuthContext.Provider value={isAuth}>
                  <DefaultLayout onLogout={loginHandler} isAuth={isAuth} />
                </AuthContext.Provider>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
