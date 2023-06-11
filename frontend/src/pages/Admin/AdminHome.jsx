import { faHouseChimney, faList, faListAlt, faUser, faUserAlt, faUserAltSlash, faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AdminPageLink from "../../components/AdminComponents/AdminPageLink";
import "../../components/AdminComponents/AdminStyle.css"

export default function AdminHome(){
    return(
        <div className="w-100">
            <div className="adminGreeting">Welcome, admin!</div>
            <div className="w-100 d-flex flex-row justify-content-evenly align-items-center linkContainer">
                <AdminPageLink icon={faList} description="PROCESSES" navigateTo={"process"}/>
                <AdminPageLink icon={faUser} description="USERS" navigateTo={"users"}/>
                <AdminPageLink icon={faWarning} description="REPORTS" navigateTo={"reports"}/>
            </div>

        </div>
    )
}