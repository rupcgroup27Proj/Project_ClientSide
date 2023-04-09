//Formatted
import { useContext, createContext, useState } from "react";


const APIContext = createContext();


export function useAPI() {
    return useContext(APIContext);
}

export default function APIProvider({ children }) {
    const ruppinAPI = '';
    const simulatorAPI = 'http://10.0.2.2:5283';

    const value = {
        ruppinAPI,
        simulatorAPI
    }

    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}
