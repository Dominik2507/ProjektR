import React, { createContext, useState } from "react";

import axios from "axios";
import {backend_paths} from "../constants/paths";

export const AuthContext = createContext(null);

export default function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

    const signup = async (user) => {

        return axios.post(backend_paths.SIGNUP_URL,user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                setCurrentUser(user);
                console.log(res);
                return res.data;
            })
            .catch(err => err.response.data);



    };

    const login = async (user) => {

        return axios.post(backend_paths.LOGIN_URL, user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                console.log("user", res.data);
                setCurrentUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                return res.data;
            })
            .catch(err => err.response.data);

    };

    const logout = async () => {
        setCurrentUser(null);
        localStorage.clear();
    };

    const value = {
        currentUser,
        signup,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}