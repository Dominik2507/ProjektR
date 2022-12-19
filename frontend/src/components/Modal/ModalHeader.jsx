import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

export default function ModalHeader({closeModal,title}){
    return (
        <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <div className="cursor-pointer" onClick={closeModal}>
                <FontAwesomeIcon icon={faClose}/>
            </div>
        </div>
    )
}