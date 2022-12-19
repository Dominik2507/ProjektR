import React, {useState} from "react";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import CreateProcessModalBody from "./CreateProcessModalBody";
import ModalFooter from "../../components/Modal/ModalFooter";
import Sidebar from "../../components/Sidebar";
import CreatePhaseToolbar from "./CreatePhaseToolbar";

import "./CreateProcess.css"

export default function CreateProcess(){
    const [modalActive, setModalActive] = useState(true);
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState([{
        name: "processName",
        value: "",
    },{
        name: "processDescription",
        value: "",
    }])
    const [processId, setProcessId] = useState();

    const handleClose = () => {
        setModalActive(false);
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

        //TODO: Save process to DB and return and save process id

        setModalActive(false);

    }

    return (
        <React.Fragment>
            {modalActive &&
                <Modal>
                    <ModalHeader title="Create process" closeModal={handleClose}/>
                    <CreateProcessModalBody err={err} createProcessInfo={createProcessInfo} setCreateProcessInfo={setCreateProcessInfo}/>
                    <ModalFooter handleSave={handleSave} handleClose={handleClose} />
                </Modal>
            }

            <Sidebar>
                <div className="processSidebar">
                    <CreatePhaseToolbar processId = {processId}/>
                </div>
            </Sidebar>

        </React.Fragment>
    );
}