import React from "react";

import {Link, useNavigate} from "react-router-dom";

import {faPencil} from "@fortawesome/free-solid-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {backend_paths} from "../../constants/paths";

export default function AdminReportInlineView({report, refresh}){


    function handleDelete(){
        if(window.confirm("Are you sure you want to delete this Report?")){
            axios.get(`${backend_paths.RESOLVE_REPORT}/${report.reportid}`)
            .then(res => res.data)
            .then(data => {
                console.log("result", data)
                refresh();
            })
            .catch(err => console.log(err));
        }
    }
    
    return (
        <div className="card my-3 w-100 mw-100 mx-auto">
            <div className="card-header d-flex flex-row justify-content-between align-items-center ">
                <p className="mb-0 fw-bold">
                    Process: <Link to={`/admin/process/${report.processid}`} >{report.processname}</Link>
                    &nbsp;,&nbsp;Owner: <Link to={`/admin/user/${report.owner.userid}`} >{report.owner.type == "personal" ? report.owner.firstname + " " + report.owner.lastname : report.owner.name}</Link>
                    &nbsp;,&nbsp;Reported by: <Link to={`/admin/user/${report.reportedby.userid}`} >{report.reportedby.type == "personal" ? report.reportedby.firstname + " " + report.reportedby.lastname : report.reportedby.name}</Link>
                </p>
            </div>
            <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex gap-3 align-items-top card-text justify-content-start ">
                    <FontAwesomeIcon className="py-2" icon={faPencil} />
                    <p className="card-text text-start">{report.description}</p>
                </div>
                <div className="d-flex flex-row justify-content-end mt-3">
                    <button className="btn btn-info w-25 text-white" onClick={()=>handleDelete()} > Resolve </button>
                </div>
                
          </div>
        </div>
    )
}