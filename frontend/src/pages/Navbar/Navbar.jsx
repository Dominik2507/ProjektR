import React, { useContext } from "react";

import LinkItem from "./LinkItem";
import UserDropdown from "./UserDropdown";
import {AuthContext} from "../../context/AuthContext";

import {adminNavbarItems, navbarItems} from "../../constants/navbarItems";
import ProcessDropdown from "./ProcessDropdown";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const {currentUser,logout} = useContext(AuthContext);
    const navigate=useNavigate();

    const handleLogOut = () => {
        logout();
        navigate("/");
    }

    if(currentUser?.type==="admin"){
        return (
            <nav
            className="navbar navbar-expand-lg navbar-dark position-relative"
            style={{
                backgroundColor: "#45526e"
            }}
        >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {adminNavbarItems.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName}/>)}
                        <LinkItem key = "/logout" path={"/logout"} linkname={"Log out"} handleClick={handleLogOut}/> 
                    </ul>
                </div>
            </div>
        </nav>
        );
    }

    return(
        <nav
            className="navbar navbar-expand-lg navbar-dark position-relative"
            style={{
                backgroundColor: "#45526e"
            }}
        >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                            {navbarItems.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName}/>)}
                            <ProcessDropdown />
                            <UserDropdown />
                            
                    </ul>
                </div>
            </div>
        </nav>
    )
}