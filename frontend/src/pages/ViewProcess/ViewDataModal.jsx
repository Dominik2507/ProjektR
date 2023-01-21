import React, {useEffect, useState} from "react";
import ModalHeader from "../../components/Modal/ModalHeader";
import axios from "axios";
import {backend_paths} from "../../constants/paths";
import Modal from "../../components/Modal/Modal";
import dayjs from "dayjs";
import {nanoid} from "nanoid";

export default function ViewDataModal({paramId, handleClose}){

    const [parameterInfo, setParametersInfo] = useState();
    useEffect(() => {
        axios.get(`${backend_paths.LOG}/parameter/${paramId}`)
            .then(res => res.data)
            .then(data => setParametersInfo(data))
            .catch(err => console.log(err))
    }, []);


    return(
        <React.Fragment>
            <Modal>
                <ModalHeader title="Details" closeModal={handleClose} />
                <div className="modal-body">
                    {parameterInfo && parameterInfo?.length === 0 &&
                        <p className="text-center">There are no data to show</p>
                    }
                    {parameterInfo && parameterInfo?.length > 0 &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Value</th>
                                    <th scope="col">Unit</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            {parameterInfo.map(info => (
                                <tr key={nanoid()}>
                                    <th scope="row">{info.name}</th>
                                    <th>{info.value}</th>
                                    <th>{info.unit}</th>
                                    <th>{dayjs(info.datetime).format("DD/MM/YYYY")}</th>
                                    <th>{dayjs(info.datetime).format("HH:mm:ss")}</th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    }

                </div>
            </Modal>
        </React.Fragment>
    )

}