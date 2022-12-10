import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {processItemsLoggedIn, processItemsNotLoggedIn} from "../../constants/navbarItems";

import LinkItem from "./LinkItem";


import {AuthContext} from "../../context/AuthContext";



export default function ProcessDropdown(){
    const {currentUser,logout} = useContext(AuthContext);


    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
                <span> Process </span>
            </a>
            <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
                style={{
                    backgroundColor:"#45526e",
                }}
            >
                {currentUser === null &&
                    processItemsNotLoggedIn.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName}/>)
                }

                {currentUser !== null &&
                    processItemsLoggedIn.map(item => <LinkItem key = {item.path} path={item.path} linkname={item.linkName}/>)
                }

            </ul>
        </li>
    );
}