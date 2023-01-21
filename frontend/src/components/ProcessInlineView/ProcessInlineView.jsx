import React, {useContext} from "react";

import {Link} from "react-router-dom";

import {faCheckCircle, faClock, faPencil, faStar as faStarFull, faUser} from "@fortawesome/free-solid-svg-icons";
import {faStar} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../../context/AuthContext";

export default function ProcessInlineView({process,handleToogleFav,isFavourite}){
    const { currentUser } = useContext(AuthContext);
    console.log(process);
    const time = `${process.start_datetime?.slice(0,10) } - ${process.end_datetime ? process.end_datetime.slice(0,10) : "Ongoing"}`;

    return (
        <div className="card my-3 w-100 mw-100 mx-auto">
            <div className="card-header d-flex flex-row justify-content-between align-items-center ">
                <p className="mb-0 fw-bold">{process.name}
                {process.hash &&
                    <a href={`https://preview.cardanoscan.io/transaction/${process.hash}`} >
                        <FontAwesomeIcon icon={faCheckCircle} style={{cursor:"pointer", marginLeft: "5px"}} />
                    </a>
                }
                </p>
                {currentUser &&
                <FontAwesomeIcon
                    onClick={() => handleToogleFav(process.processid)}
                    icon={isFavourite ? faStarFull : faStar}//faStar}
                    style={{
                        cursor: "pointer"
                }} />}
            </div>
            <div className="card-body">
                  <span className="d-flex gap-3 mb-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faUser} />
                    <p className="card-text">{process.creator}</p>
                </span>
                <span className="d-flex gap-3 mb-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faClock} />
                    <p className="card-text">{time}</p>
                </span>
                <span className="d-flex gap-3 align-items-center  card-text text-start">
                    <FontAwesomeIcon icon={faPencil} />
                    <p className="card-text">{process.description}</p>
                </span>
                <div className="d-flex">
                    <Link to={`/processAll/process/${process.processid}`} className="btn btn-outline-info mt-3 " >See more detailed</Link>
                </div>
          </div>
        </div>
    )
}