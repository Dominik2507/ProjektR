import React, {useState} from "react";

import "./hashModalStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

export default function HashIconButton({handleOpen}){

    return(
        <button className="iconHash" onClick={handleOpen}>
            <FontAwesomeIcon icon={faCubes}/>
        </button>
    )
}

