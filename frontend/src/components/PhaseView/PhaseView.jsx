import React from "react";

import {faCalendar, faPencil, faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dayjs from "dayjs";
import ParameterList from "./ParameterList";
import ComponentList from "./ComponentList";
import {nanoid} from "nanoid";

export default function PhaseView({ phase,params,num,handleAddParam,setSelectedComponent,setIndexOfPhaseForComponent }){


    const handleComponentToolbar = (component,index) => {
        setSelectedComponent(component);
        setIndexOfPhaseForComponent(index);
    }

    console.log(params);

    return(
        <div className={phase.active === "t" ? "card border border-success" : "card"}>
            <div className="card-header fw-bold fst-italic">
                {phase.name}
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
                        <ParameterList values={params} />
                    </div>
                }
                    <FontAwesomeIcon
                        icon={faSquarePlus}
                        style={{cursor:"pointer"}}
                        title="Add new parameter to this phase."
                        onClick={handleAddParam}
                    />
                </div>
                {phase.components &&
                    <div>
                        {phase.components.map((component,index) => <ComponentList key={nanoid()} component={component} handleClick={() => handleComponentToolbar(component,index)}/>)}
                    </div>
                }
            </div>
        </div>
    )
}