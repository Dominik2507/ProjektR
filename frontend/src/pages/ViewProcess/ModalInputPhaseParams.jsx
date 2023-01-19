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

export default function ModalInputPhaseParams({closeModal, param}){

    const [paramValue,setParamValue] = useState("");

    const handleLogParam = () => {
        let data = {
            value: paramValue,
            parameterid: param.parameterid
        };

        axios.post(`${backend_paths.LOG}/create`, data)
            .then(res => setParamValue(""))
            .catch(err => console.log(err));
    }

    return(
            <Modal>
                <ModalHeader closeModal={closeModal} title={param.name} />
                    <div className="modal-body ">
                        <div className="d-flex flex-column align-items-start justify-content-center">
                            <Input
                                name="paramValue"
                                value={paramValue}
                                type="text"
                                handleChange={(e) => setParamValue(e.target.value)}
                                placeholder={`Value for ${param.name}`}
                                error={null}
                            />
                            <button
                                onClick={handleLogParam}
                                className="btn btn-outline-success"
                                style={{marginLeft: "35px"}}
                            >Add log</button>
                        </div>
                    </div>
                    <ModalFooter handleClose={closeModal} />
            </Modal>
    )
}