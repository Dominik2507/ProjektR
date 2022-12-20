import React from "react";
import CreatePhase from "./CreatePhase";
import CreateComponent from "./CreateComponent";
import Dropdown from "../../components/Dropdown";

export default function CreatePhaseToolbar(){


    return(
        <React.Fragment>
            <Dropdown name="Phase">
                <CreatePhase />
            </Dropdown>
            <Dropdown name="Component">
                <CreateComponent />
            </Dropdown>

        </React.Fragment>
    )
}