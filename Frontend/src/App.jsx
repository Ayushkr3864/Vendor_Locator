import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import About from "./pages/About";
import VendorDashboard from "./pages/vendor/VendorDash";
import UserDashboard from "./pages/UserDash";
import Product from "./pages/vendor/Product";
import ListProduct from "./pages/vendor/ListProduct";
import Protected from "./components/Protected";
import VendorShopForm from "./pages/vendor/UpdateProfile";
import ShowProduct from "./pages/vendor/ShowProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/vendorDash"
          element={
              <VendorDashboard />

          }
        ></Route>
        <Route path="/viewProduct" element={<ShowProduct/>}></Route>
        <Route path="/registerBusiness" element={<VendorShopForm />}></Route>
        <Route path="/userDash" element={<UserDashboard />}></Route>
        <Route path="/create/product" element={<Product />}></Route>
        <Route path="/exolore/product" element={<ListProduct />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
