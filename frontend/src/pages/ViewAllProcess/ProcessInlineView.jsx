import React from "react";

import {Link} from "react-router-dom";

import {faClock, faPencil} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ProcessInlineView({process}){

    let time = `${process.start_datetime } - ${process.end_datetime ? process.end_datetime : "Ongoing"}`;

    return (
        <div className="card my-3 w-100 mw-100 mx-auto">
            <div className="card-header d-flex flex-row justify-content-between align-items-center ">
                <p className="mb-0 fw-bold">{process.name}</p>
                <FontAwesomeIcon icon={faStar} style={{
                    cursor: "pointer"
                }} />
            </div>
            <div className="card-body">
                <span className="d-flex gap-3 mb-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faClock} />
                    <p className="card-text">{time}</p>
                </span>
                <span className="d-flex gap-3 align-items-center  card-text">
                    <FontAwesomeIcon icon={faPencil} />
                    <p className="card-text">{process.description}</p>
                </span>
                <div className="d-flex">
                    <Link to={`process/${process.id}`} className="btn btn-outline-info mt-3 " >See more detailed</Link>
                </div>
          </div>
        </div>
    )
}