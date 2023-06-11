import React, {useContext} from "react";

import {Link, useNavigate} from "react-router-dom";

import {faCheckCircle, faUser, faInfoCircle, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {backend_paths} from "../../constants/paths";
import axios from "axios";

export default function AdminProcessInlineView({process, refresh}){
    const navigate=useNavigate();
    function handleDelete(){
        if(window.confirm("Are you sure you want to delete this process?")){
            axios.delete(`${backend_paths.GET_PROCESS_BY_ID}/${process.userid}`)
            .then(res => refresh())
            .catch(err => console.log(err));
        }
    }
    
  
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
            </div>
            <div className="card-body d-flex flex-row justify-content-between">
                <span className="d-flex gap-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faUser} />
                    <p className="card-text">{process.creator.type=="personal" ? process.creator.firstname + " " + process.creator.lastname : process.creator.name}</p>
                </span>
                <div className="d-flex flex-row gap-2">
                    <FontAwesomeIcon icon={faInfoCircle} color={"blue"} cursor="pointer" onClick={()=>navigate(`/admin/process/${process.processid}`)} />
                    <FontAwesomeIcon icon={faPen} color={"green"} cursor="pointer" onClick={()=>navigate(`/admin/process/${process.processid}?edit=true`)}/>
                    <FontAwesomeIcon icon={faTrash} color={"red"} cursor="pointer" onClick={handleDelete}/>
                </div>
          </div>
        </div>
    )
}