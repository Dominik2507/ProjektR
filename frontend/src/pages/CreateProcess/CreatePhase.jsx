import React, {useContext, useState} from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Textarea from "../../components/Form/Textarea";
import ParameterInput from "../../components/ParameterInput";
import Dropdown from "../../components/Dropdown";
import {nanoid} from "nanoid";
import {CreateProcessContext} from "../../context/CreateProcessContext";

export default function CreatePhase(){
    const [phaseName, setPhaseName] = useState("");
    const [phaseDescription, setPhaseDescription] = useState("");
    const [err, setErr] = useState(null);
    const [allParameters, setAllParameters] = useState([]);

    const {setAllPhases} = useContext(CreateProcessContext);


    const handleAddPhase = () => {
        if(phaseName === "") {
            setErr({
                name: "phaseName",
                message: "Phase name empty"
            });
            return;
        }
        //TODO: CREATE PHASE IN DB AND STORE PHASE ID
        //TODO: REPLACE nanoId() WITH ID SAVED IN DB
        let obj = {
            id:nanoid(),
            phaseName,
            phaseDescription,
            parameters: allParameters
        };


        setAllPhases(prevSetPhase => [...prevSetPhase, obj]);

        setPhaseName("");
        setPhaseDescription("");
    }


    return (
        <React.Fragment>
            <Input
                type="text"
                placeholder="Phase name"
                name="phaseName"
                value={phaseName}
                handleChange={(e) => setPhaseName(e.target.value)}
                error={err}
            />

            <Textarea
                name="phaseDescription"
                value={phaseDescription}
                placeholder="Phase description"
                handleChange={(e) => setPhaseDescription(e.target.value)}
                />
            <Dropdown name="Phase parameter">
                <ParameterInput setAllParameters={setAllParameters}/>
            </Dropdown>
            <Button placeholder="Add phase" handleClick={handleAddPhase} />
        </React.Fragment>
            )
}