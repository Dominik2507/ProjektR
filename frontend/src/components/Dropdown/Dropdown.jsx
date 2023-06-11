import React, {useState} from "react";

import "./Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown({children,name, active=false, viewMode, handleDelete, handleEdit}){
    const [dropdownActive, setDropdownActive] = useState(active);

    const handleClick = () =>  setDropdownActive(prevDropdownActive => !prevDropdownActive);

    return(
        <div className="dropdown-container card my-2 py-0 w-100">
            <div className="dropdown-title card-header">
                <span>{name}</span>
                <div className="d-flex flex-row align-items-center">
                    {!viewMode && <FontAwesomeIcon className="p-1 dropdown-icon" onClick={()=> {setDropdownActive(true); handleEdit()}} icon={faEdit} />}
                    {!viewMode && <FontAwesomeIcon className="p-1 dropdown-icon" onClick={handleDelete} icon={faTrash} />}
                    <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} className={dropdownActive ? "dropdown-icon-active p-2" : "dropdown-icon p-1"}/>
                </div>
            </div>
            <div className={dropdownActive ? "dropdown-content-active" : "dropdown-content"}>
                {children}
            </div>
        </div>
    )
}