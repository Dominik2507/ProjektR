import React, {useContext, useEffect, useState} from "react";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import CreateProcessModalBody from "./CreateProcessModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import Sidebar from "../../components/Sidebar/Sidebar"

import "./CreateProcess.css"
import {nanoid} from "nanoid";

import {CreateProcessContext} from "../../context/CreateProcessContext";
import {AuthContext} from "../../context/AuthContext"

import {modalInputs} from "../../constants/paramInputs";
import ViewPhasesToolbar from "../../components/ViewToolbar/ViewPhasesToolbar";
import Carousel from "../../components/Carousel/Carousel";
import PhaseView from "../../components/PhaseView/PhaseView";
import ComponentInfoToolbar from "../../components/ComponentInfoToolbar/ComponentInfoToolbar";
import InputParamsToolbar from "../../components/InputParamsToolbar/InputParamsToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/paths";
import dayjs from "dayjs";

export default function CreateProcess(){
    const navigate = useNavigate();

    const [dateError, setDateError] = useState(null);
    const [modalActive, setModalActive] = useState(
                                                    true //localStorage.getItem("info")==null
                                                );
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState(modalInputs);
    const [process, setProcess]=useState(localStorage.getItem("process") ? JSON.parse(localStorage.getItem("process")) : {"phases": []})
    const [component, setComponent] = useState(null);
    const [phaseIndex,setPhaseIndex] = useState(-1);
    const [carouselLength, setCarouselLength] = useState(process?.phases ? process.phases.length : 0);
    const {processInfo, setProcessInfo, createProcess} = useContext(CreateProcessContext);
    const {currentUser} = useContext(AuthContext);

    useEffect(() =>  {
        setCarouselLength(process?.phases ? process.phases.length : 0);
    },[process?.phases?.length])

    useEffect(() =>  {
        if(localStorage.getItem("info")==null) localStorage.setItem("info", JSON.stringify(processInfo))
       localStorage.setItem("process", JSON.stringify(process))
    },[process, process?.phases, process?.phases?.map((value, index) => value.components), process?.phases?.map((value, index) => value.params), process?.phases?.map((value, index) => value.components).map(value => value.params)])

    
    const handleSaveToDB = () => {
       let saveObj={...processInfo, ...process};
       localStorage.removeItem("process")
       createProcess(saveObj);
    }
    
    const handleSave = () => {
        setErr(null);
        if(createProcessInfo[0].value === "") {
            setErr({
                name: "processName",
                message: "Process name is empty"
            });
            return;
        }

        if(createProcessInfo[2].value === ""){
            setDateError("Date must be defined");
            return;
        }

        if(dayjs(createProcessInfo[2].value).diff(dayjs()) < 0){
            setDateError("Date can't be in past");
            return;
        }

        let saveObj = {
            processid: nanoid(),
            name: createProcessInfo[0].value,
            description: createProcessInfo[1].value,
            start_datetime:createProcessInfo[2].value,
            userId: currentUser.userid
        };
        setProcessInfo(saveObj);

        setModalActive(false);

    }



    const handleComponentToolbar = (component,index) => {
        setComponent(component);
        setPhaseIndex(index)
    }

    const name = component ||phaseIndex >= 0 ? "w-100 h-100 process-grid-three" : "w-100 h-100 process-grid";

    return (
        <React.Fragment>
            {modalActive &&
                <Modal>
                    <ModalHeader title="Create process" closeModal={() => setModalActive(false)}/>
                    <CreateProcessModalBody err={err} createProcessInfo={createProcessInfo} setCreateProcessInfo={setCreateProcessInfo} dateError={dateError}/>
                    <ModalFooter handleSave={handleSave} handleClose={() => {localStorage.removeItem("info"); localStorage.removeItem("process"); navigate(routes.PROFILE_URL)}} />
                </Modal>
            }

        <div className={name} >
            <div className="">
                    <Sidebar>
                        <div className="processSidebar">
                            <ViewPhasesToolbar process={process} setProcess={setProcess}/>
                        </div>
                    </Sidebar>
                </div>
            <div>
                <h4 className="m-3" id={createProcessInfo[0].name}>{createProcessInfo[0].value} <FontAwesomeIcon icon={faSave} onClick={handleSaveToDB}/> </h4>
            <div className="process-wrapper w-100 d-flex justify-content-center align-items-center">
                <div className="process-view">
                    <Carousel show={3} numOfPhases={carouselLength} handleSave={handleSaveToDB}>
                        {process.phases.map((phase,index) => (
                            <PhaseView
                                key = {nanoid()}
                                addParamVisible={true}
                                inputParamVisible={false}
                                phase = {phase}
                                params={phase.params}
                                setPhaseIndex = {() => setPhaseIndex(index)}
                                index={index}
                                handleComponent={handleComponentToolbar}
                                componentBtnName="Add parameter"
                                canView={false}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            </div>
            {component &&
                <Sidebar>
                    <div className="processSidebar">
                        <ComponentInfoToolbar component={component} handleClose={() =>{
                            setComponent(null);
                            setPhaseIndex(-1);
                        }
                        } setProcess={setProcess} indexOfPhaseForComponent={phaseIndex}/>
                    </div>
                </Sidebar>
            }
            {!component && phaseIndex >= 0 &&
                <Sidebar>
                    <div className="processSidebar">
                        <InputParamsToolbar
                            phaseIndex={phaseIndex}
                            setProcess = {setProcess}
                            handleClose={() => setPhaseIndex(-1)}
                        />
                    </div>
                </Sidebar>

            }
        </div>



        </React.Fragment>
    );
}