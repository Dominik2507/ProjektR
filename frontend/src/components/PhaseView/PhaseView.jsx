import React, { useContext } from "react";

import {faCalendar, faDatabase, faA, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {AuthContext} from "../../context/AuthContext";
import dayjs from "dayjs";
import ParameterList from "./ParameterList";
import ComponentList from "./ComponentList";
import {nanoid} from "nanoid";
import Button from "../Form/Button";
import {backend_paths} from "../../constants/paths";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function PhaseView({ ownerid=0,componentBtnName, activePhaseId ,phase,params,handleComponent,setPhaseIndex,addParamVisible,inputParamVisible,openPhaseModal,index, length=0, nextPhase, processid, batchId, canView,handleShowParameters}){
    const { currentUser } = useContext(AuthContext);

    //console.log(currentUser, "owner", ownerid)
    function moveToNextPhase(){
        if(!window.confirm("If you end this phase you will not be able to go back! Do you want to continue?")) return;


        let postData={
            processid: processid,
            activePhase: phase.phaseid,
            nextPhase: nextPhase.phaseid,
            batchId: batchId
        }


        axios.post(`${backend_paths.START_NEXT_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                setTimeout(()=>window.location.reload(), 500);
            })
            .catch(err => console.log(err))
    }

    function endLastPhase(){
        if(!window.confirm("This action will end both this phase and the whole process! Do you want to continue?")) return;

        let postData={
            processid: processid,
            activePhase: phase.phaseid,
            nextPhase: 0,
            batchId: batchId
        }
        axios.post(`${backend_paths.END_LAST_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                setTimeout(()=>window.location.reload(), 500);
            })
            .catch(err => console.log(err))


    }

    function startThisPhase(){
        if(!window.confirm("If you start this phase you will not be able to go back! Do you want to continue?")) return;

        let postData={
            processid: processid,
            activePhase: 0,
            nextPhase: phase.phaseid,
            batchId: batchId
        }

        axios.post(`${backend_paths.START_FIRST_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                setTimeout(()=>window.location.reload(), 500);
            })
            .catch(err => console.log(err))

    
    }

    return(
        <div className={ phase.phaseid == activePhaseId ? "card border border-success" : "card"}>
            <div className="card-header fw-bold h5 fst-italic">
                    {phase.name}
                {canView &&
                <FontAwesomeIcon icon={faDatabase} textDecoration={"See data"} onClick={handleShowParameters} className="ms-2" style={{cursor:"pointer"}} />
                }
            </div>
            <div className="card-body">
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon icon={faCalendar} className="me-3"/>
                    <p className="card-text">{phase.start_datetime ? dayjs(phase.start_datetime).format("DD/MM/YYYY") : "TBD"} - {phase.end_datetime ? dayjs(phase.end_datetime).format("DD/MM/YYYY"): "TBD"}</p>
                </span>
                { phase.description &&
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon icon={faA} className="me-3"/>
                    <p className="card-text">{phase.description}</p>
                </span>
                }
                <div className="d-flex flex-column align-items-start mt-1">
                {params &&
                    <div>
                        <p className="d-flex align-self-start mt-2 mb-0 p-0">Parameters:</p>
                        <ParameterList values={params} inputParamVisible={inputParamVisible} openPhaseModal={openPhaseModal} active={phase.phaseid==activePhaseId}/>
                    </div>
                }
                {addParamVisible &&
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon
                        icon={faSquarePlus}
                        style={{cursor:"pointer"}}
                        title="Add new parameter to this phase."
                        onClick={setPhaseIndex}
                    /> 
                    <p className="card-text mx-3">Add a parameter</p>
                </span>
                }
                    
                </div>
                {phase.components &&
                    <div>
                        <p className="d-flex align-self-start mt-2 mb-0 p-0">Components:</p>
                        {phase.components.map((component) => <ComponentList key={nanoid()} active={(phase.phaseid==activePhaseId && currentUser?.userid == ownerid)|| window.location.href.includes("create")} component={component} componentBtnName={componentBtnName} handleClick={() => handleComponent(component,index)}/>)}
                    </div>
                }
            </div>
            {
                length > 0 && currentUser?.userid == ownerid &&
                <>
                    {phase.phaseid==activePhaseId && index < (length-1)  && <button className="btn btn-outline-info m-3" onClick={moveToNextPhase} >Next phase</button>}
                    {phase.phaseid > activePhaseId && index == 0 && <button className="btn btn-outline-info m-3" onClick={startThisPhase} >Start phase</button>}
                    {phase.phaseid==activePhaseId && index == (length-1)  && <button className="btn btn-outline-info m-3" onClick={endLastPhase} >End phase</button>}
                </>
            }
        </div>
    )
}