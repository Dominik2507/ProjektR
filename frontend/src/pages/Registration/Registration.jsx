import React, {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";


import Form from "../../components/Form/Form";

import {registrationInputs} from "../../constants/registrationInputs";

import {registerValidation} from "../../util/validation";

import User from "../../model/User";

import "../Login/Login.css";

import {AuthContext} from "../../context/AuthContext";
import {routes} from "../../constants/paths";

export default function Registration(){
    const [inputs, setInputs] = useState(registrationInputs);
    const [error, setError] = useState([]);
    const [serverError, setServerError] = useState("");

    const {signup} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setInputs(oldInput =>{
            let newInput = [...oldInput];
            const index = newInput.findIndex(element => element.name === name);
            newInput[index].value = value;
            return newInput;
        });
    }

    const handleClick = async (e) => {
        e.preventDefault();

        let user = new User(
            inputs[0].value,
            inputs[1].value,
            inputs[2].value,
            inputs[3].value,
            inputs[4].value
        );

        let err = registerValidation(user);

        setError(err);

        if(err.length > 0)
            return;

        let response = await signup(user);

        if(response === "ok") {
            inputs.forEach(input => input.value = "");
            navigate(routes.USER_LOGIN_URL);
        }

        setServerError(response);

    }

    return(

        <div className = "login-form w-50">
            {serverError.length > 0 &&
                <div className="alert alert-danger alert-dismissible d-flex align-items-center fade show">
                    <i className="bi-exclamation-octagon-fill"></i>
                    {serverError}
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                </div>
            }
            <Form
                appinputs = {inputs}
                btnPlaceholder = "Register"
                handleChange = {handleChange}
                handleClick = {handleClick}
                errors = {error}
            />
        </div>

    )
}