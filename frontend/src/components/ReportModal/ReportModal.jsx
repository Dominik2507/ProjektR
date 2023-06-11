import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalFooter from '../Modal/ModalFooter';
import ToolbarInput from '../ToolbarInput/ToolbarInput';
import "./ReportStyle.css";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import { Link } from 'react-router-dom';

function ReportModal({handleClose, processid, reportedBy, openSnackbar}) {
  const [description, setDescription]=useState();

  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSave = () => {
    const obj={
      processid: Number(processid),
      userid: reportedBy,
      description: description
    }
    console.log(obj)
    axios.post(`${backend_paths.CREATE_NEW_REPORT}`, obj)
            .then(res => {
              console.log(res); 
              openSnackbar("success", "Report submited")
              handleClose()})
            .catch(err => openSnackbar("error", err.msg));
  }

  return (
    <div>
        <Modal>
            <ModalHeader closeModal={handleClose} title={"Report a problem"}/>
            <div className="modal-body d-flex flex-column align-items-start">
              {
                reportedBy == null ? 
                <div className='p-3'>
                  You must be logged in to submit reports! Dont have an account? <Link to={"/registration"} >Sign up here!</Link>
                </div>
                :
                <ToolbarInput type={"area"} placeholder="Write problem description here..." value={description} name={"reportDescription"} handleChange={handleChange}/>
              }
      
            </div>
            {
              reportedBy && <ModalFooter handleSave={handleSave} handleClose={handleClose} />
            }
        </Modal>
    </div>
  );
}

export default ReportModal;
