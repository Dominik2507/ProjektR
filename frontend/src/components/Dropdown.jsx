import React, {useState} from "react";

import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({children,name}){
    const [dropdownActive, setDropdownActive] = useState(false);

    const handleClick = () =>  setDropdownActive(prevDropdownActive => !prevDropdownActive);

    return(
        <div className="dropdown-container">
            <div className="dropdown-title">
                {name}
                <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} className={dropdownActive ? "dropdown-icon-active" : "dropdown-icon"}/>
            </div>
            <div className={dropdownActive ? "dropdown-content-active" : "dropdown-content"}>
                {children}
            </div>
        </div>
    )
}