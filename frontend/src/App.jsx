import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllBooks from "./pages/AllBooks";
import Signup from "./pages/SignUp";
import Login from "./pages/LogIn";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite";
import SingleBook from "./pages/SingleBook";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBooks from "./pages/UpdateBooks";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "./store/auth";
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/get-book/:id" element={<SingleBook />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />}>
          {role !== "admin" ? (
            <Route index element={<Favourite />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}
          <Route path="/profile/OrderHistory" element={<OrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        {role === "admin" && (
          <Route path="/update-book/:id" element={<UpdateBooks />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
