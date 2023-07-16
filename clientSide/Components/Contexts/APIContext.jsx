import { useContext, createContext } from "react";


//--------------| Used for changing endpoint's pathes easily |--------------//

const APIContext = createContext();

export function useAPI() {
    return useContext(APIContext);
}

export default function APIProvider({ children }) {
    //Apis:  https://proj.ruppin.ac.il/cgroup27/prod  |  http://10.0.2.2:5283 | https://192.168...:7283
    const simulatorAPI = 'http://10.0.2.2:5283';

    const value = { simulatorAPI }


    return (
        <APIContext.Provider value={value}>
            {children}
        </APIContext.Provider>
    )
}
