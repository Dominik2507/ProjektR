import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {loggedInItems, notLoggedInItems} from "../../constants/navbarItems";

import LinkItem from "./LinkItem";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../context/AuthContext";



export default function UserDropdown(){
    const {currentUser,logout} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogOut = () => {
        logout();
        navigate("/");
    }

    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faUser}/>
            </a>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                style={{
                    backgroundColor:"#45526e",
                }}
            >
                {currentUser === null &&
                    notLoggedInItems.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName}/>)
                }

                {currentUser !== null &&
                    loggedInItems.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName} handleClick={item.linkName === "Log out" ? handleLogOut : null}/>)
                }




            </ul>
        </li>
    );
}