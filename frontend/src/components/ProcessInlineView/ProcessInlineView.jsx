import React, {useContext} from "react";

import {Link} from "react-router-dom";

import {faCheckCircle, faClock, faA, faStar as faStarFull, faUser, faCircleXmark, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
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
                <p className="mb-0 fw-bold d-flex align-items-center gap-1">
                    <span>{process.name}</span>
                {
                    process.hash && process?.verification == "verified" ?
                        <a href={`https://preview.cardanoscan.io/transaction/${process.hash}`} className="d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon={faCircleCheck}  title={"Check cardano data"} style={{cursor:"pointer", color:"blue"}} />
                        </a>
                        :
                        process?.verification == "reported" ?
                            <FontAwesomeIcon icon={faCircleXmark} style={{color:"red"}} />
                            :
                            <></>
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
                    <p className="card-text">{process?.creator?.name || (process?.creator?.firstname + " " + process?.creator?.lastname)}</p>
                </span>
                {/* {<span className="d-flex gap-3 mb-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faClock} />
                    <p className="card-text">{time}</p>
                </span>} */}
                {process?.description !== "" &&
                <span className="d-flex gap-3 align-items-center  card-text text-start">
                    <FontAwesomeIcon icon={faA} />
                    <p className="card-text">{process.description}</p>
                </span>
                }
                <div className="d-flex">
                    <Link to={`/processAll/process/${process.processid}`} className="btn btn-outline-info mt-3 " >See more detailed</Link>
                </div>
          </div>
        </div>
    )
}