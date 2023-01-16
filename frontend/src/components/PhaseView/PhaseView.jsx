import React from "react";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PhaseView(){
    return(
        <div className="card">
            <div className="card-header fw-bold fst-italic">
                Title
            </div>
            <div className="card-body">
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon icon={faCalendar} className="me-3"/>
                    <p className="card-text">16/01/2023 - 23/01/2023</p>
                </span>

            </div>
        </div>
    )
}