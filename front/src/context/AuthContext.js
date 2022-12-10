import React, { createContext, useState } from "react";

import axios from "axios";

export const AuthContext = createContext(null);

export default function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    const signup = async (user) => {
        const url = "http://localhost:3001/registration";
        return axios.post(url,user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                setCurrentUser(user.email);
                return res.data;
            })
            .catch(err => err.response.data);



    };

    const login = async (user) => {


        const url = "http://localhost:3001/login";
        return axios.post(url,user, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(res => {
                setCurrentUser(user.email);
                return res.data;
            })
            .catch(err => err.response.data);

    };

    const logout = async () => {
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        signup,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}