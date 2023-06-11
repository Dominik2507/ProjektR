import React, {useState} from "react";

import "./QRStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEdit, faTrash, faQrcode } from "@fortawesome/free-solid-svg-icons";

export default function QRButton({handleOpen}){


    return(
        <button className="iconQR" onClick={handleOpen}>
            <FontAwesomeIcon icon={faQrcode}></FontAwesomeIcon>
        </button>
    )
}

