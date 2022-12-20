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

export default function CreateProcess(){
    const [modalActive, setModalActive] = useState(true);
    const [err, setErr] = useState(null);
    const [createProcessInfo, setCreateProcessInfo] = useState(modalInputs);

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
                <div className="processSidebar">
                    <CreatePhaseToolbar />
                </div>
            </Sidebar>

        </React.Fragment>
    );
}