import { AppProvider } from "./context";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CarDetails from "./components/CarDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderPage from "./components/OrderPage";

function App() {
  return (
    <AppProvider>
      <Router>
        <main>
          <Header />
          <OrderPage />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/car-details/:carId" element={<CarDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
}

export default App;
