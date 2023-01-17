import React, {useContext, useState} from "react";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import CreateProcessModalBody from "./CreateProcessModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import Sidebar from "../../components/Sidebar";
import CreatePhaseToolbar from "./CreatePhaseToolbar";

import "./CreateProcess.css"
import {nanoid} from "nanoid";
import {CreateProcessContext} from "../../context/CreateProcessContext";
import {modalInputs} from "../../constants/paramInputs";
import ViewPhasesToolbar from "../../components/ViewToolbar/ViewPhasesToolbar";
import Carousel from "../../components/Carousel/Carousel";
import PhaseView from "../../components/PhaseView/PhaseView";

export default function CreateProcess(){
    const [modalActive, setModalActive] = useState(true);
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState(modalInputs);
    const [process, setProcess]=useState({"phases": []})
    const {setProcessInfo} = useContext(CreateProcessContext);

    console.log(process);

    const handleSave = () => {
        setErr(null);
        if(createProcessInfo[0].value === "") {
            setErr({
                name: "processName",
                message: "Process name is empty"
            });
            return;
        }


        //TODO: Save process to DB and return and save process id
        let saveObj = {
            processid: nanoid(),
            processName : createProcessInfo[0].value,
            processDescription: createProcessInfo[1].value
        };

        setProcessInfo(saveObj);

        setModalActive(false);

    }

    return (
        <React.Fragment>
            {modalActive &&
                <Modal>
                    <ModalHeader title="Create process" closeModal={() => setModalActive(false)}/>
                    <CreateProcessModalBody err={err} createProcessInfo={createProcessInfo} setCreateProcessInfo={setCreateProcessInfo}/>
                    <ModalFooter handleSave={handleSave} handleClose={() => setModalActive(false)} />
                </Modal>
            }

        <div className="w-100 h-100 process-grid" >
            <div className="">
                    <Sidebar>
                        <div className="processSidebar">
                            <ViewPhasesToolbar process={process} setProcess={setProcess}/>
                        </div>
                    </Sidebar>
                </div>
            <div>
                <h4 className="m-3" id={createProcessInfo[0].name}>{createProcessInfo[0].value}</h4>
            <div className="process-wrapper w-100 d-flex justify-content-center align-items-center">
                <div className="process-view">
                    <Carousel show={2} numOfPhases={process.phases}>
                        {process.phases.map(phase => (
                            <PhaseView
                                key = {nanoid()}
                                phase = {phase}
                                params={phase.params}
                            />
                        ))}
                    </Carousel>
                </div>
            </div>
            </div>
        </div>



        </React.Fragment>
    );
}