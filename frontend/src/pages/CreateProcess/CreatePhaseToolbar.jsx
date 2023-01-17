import React from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";

export default function CreatePhaseToolbar({process, setProcess, setShowDropDown}){


    return(
        <React.Fragment>
            <Dropdown name="Phase (not saved)" active={true} viewMode={true}>
                <CreatePhase process={process} setProcess={setProcess} setShowDropDown={setShowDropDown}/>
            </Dropdown>

        </React.Fragment>
    )
}