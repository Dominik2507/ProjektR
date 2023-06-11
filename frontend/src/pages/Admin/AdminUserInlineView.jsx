import React, {useContext} from "react";

import {Link, useNavigate} from "react-router-dom";

import {faInfoCircle, faPen, faTrash, faAt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {backend_paths} from "../../constants/paths";

export default function AdminUserInlineView({user, refresh}){
    const navigate=useNavigate();
    function handleDelete(){
        if(window.confirm("Are you sure you want to delete this user?")){
            axios.delete(`${backend_paths.GET_USER_BY_ID}/${user.userid}`)
            .then(res => refresh())
            .catch(err => console.log(err));
        }
    }
    console.log(user);
    if(user.type == "admin") return;

    return (
        <div className="card my-3 w-100 mw-100 mx-auto">
            <div className="card-header d-flex flex-row justify-content-between align-items-center ">
                <p className="mb-0 fw-bold">{user.type=="personal" ? user.firstname + " " + user.lastname : user.name}</p>
            </div>
            <div className="card-body d-flex flex-row justify-content-between">
                <span className="d-flex gap-3 align-items-center card-text">
                    <FontAwesomeIcon icon={faAt} />
                    <p className="card-text">{user.email}</p>
                </span>
                <div className="d-flex flex-row gap-2">
                    <FontAwesomeIcon icon={faInfoCircle} color={"blue"} cursor="pointer" onClick={()=>navigate(`/admin/user/${user.userid}`)} />
                    <FontAwesomeIcon icon={faPen} color={"green"} cursor="pointer" onClick={()=>navigate(`/admin/user/${user.userid}?edit=true`)}/>
                    <FontAwesomeIcon icon={faTrash} color={"red"} cursor="pointer" onClick={handleDelete}/>
                </div>
          </div>
        </div>
    )
}