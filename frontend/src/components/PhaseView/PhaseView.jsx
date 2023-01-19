import React from "react";

import {faCalendar, faPencil, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dayjs from "dayjs";
import ParameterList from "./ParameterList";
import ComponentList from "./ComponentList";
import {nanoid} from "nanoid";
import Button from "../Form/Button";
import {backend_paths} from "../../constants/paths";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function PhaseView({ phase,params,handleComponent,setPhaseIndex,addParamVisible,inputParamVisible,openPhaseModal,index, length=0, nextPhase, processid, canView,handleShowParameters}){
    const [refresh, handleRefresh]=useState(false)
    console.log("NEXT",nextPhase, nextPhase?.start_datetime!=null)

    function moveToNextPhase(){
        if(!window.confirm("If you end this phase you will not be able to go back! Do you want to continue?")) return;


        let postData={
            processid: processid,
            activePhase: phase.phaseid,
            nextPhase: nextPhase.phaseid
        }


        axios.post(`${backend_paths.START_NEXT_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                handleRefresh(!refresh);
            })
            .catch(err => console.log(err))
    }

    function endLastPhase(){
        if(!window.confirm("This action will end both this phase and the whole process! Do you want to continue?")) return;

        let postData={
            processid: processid,
            activePhase: phase.phaseid,
            nextPhase: 0
        }
        axios.post(`${backend_paths.END_LAST_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                handleRefresh(!refresh);
            })
            .catch(err => console.log(err))


    }

    function startThisPhase(){
        if(!window.confirm("If you start this phase you will not be able to go back! Do you want to continue?")) return;

        let postData={
            processid: processid,
            activePhase: 0,
            nextPhase: phase.phaseid
        }

        axios.post(`${backend_paths.START_FIRST_PHASE}`, postData)
            .then(res => res.data)
            .then(data => {
                handleRefresh(!refresh);
            })
            .catch(err => console.log(err))


    }

    return(
        <div className={phase.active === "t" ? "card border border-success" : "card"}>
            <div className="card-header fw-bold fst-italic">
                    {phase.name}
                {canView &&
                <FontAwesomeIcon icon={faDatabase} onClick={handleShowParameters} style={{cursor:"pointer"}} />
                }
            </div>
            <div className="card-body">
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon icon={faCalendar} className="me-3"/>
                    <p className="card-text">{dayjs(phase.start_datetime).format("DD/MM/YYYY")} - {dayjs(phase.end_datetime).format("DD/MM/YYYY")}</p>
                </span>
                <span className="d-flex flex-row align-items-center justify-content-start">
                    <FontAwesomeIcon icon={faPencil} className="me-3"/>
                    <p className="card-text">{phase.description}</p>
                </span>
                <div className="d-flex flex-column align-items-start gap-3 mt-1">
                {params &&
                    <div>
                        <ParameterList values={params} inputParamVisible={inputParamVisible} openPhaseModal={openPhaseModal}/>
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
                        {phase.components.map((component) => <ComponentList key={nanoid()} component={component} componentBtnName={componentBtnName} handleClick={() => handleComponent(component,index)}/>)}
                    </div>
                }
            </div>
            {length>0 && phase.active==="t" && index < (length-1)  && <Button placeholder={"Next phase"} handleClick={moveToNextPhase} />}
            {length>0 && nextPhase?.start_datetime==null && phase.active==="f" && index == 0 && <Button placeholder={"Start phase"} handleClick={startThisPhase} />}
            {length>0 && phase.active==="t" && index == (length-1)  && <Button placeholder={"End phase"} handleClick={endLastPhase} />}
        </div>
    )
}