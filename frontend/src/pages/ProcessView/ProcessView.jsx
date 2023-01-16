import React from "react";

import Carousel from "../../components/Carousel/Carousel"

import PhaseView from "../../components/PhaseView/PhaseView";
import {useEffect, useState} from "react";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import InputParamsToolbar from "../../components/InputParamsToolbar/InputParamsToolbar";
import ComponentInfoToolbar from "../../components/ComponentInfoToolbar/ComponentInfoToolbar";

const ProcessView = () => {
    const [process, setProcess] = useState([]);
    const [selectedPhase, setSelectedPhase] = useState(-1);
    const [phaseParams, setPhaseParams] = useState([]);
    const [selectedComponent,setSelectedComponent] = useState(null);
    const [indexOfPhaseForComponent, setIndexOfPhaseForComponent] = useState(-1);

    console.log(process);


    useEffect(() => {
        const getProcess = async () => {
            let data = (await axios.get(`${backend_paths.GET_PROCESS_BY_ID}/3`)).data;
            setProcess(data);
        };

        getProcess();
    }, []);


    const getPhaseParamsById = (id) =>{
        if(phaseParams.length === 0) return null;
        for(let i = 0; i < phaseParams.length; i++){
            if(phaseParams[i][0].phaseid === id) return phaseParams[i];
        }

        return null;
    }



    return (

        <React.Fragment>
            <div>
                <h4 className="mx-auto mt-3 h2  text-secondary">{process.name}</h4>
                <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64, minHeight: 300 }}>
                    {process.phases && process.phases.length > 0 &&
                    <Carousel show={3} numOfPhases={process.phases.length}>

                    {process?.phases?.map((phase,index) =>(
                        <PhaseView
                            key={phase.phaseid}
                            phase={phase}
                            params={getPhaseParamsById(phase.phaseid)}
                            num={index + 1}
                            setIndexOfPhaseForComponent = {setIndexOfPhaseForComponent}
                            setSelectedComponent = {setSelectedComponent}
                            handleAddParam={() => {
                                setSelectedPhase(phase.phaseid);
                            }}
                        />
                            ))}

                    </Carousel>
                }
                </div>

            </div>
            {selectedPhase !== -1 &&
                <InputParamsToolbar phaseid={selectedPhase} processid={process.processid} setAllParameters={setPhaseParams} handleClose={() => setSelectedPhase(-1)}/>
            }
            {selectedComponent &&
                <ComponentInfoToolbar
                    component={selectedComponent}
                    setProcess={setProcess}
                    indexOfPhaseForComponent = {indexOfPhaseForComponent}
                    handleClose={() => setSelectedComponent(null)}
                />
            }
            </React.Fragment>
    )
}

export default ProcessView