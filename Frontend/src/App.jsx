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
import ListVendor from "./pages/vendor/ListVendort";
import Protected from "./components/Protected";
import VendorShopForm from "./pages/vendor/UpdateProfile";
import ShowProduct from "./pages/vendor/ShowProduct";
import VendorDetails from "./pages/vendor/VendorDetails"
import FeaturesPage from "./pages/FeaturesPage"

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
        <Route path="/features" element={<FeaturesPage/>}></Route>
        <Route path="/vendor/:id" element={<VendorDetails/>}></Route>
        <Route path="/viewProduct" element={<ShowProduct/>}></Route>
        <Route path="/registerBusiness" element={<VendorShopForm />}></Route>
        <Route path="/userDash" element={<UserDashboard />}></Route>
        <Route path="/create/product" element={<Product />}></Route>
        <Route path="/explore/vendor" element={<ListVendor />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
