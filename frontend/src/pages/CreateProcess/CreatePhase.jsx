import React, {useState} from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Textarea from "../../components/Form/Textarea";
import ParameterInput from "../../components/ParameterInput";
import Dropdown from "../../components/Dropdown";
import {nanoid} from "nanoid";

export default function CreatePhase({processId,setPhases,parameterInfo,setParameterInfo}){
    const [phaseName, setPhaseName] = useState("");
    const [phaseDescription, setPhaseDescription] = useState("");
    const [err, setErr] = useState(null);
    const [allParameters, setAllParameters] = useState([]);

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
            params: allParameters
        };

        console.table(obj.params);
        console.log(obj);


        setPhases(prevSetPhase => [...prevSetPhase, obj]);



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
                <ParameterInput parameterInfo = {parameterInfo} setParameterInfo = {setParameterInfo} setAllParameters={setAllParameters}/>
            </Dropdown>
            <Button placeholder="Add phase" handleClick={handleAddPhase} />
        </React.Fragment>
            )
}