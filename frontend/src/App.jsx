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
import CreateProcess from "./pages/CreateProcess/CreateProcess";
import CreateProcessProvider from "./context/CreateProcessContext";
import ViewAllProcess from "./pages/ViewProcess/ViewAllProcess";
import Profile from "./pages/Profile/Profile";
import ViewOneProcess from "./pages/ViewProcess/ViewOneProcess";
import ProcessView from "./pages/ProcessView/ProcessView";

export default function App(){
  return(
      <div className="App">
          <AuthProvider>
            <Router>
              <Navbar />
              <main className="">
              <Routes>
                  <Route path={routes.HOMEPAGE_URL} element={<Home/>} />
                  <Route path={routes.CREATE_PROCESS_URL} element={
                      <CreateProcessProvider>
                          <CreateProcess />
                      </CreateProcessProvider>} />
                  <Route path={routes.USER_LOGIN_URL} element={<Login />}/>
                  <Route path={routes.USER_REGISTRATION_URL} element={<Registration />} />
                    <Route path={routes.PROFILE_URL} element={<Profile />} />
                    <Route path={routes.PROCESS_BY_ID} element={<ViewOneProcess />} />
                      
                  <Route path={routes.PROCESS_ALL} element={<ViewAllProcess/>} />
                  <Route path={routes.NOT_FOUND} element={<PageNotFound />} />

                  <Route path={routes.PROCESS_VIEW} element={<ProcessView/>} />
                  
              </Routes>
              </main>
              <Footer />
            </Router>
          </AuthProvider>
      </div>
  )
}

