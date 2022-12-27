import React, {useState} from "react";

import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({children,name, active=false}){
    const [dropdownActive, setDropdownActive] = useState(active);

    const handleClick = () =>  setDropdownActive(prevDropdownActive => !prevDropdownActive);

    return(
        <div className="dropdown-container card my-2 py-0 w-100">
            <div className="dropdown-title card-header">
                {name}
                <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} className={dropdownActive ? "dropdown-icon-active" : "dropdown-icon"}/>
            </div>
            <div className={dropdownActive ? "dropdown-content-active" : "dropdown-content"}>
                {children}
            </div>
        </div>
    )
}