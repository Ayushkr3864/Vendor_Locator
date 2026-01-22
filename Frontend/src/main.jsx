import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route, BrowserRouter } from 'react-router'
import { AuthProvider } from './store/auth.jsx'

import { GoogleOAuthProvider } from "@react-oauth/google";

// const Router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route path="" element={<Home />}></Route>
//       <Route path="Home" element={<Home />}></Route>
//     </Route>
//   )
// );

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>,
);
