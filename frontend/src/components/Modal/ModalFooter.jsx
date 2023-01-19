import React from "react";

export default function ModalFooter({handleSave,handleClose}){
    return(
        <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={handleClose}>Close</button>
            {handleSave &&
                <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
            }
        </div>
    )
}