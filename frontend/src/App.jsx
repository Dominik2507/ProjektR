import React from "react";
import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import {routes} from "./constants/paths";

import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Home from "./pages/Home/Home";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";

import "./App.css"
import AuthProvider from "./context/AuthContext";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

export default function App(){
  return(
      <div className="App">
          <AuthProvider>
            <Router>
              <Navbar />
              <main className="flex-grow-0 h-100">
              <Routes>
                  <Route path={routes.HOMEPAGE_URL} element={<Home/>} />
                  <Route path={routes.USER_LOGIN_URL} element={<Login />}/>
                  <Route path={routes.USER_REGISTRATION_URL} element={<Registration />} />
                  <Route path={routes.NOT_FOUND} element={<PageNotFound />} />
              </Routes>
              </main>
              <Footer />
            </Router>
          </AuthProvider>
      </div>
  )
}

