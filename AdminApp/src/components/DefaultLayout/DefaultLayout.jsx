import { Outlet } from "react-router-dom";

import Content from "../Content/Content";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
import "./DefaultLayout.css";

const DefaultLayout = ({ isAuth, onLogout }) => {
  return (
    <div>
      <Header onLogout={onLogout} />
      <SideBar onLogout={onLogout} />
      <div className="wrapper border-start border-info">
        <div className="body">
          <Content isAuth={isAuth} />
          {/* <Outlet /> */}
        </div>
      </div>
    </div>
  );
};
export default DefaultLayout;
