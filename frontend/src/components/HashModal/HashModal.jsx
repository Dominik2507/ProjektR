import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalFooter from '../Modal/ModalFooter';
import ToolbarInput from '../ToolbarInput/ToolbarInput';
import "./hashModalStyle.css";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function HashModal({handleClose, processid, openSnackbar}) {
  const [ hashList, setHashList]=useState([]);

  useEffect(() => {
    axios.get(`${backend_paths.HASH}/all/${processid}`,)
            .then(res => res.data)
            .then(data =>{
                console.log(data)
                setHashList(data)
            })
            .catch(err => openSnackbar("error", err.msg));
  }, [])

  return (
    <div>
        <Modal>
            <ModalHeader closeModal={handleClose} title={"Cardano transaction IDs"}/>
            <div className="modal-body d-flex flex-column align-items-start">
              {
                Array.isArray(hashList) && hashList.length > 0 ? 
                <ul>
                    {
                        hashList.map(hash =>{
                            return (
                                <li style={{wordBreak: 'break-all'}}>
                                    <a href={`https://preview.cardanoscan.io/transaction/${hash?.transactionid}`} className="w-100">
                                        {hash?.transactionid}
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                :
                <div className='p-3'>
                  There are no transactions recorder in database for this process.
                </div>
              }
      
            </div>
            
            <ModalFooter handleClose={handleClose} />
            
        </Modal>
    </div>
  );
}

export default HashModal;
