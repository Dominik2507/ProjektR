import React from "react";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalFooter from "../../components/Modal/ModalFooter";

export default function ModalInputComponentParams({handleClose,component}){
    console.log(component);
    return(
        <Modal>
            <ModalHeader closeModal={handleClose} />
            <div className="modal-content">

            </div>
            <ModalFooter handleClose={handleClose} />
        </Modal>
    )
}