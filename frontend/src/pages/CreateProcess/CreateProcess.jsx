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
import ViewPhasesToolbar from "./ViewPhasesToolbar";

export default function CreateProcess(){
    const [modalActive, setModalActive] = useState(true);
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState(modalInputs);
    const [process, setProcess]=useState({"phases": [{"id": 1, "name": "phase1","params":[], "components": [{"id": 1, "name": "component1", "params": []}]}]})
    const {setProcessInfo} = useContext(CreateProcessContext);


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
            id: nanoid(),
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

            <Sidebar>
                <h4 id={createProcessInfo[0].name}>{createProcessInfo[0].value}</h4>
                <div className="processSidebar">
                    <ViewPhasesToolbar process={process} setProcess={setProcess}/>
                </div>
            </Sidebar>

        </React.Fragment>
    );
}