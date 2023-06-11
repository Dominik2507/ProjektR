import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';

import QRCode from 'qrcode';
import QRCodeReader from 'qrcode-reader';



import "./QRStyle.css";

function QRModal({handleClose, batchIndex}) {

  function handleFileInputChange(event) {
    //console.log("im here")
    const file = event.target.files[0];
    if (file.type !== 'image/png') {
      alert('Invalid file type. Please select a PNG image.');
      return;
    }
    const reader = new FileReader();
    
    reader.onload = function (event) {
      
      const img = new Image();
      img.onload = function () {
        const qr = new QRCodeReader();
    
        qr.decode(img.src, function (result) {
          console.log("Result", result);
        });
      };
      
      img.src = event.target.result;
    };
  
    reader.readAsDataURL(file);
  }
  

  const downloadQR = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    const canvas = document.getElementById('qr-code');
    QRCode.toCanvas(canvas, (window.location.href + "?batchIndex=" + batchIndex), function (error) {
      if (error) console.error(error);
    });
  }, [window.location.href]);

  return (
    <div>
        <Modal>
            <ModalHeader closeModal={handleClose} title={"QR code"}/>
            <div className='d-flex justify-content-center align-items-center'>
               <canvas id="qr-code"></canvas>
               <div className='qrBody' >
                <div className='d-flex flex-column'>
                  <button className='qrButton' onClick={downloadQR}>
                      <FontAwesomeIcon icon={faDownload} size={"2x"}/>
                      <span className='qrTitle'>Download QR for this product</span>
                  </button>
                      
                  </div>
                  <div className='separator'/>
                  <button className='qrButton' onClick={()=>document.getElementById('qrFileControl').click()}>
                    <div className='d-flex flex-column'>
                        <FontAwesomeIcon icon={faUpload} size={"2x"} />
                        <span className='qrTitle'> Upload QR to find product</span>
                        <input type='file' accept='image/png' hidden id='qrFileControl' onChange={(e)=>handleFileInputChange(e)} />
                    </div>
                  </button>
               </div>
            </div>
        </Modal>
    </div>
  );
}

export default QRModal;
