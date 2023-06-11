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
import { faCancel, faEdit, faRedo, faSave } from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {routes} from "../../constants/paths";
import dayjs from "dayjs";
import GlassBackground from "../../components/GlassBackgroud";

export default function CreateProcess(){
    const navigate = useNavigate();

    const [editInProgress, setEditInProgress] = useState(false);
    const [modalActive, setModalActive] = useState(
                                                    localStorage.getItem("info")==null
                                                );
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState(modalInputs);
    const [process, setProcess]=useState(localStorage.getItem("process") ? JSON.parse(localStorage.getItem("process")) : {"phases": []})
    const [component, setComponent] = useState(null);
    const [phaseIndex,setPhaseIndex] = useState(-1);
    const [carouselLength, setCarouselLength] = useState(process?.phases ? process.phases.length : 0);
    const {processInfo, setProcessInfo, createProcess} = useContext(CreateProcessContext);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        console.log(processInfo)
        if(processInfo == null || !processInfo?.name){
            setCreateProcessInfo(
                [{
                    name: "processName",
                    value: "",
                },{
                    name: "processDescription",
                    value: "",
                }]
            )
        }
    }, [])

    useEffect(() =>  {
        setCarouselLength(process?.phases ? process.phases.length : 0);
    },[process?.phases?.length])

    useEffect(() =>  {
       localStorage.setItem("info", JSON.stringify(processInfo))
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

        let saveObj = {
            processid: nanoid(),
            name: createProcessInfo[0].value,
            description: createProcessInfo[1].value,
            userId: currentUser.userid
        };
        setProcessInfo(saveObj);

        setModalActive(false);

    }

    const handleCloseModalAndRedirect = () => {
        localStorage.removeItem("info"); 
        localStorage.removeItem("process"); 
        navigate(routes.PROFILE_URL)
    }

    const handleCloseModal = () => {
        //localStorage.removeItem("info"); 
        //localStorage.removeItem("process"); 
        //navigate(routes.PROFILE_URL)
        setModalActive(false);
    }

    const handleReset = () => {
        if(!window.confirm("This will delete all progress! Are you sure you want to continue?")) return;
        setEditInProgress(false)
        localStorage.removeItem("info"); 
        localStorage.removeItem("process"); 
        setProcess({"phases": []})
        setProcessInfo({})
        setCreateProcessInfo(
            [{
                name: "processName",
                value: "",
            },{
                name: "processDescription",
                value: "",
            }]
        )

        setModalActive(true);
    }


    const handleComponentToolbar = (component,index) => {
        setComponent(component);
        setPhaseIndex(index)
    }

    const handleReOpenModal = () => {
        setEditInProgress(true);
        setModalActive(true);
    }

    const name = component ||phaseIndex >= 0 ? "w-100 h-100 process-grid-three" : "w-100 h-100 process-grid";

    return (
        <React.Fragment>
            {modalActive &&
            <>
                <GlassBackground/>

                <Modal>
                    <ModalHeader title="Create process" closeModal={editInProgress ? handleCloseModal : handleCloseModalAndRedirect}/>
                    <CreateProcessModalBody err={err} createProcessInfo={createProcessInfo} setCreateProcessInfo={setCreateProcessInfo}/>
                    <ModalFooter handleSave={handleSave} handleClose={editInProgress ? handleCloseModal : handleCloseModalAndRedirect} />
                </Modal>
            </>
            }
            {
                !component && phaseIndex < 0 &&
                <div className="position-absolute top-0 end-0 d-flex p-3 gap-2">
                    <FontAwesomeIcon icon={faSave} size="2x" color="green" title="Save process" onClick={handleSaveToDB}/> 
                    <FontAwesomeIcon icon={faRedo} size="2x" color="red" title="Reset process" onClick={handleReset}/>
                </div>
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
            <div className="m-3" style={{height: "15%", fontSize: "24px"}} id={processInfo.name}>
                <h2>
                    {processInfo.name}
                    <FontAwesomeIcon icon={faEdit} className="ps-4" title="Edit process" cursor={"pointer"} onClick={handleReOpenModal}/> 
                </h2>
                <div>
                    - {processInfo.description}
                </div>
            </div>
            <div style={{height: "65%"}} className="process-wrapper w-100 d-flex justify-content-center align-items-center">
                <div className="process-view">
                    <Carousel show={3} numOfPhases={carouselLength} handleSave={handleSaveToDB}>
                        {process.phases.map((phase,index) => (
                            <PhaseView
                                key = {nanoid()}
                                batchId={null}
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