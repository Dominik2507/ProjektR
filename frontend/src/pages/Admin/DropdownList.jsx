import React, {useState} from "react";
import styled from 'styled-components'
import "./DropdownList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DropdownList({children,name, active=true, depth=0}){
    const [dropdownActive, setDropdownActive] = useState(active);

    const handleClick = () =>  setDropdownActive(prevDropdownActive => !prevDropdownActive);
    
    const HeaderText=styled.div`
        padding-left: 5px;
        display: inline-block;
        font-size: ${32-depth*4}px;
    `

    return(
        <div className={"ps-3"}> 
            <div>
                <div>
                    <FontAwesomeIcon onClick={handleClick} icon={faChevronDown} size={"xs"} className={dropdownActive ? "dropdownList-icon-active ps-1" : "dropdownList-icon pe-1"}/>
                    <HeaderText>{name}</HeaderText>
                </div>
            </div>
            <div className={dropdownActive ? "dropdownList-content-active ps-3 mb-2 border-start border-dark" : "dropdownList-content ps-3"}>
                {children}
            </div>
        </div>
    )
}

