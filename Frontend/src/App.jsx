import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";

import Home from "./components/home";
import Error from "./components/Error";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import About from "./pages/About";
import VendorDashboard from "./pages/vendor/VendorDash";
import UserDashboard from "./pages/user/UserDash";
import Product from "./pages/vendor/Product";
import ListVendor from "./pages/user/ListVendort";
import Protected from "./components/Protected";
import VendorShopForm from "./pages/vendor/RegisterBusiness";
import ShowProduct from "./pages/vendor/ShowProduct";
import VendorDetails from "./pages/vendor/VendorDetails"
import FeaturesPage from "./pages/FeaturesPage"
import VendorLanding from "./pages/vendor/LandingPage"
import UserLanding from "./pages/user/userLanding"
import UserProtected from "./pages/user/UserProtected";
import UpdateDetails from "./pages/vendor/UpdateDetails";
import ChatPage from "./pages/ChatPage"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/vendor" element={<VendorLanding />} />
        <Route path="/user" element={<UserLanding />}></Route>
        <Route path="/vendor/update" element={<UpdateDetails />} />
        <Route path="/chat" element={<ChatPage/>}></Route>
        <Route
          path="/vendorDash"
          element={
            <Protected>
              <VendorDashboard />
            </Protected>
          }
        ></Route>
        <Route path="/features" element={<FeaturesPage />}></Route>
        <Route path="/vendor/:id" element={<VendorDetails />}></Route>
        <Route
          path="/viewProduct"
          element={
            <Protected>
              <ShowProduct />
            </Protected>
          }
        ></Route>
        <Route
          path="/registerBusiness"
          element={
            <Protected>
              <VendorShopForm />
            </Protected>
          }
        ></Route>
        <Route path="/userDash" element={<UserDashboard />}></Route>
        <Route
          path="/create/product"
          element={
            <Protected>
              <Product />
            </Protected>
          }
        ></Route>
        <Route
          path="/explore/vendor"
          element={
            <UserProtected>
              <ListVendor />
            </UserProtected>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
