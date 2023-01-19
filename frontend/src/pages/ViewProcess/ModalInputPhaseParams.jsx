import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalFooter from "../../components/Modal/ModalFooter";

export default function ModalInputPhaseParams({closeModal, param}){

    const [paramValue,setParamValue] = useState("");

    const handleLogParam = () => {
        //TODO: save param
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