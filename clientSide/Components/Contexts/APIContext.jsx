import { useContext, createContext } from "react";

const APIContext = createContext();


export function useAPI() {
    return useContext(APIContext);
}

export default function APIProvider({ children }) {
    //ruppinApi = https://proj.ruppin.ac.il/cgroup27/prod
    //simulator= http://10.0.2.2:5283
    const simulatorAPI = 'http://10.0.2.2:5283';

    const value = {
        simulatorAPI
    }

    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}
