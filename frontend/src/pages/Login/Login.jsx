import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";

import Form from "../../components/Form/Form";

import {loginInputs} from "../../constants/loginInputs";

import "./Login.css";
import User from "../../model/User";
import {loginValidation} from "../../util/validation";

import {AuthContext} from "../../context/AuthContext";

export default function Login(){
    const [inputs, setInputs] = useState(loginInputs);
    const [error, setError] = useState([]);
    const [serverError, setServerError] = useState("");
    

    const {login} = useContext(AuthContext);

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

        let user = new User({[inputs[0].name]: inputs[0].value,[inputs[1].name]: inputs[1].value});

        let err = loginValidation(user);

        setError(err);

        if(err.length > 0)
            return;

        let response = await login(user);

        if(response.userid) {
            inputs.forEach(input => input.value = "");
            navigate("/")
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
                    inputs = {inputs}
                    btnPlaceholder = "Login"
                    handleChange = {handleChange}
                    handleClick = {handleClick}
                    errors={error}
                />
            </div>

    )
}