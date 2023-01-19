import React, {useContext, useState} from "react";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import {backend_paths, routes} from "../../constants/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ViewPhasesToolbar from "../../components/ViewToolbar/ViewPhasesToolbar";

import {CreateProcessContext} from "../../context/CreateProcessContext";
import {AuthContext} from "../../context/AuthContext"

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { faSave, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function ViewOneProcess(){
    const [process, setProcess]=useState({})
    const [hash, setHash]=useState("6b4ca2c4025a4d8c8aca4c4c1766eee63a1ccaf3a6e5ed5a923c9a8bcff3edd5")
    const {currentUser}=useContext(AuthContext)
    let params=useParams();
    const baseUrl="https://preview.cardanoscan.io/transaction/"
    useEffect(() => {
        const getAllProcesses = async () => {
            let data = (await axios.get(`${backend_paths.ONE_PROCESS}/${params.id}`)).data;
            console.log(data)
            setProcess(data);
        };

        getAllProcesses();
    }, []);
  

    function verify(){
        document.getElementById("cardanoLink").click();
    }
   
    return (
        <React.Fragment>
            <a hidden id="cardanoLink" href={baseUrl+hash} target="_blank"></a>
            <Sidebar>
                <div className="processSidebar">
                    <h4 className="m-3">{process?.name} <FontAwesomeIcon icon={faCircleCheck} onClick={verify}/> </h4>
                    <ViewPhasesToolbar process={process} setProcess={setProcess} viewMode={true}/>
                </div>
            </Sidebar>

        </React.Fragment>
    );
}