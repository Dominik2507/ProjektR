import React, {useState} from "react";
import Modal from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import ModalFooter from "../../components/Modal/ModalFooter";
import Input from "../../components/Form/Input";

import "./modalComponent.css";
import {nanoid} from "nanoid";
import {backend_paths} from "../../constants/paths";
import axios from "axios";


export default function ModalInputComponentParams({handleClose,component}){
    const [inputs, setInputs] = useState([])
    const [error, setError] = useState(null);


    const handleAddLog = (paramId) => {
        setError(null);
        const index = inputs.findIndex(input => input.id === paramId);
        if(index < 0){
            setError({
                id: paramId,
                message: "Field can't be empty"
            });
            return;
        }

        let data = {
            value: inputs[index].value,
            parameterid: paramId,
        };

        console.log(data);
        axios.post(`${backend_paths.LOG}/create`, data)
            .then(res => setInputs(prevInputs => {
                let newInputs = [...prevInputs];
                newInputs[index].value = "";
                return newInputs;
            }))
            .catch(err => console.log(err));


    }

    const handleChange = (e,index) => {
        setInputs(prevInputs => {
            let newInputs = [...prevInputs];
            const indexInArray = newInputs.findIndex(input => input.id === index);

            if(indexInArray < 0){
                newInputs.push({
                    id: index,
                    value: e.target.value
                });

                return newInputs;
            }

            newInputs[indexInArray].value = e.target.value;
            return newInputs;
        })

    }



    const getValue = (paramId) => {
        const index = inputs.findIndex(input => input.id === paramId);
        return index < 0 ? "" : inputs[index].value;
    }
    return(
        <Modal>
            <ModalHeader closeModal={handleClose} title={component.name}/>
            <div className="modal-body">
                {component.params?.map(parameters => (
                    <div  className="modal-grid">
                    <Input
                        type="text"
                        placeholder={`Value for ${parameters.name}`}
                        error={error ? error.id === parameters.parameterid ? error.message : null : null}
                        value={getValue(parameters.parameterid)}
                        handleChange={(e) => handleChange(e,parameters.parameterid)}
                    />
                        <button className="btn btn-outline-success component-btn" onClick={() => handleAddLog(parameters.parameterid)}>Add log</button>
                    </div>

                ))}
            </div>
            <ModalFooter handleClose={handleClose} />
        </Modal>
    )
}