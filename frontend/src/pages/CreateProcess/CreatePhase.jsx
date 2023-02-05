import React, {useContext, useState} from "react";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Textarea from "../../components/Form/Textarea";
import ParameterInput from "../../components/ParameterInput/ParameterInput";
import Dropdown from "../../components/Dropdown/Dropdown";
import {nanoid} from "nanoid";
import {CreateProcessContext} from "../../context/CreateProcessContext";
import DateInput from "../../components/Form/DateInput";

export default function CreatePhase({process, setProcess, setShowDropDown, phase=null, setEdit=null}){
    const [phaseName, setPhaseName] = useState(phase?.name || "");
    const [phaseDescription, setPhaseDescription] = useState(phase?.description || "");
    const [start, setStart] = useState(phase?.start_datetime || "")
    const [end, setEnd] = useState(phase?.end_datetime || "")
    const [err, setErr] = useState(null);
    const [allParameters, setAllParameters] = useState(phase?.params || []);

    const {setAllPhases} = useContext(CreateProcessContext);


    const calcId= function(){
        let maxId=0;
        for(let phase of process.phases){
            maxId= maxId > phase.phaseid ? maxId : phase.phaseid; 
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
                "phaseid": phase.id,
                "name": phaseName,
                "description": phaseDescription,
                "params": allParameters,
                "start_datetime": start,
                "end_datetime": end,
                "components": phase.components

            }
            setProcess({...process, "phases": temp})
            setEdit(false);

        }else{
            let temp=process.phases
            temp.push(
                {
                    "phaseid": calcId(), 
                    "name":phaseName,
                    "description": phaseDescription,
                    "params": allParameters,
                    "start_datetime": start,
                    "end_datetime": end,
                    "components":[]
                }
            );
        }
        
        setShowDropDown(false)
        //TODO: REPLACE nanoId() WITH ID SAVED IN DB
        let obj = {
            phaseid:nanoid(),
            name: phaseName,
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
            {
               
               /*  <div className="m-3">
                    <Dropdown name="Phase parameter" viewMode={true}>
                        <ParameterInput setAllParameters={setAllParameters}/>
                    </Dropdown>
                </div> */
            }
            
            <div className="d-flex w-100 flex-column align-items-center">
                <Button placeholder={phase ? "Save changes" : "Add phase"} handleClick={handleAddPhase} />
                <Button placeholder={"Cancel"} handleClick={()=>{phase ? setEdit(false) : setShowDropDown(false)}}/>
            </div>
        </React.Fragment>
            )
}