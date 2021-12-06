import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

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

  const verifyToken = async () => {
    const token = localStorage.getItem("tokunbo-token");
    if (token) {
      try {
        const response = await fetch(
          "https://buy-tokunbo-cars.herokuapp.com/authenticate/user",
          {
            headers: {
              authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const data = await response.json();
        const { status, userDetails } = data;
        if (status === "success") {
          setLoggedIn(true);
          setUserDetails(userDetails);
          setAddingToCart(true);
          const carsId = userDetails.carsInCart.map((car) => {
            return car._id.toString();
          });
          setCartItems([...carsId]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addToCart = (item) => {
    if (item) {
      setCartItems([...cartItems, item]);
      setAddingToCart(true);
    }
  };

  const logOut = async () => {
    const token = localStorage.getItem("tokunbo-token");
    try {
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
        localStorage.removeItem("tokunbo-token");
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
    closeSidebar();
  };

  useEffect(() => {
    fetchData();
    verifyToken();
  }, []);

  useEffect(() => {
    if (loggedIn && addingToCart) {
      const token = localStorage.getItem("tokunbo-token");
      async function fetchData() {
        try {
          const response = await fetch(
            "https://buy-tokunbo-cars.herokuapp.com/authenticate/user/cart",
            {
              method: "PATCH",
              body: JSON.stringify({
                carsInCart: cartItems,
              }),
              headers: {
                "Content-type": "application/json",
                authorization: "Bearer " + token,
              },
            }
          );
          const data = await response.json();
          const { status, userDetails } = data;
          if (status === "success") {
            setUserDetails(userDetails);
            setAddingToCart(false);
            setCartItems([]);
            const carsId = userDetails.carsInCart.map((car) => {
              return car._id.toString();
            });
            setCartItems([...carsId]);
          }
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    }
  }, [cartItems, loggedIn]);

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
        userDetails,
        setUserDetails,
        addToCart,
        cartItems,
        showOrderPage,
        setShowOrderPage,
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
