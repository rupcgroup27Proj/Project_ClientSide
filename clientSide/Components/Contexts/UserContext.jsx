
import { useContext, createContext, useState } from "react";


const UserContext = createContext(null);

export function useUser() {
    return useContext(UserContext);
}

export default function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({});

    const value = {
        currentUser,
        setCurrentUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
