'use client'

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthContextProvider = ({ children }:any) => {
    const [account, setAccount] = useState();

    
      


    return (
        <AuthContext.Provider value={{ account, setAccount }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);