import React, {useContext, useState} from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Textarea from "../../components/Form/Textarea";
import ParameterInput from "../../components/ParameterInput";
import Dropdown from "../../components/Dropdown";
import {nanoid} from "nanoid";
import {CreateProcessContext} from "../../context/CreateProcessContext";

export default function CreatePhase({process, setProcess, setShowDropDown, phase=null, setEdit=null}){
    const [phaseName, setPhaseName] = useState(phase?.name || "");
    const [phaseDescription, setPhaseDescription] = useState(phase?.description || "");
    const [err, setErr] = useState(null);
    const [allParameters, setAllParameters] = useState(phase?.params || []);

    const {setAllPhases} = useContext(CreateProcessContext);


    const calcId= function(){
        let maxId=0;
        for(let phase of process.phases){
            maxId= maxId > phase.id ? maxId : phase.id; 
        }
        return maxId+1;
    }

    const handleAddPhase = () => {
        if(phaseName === "") {
            setErr({
                name: "phaseName",
                message: "Phase name empty"
            });
            return;
        }
        //TODO: CREATE PHASE IN DB AND STORE PHASE ID
        if(phase){
            let temp=process.phases
            let index=temp.indexOf(phase)
            temp[index]={
                "id": phase.id,
                "name": phaseName,
                "description": phaseDescription,
                "params": allParameters,
                "components": phase.components

            }
            setProcess({...process, "phases": temp})
            setEdit(false);

        }else{
            let temp=process.phases
            temp.push(
                {
                    "id": calcId(), 
                    "name":phaseName,
                    "description": phaseDescription,
                    "params": allParameters,
                    "components":[]
                }
            );
        }
        
        setShowDropDown(false)
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
            <Button placeholder={phase ? "Save changes" : "Add phase"} handleClick={handleAddPhase} />
            <Button placeholder={"Cancel"} handleClick={()=>{phase ? setEdit(false) : setShowDropDown(false)}}/>
        </React.Fragment>
            )
}