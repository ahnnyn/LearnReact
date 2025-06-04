import React, { useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { Outlet } from "react-router-dom";
import { getAccountAPI } from "./services/api.service";
import { AuthContext } from "./components/context/auth.context.jsx";
import { useContext } from "react";
import { Spin } from "antd";
const App = () => {
    const {setUser, isAppLoading, setIsAppLoading} = useContext(AuthContext);
  
  useEffect(() => {
    fetchUserInfo();
  }, []); // [] để cho useEffect chỉ chạy một lần khi component mount

  const fetchUserInfo = async () => {
    const res = await getAccountAPI();
    if (res.data) {
      setUser(res.data.user);
    } 
    setIsAppLoading(false);
  }

  return (
    <>
    {isAppLoading === true ? 
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
        <Spin/>
    </div>
      :
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    }

    </>
  );
};

export default App;
