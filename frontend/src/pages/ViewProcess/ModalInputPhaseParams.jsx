import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalFooter from "../../components/Modal/ModalFooter";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import ToolbarInput from "../../components/ToolbarInput/ToolbarInput";

import "./modalComponent.css";

export default function ModalInputPhaseParams({closeModal, param, batchid, openSnackbar}){

    const [paramValue,setParamValue] = useState("");

    const handleLogParam = () => {
        let data = {
            value: paramValue,
            parameterid: param.parameterid,
            batchid: batchid
        };

        axios.post(`${backend_paths.LOG}/create`, data)
            .then(res =>{
                openSnackbar("success","Data log added")
                setParamValue("")})
            .catch(err => openSnackbar("success",err.msg));
    }

    return(
            <Modal>
                <ModalHeader closeModal={closeModal} title={param.name} />
                    <div className="modal-body">
                       
                            <div  className="modal-grid">
                            <ToolbarInput
                                name="paramValue"
                                value={paramValue}
                                type="number"
                                handleChange={(e) => setParamValue(e.target.value)}
                                placeholder={`Value for ${param.name}`}
                                error={null}
                            />
                            <button onClick={handleLogParam} className="btn btn-outline-success component-btn">Add data</button>
                            </div>
                    </div>    
                <ModalFooter handleClose={closeModal} />
            </Modal>
    )
}