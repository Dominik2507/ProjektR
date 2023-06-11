import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "react";
import { useNavigate } from "react-router-dom";
import "./AdminStyle.css"
export default function AdminPageLink({icon, navigateTo,  description}){
    const navigate=useNavigate();

    function handleClick(){
        navigate(`/admin/${navigateTo}`)
    }

    return(
        <div className="linkCard" onClick={handleClick}>
            <FontAwesomeIcon icon={icon} size={"10x"}/>
            <div className="linkDescription">{description}</div>
        </div>
    )
}
