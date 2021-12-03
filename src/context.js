import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const openSidebar = () => {
    setSidebar(true);
  };

  const closeSidebar = () => {
    setSidebar(false);
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("https://buy-tokunbo-cars.herokuapp.com/cars");
    const data = await response.json();
    setCars(data.cars);
    setLoading(false);
  };

  const logOut = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://buy-tokunbo-cars.herokuapp.com/authenticate/logout",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    const { status } = data;
    if (status === "success") {
      setLoggedIn(false);
    }
    closeSidebar();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        sidebar,
        openSidebar,
        closeSidebar,
        cars,
        loading,
        loggedIn,
        setLoggedIn,
        logOut,
        loadingLogin,
        setLoadingLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
