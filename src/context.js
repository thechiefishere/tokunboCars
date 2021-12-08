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
  const [cartsTotal, setCartsTotal] = useState(0);
  const [modalContent, setModalContent] = useState({});
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(true);
        setModalContent({ type: 1, text: "Bye, hope to see you soon." });
        setLoggedIn(false);
        setCartItems([]);
        setUserDetails([]);
      }
    } catch (error) {
      console.log(error);
    }
    closeSidebar();
  };

  useEffect(() => {
    fetchData();
    verifyToken();

    //eslint-disable-next-line
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

    //eslint-disable-next-line
  }, [cartItems, loggedIn]);

  useEffect(() => {
    total();
    //eslint-disable-next-line
  }, [cartItems]);

  const removeFromCart = async (carId) => {
    if (!loggedIn) {
      const carsId = cartItems.filter((id) => {
        return id !== carId;
      });

      setCartItems([...carsId]);
      return;
    }
    const token = localStorage.getItem("tokunbo-token");
    try {
      const response = await fetch(
        "https://buy-tokunbo-cars.herokuapp.com/authenticate/user/cart",
        {
          method: "DELETE",
          body: JSON.stringify({
            car: carId,
          }),
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      const { status, userDetails } = data;
      if (status === "success") {
        setUserDetails(userDetails);
        const carsId = userDetails.carsInCart.map((car) => {
          return car._id.toString();
        });
        setCartItems([...carsId]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const total = () => {
    let allPrices = [];
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      for (let j = 0; j < cars.length; j++) {
        const car = cars[j];
        if (car._id.toString() === item) {
          allPrices.push(Number(car.price.split(",").join("")));
        }
      }
    }
    const total = allPrices.reduce((sum, curr) => {
      return (sum += curr);
    }, 0);

    setCartsTotal(total);
  };

  const placeOrder = async () => {
    const token = localStorage.getItem("tokunbo-token");
    setShowModal(true);
    setModalContent({ type: 1, text: "Complementing Order... please wait" });
    try {
      const response = await fetch(
        "https://buy-tokunbo-cars.herokuapp.com/authenticate/user/pending-cars",
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            pendingCars: [...cartItems],
          }),
        }
      );
      const data = await response.json();
      const { status, userDetails } = data;
      if (status === "success") {
        setShowModal(true);
        setModalContent({ type: 1, text: "Order Completed" });
        setUserDetails(userDetails);
        const carsId = userDetails.carsInCart.map((car) => {
          return car._id.toString();
        });
        setCartItems([...carsId]);
      }
    } catch (error) {
      console.log(error);
      setShowModal(true);
      setModalContent({
        type: 0,
        text: "Something went wrong, try again later...",
      });
    }
  };

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
        removeFromCart,
        cartItems,
        setCartItems,
        showOrderPage,
        setShowOrderPage,
        setAddingToCart,
        cartsTotal,
        modalContent,
        setModalContent,
        showModal,
        setShowModal,
        placeOrder,
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
