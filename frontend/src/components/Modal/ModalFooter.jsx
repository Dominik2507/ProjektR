import React from "react";

export default function ModalFooter({handleSave,handleClose}){
    return(
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
    )
}