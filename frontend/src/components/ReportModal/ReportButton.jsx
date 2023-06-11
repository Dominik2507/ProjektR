import React, {useState} from "react";

import "./ReportStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

export default function ReportButton({handleOpen}){

    return(
        <button className="iconReport" onClick={handleOpen}>
            <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
        </button>
    )
}

