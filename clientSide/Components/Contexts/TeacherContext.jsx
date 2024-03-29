import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useUser } from "./UserContext";
import { useAPI } from "./APIContext";


//--------------| Used for manipulating the current user's journey |--------------//

const TeacherContext = createContext();

export function useTeacher() {
    return useContext(TeacherContext);
}

export default function TeacherProvider({ children }) {

    const { currentUser } = useUser();
    const { simulatorAPI } = useAPI();
    const [journeyStarted, setJourneyStarted] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remainingDays, setRemainingDays] = useState(null);


    //--------------| Functions |--------------//
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${simulatorAPI}/api/Journeys/GetJourneyDatesAndSchoolName/groupId/${currentUser.groupId}`);
                setStartDate(response.data.startDate);
                setEndDate(response.data.endDate);
                (response.data.startDate === "1950-01-01T00:00:00") ? setJourneyStarted(false) : setJourneyStarted(true);
            }
            catch (error) { Alert.alert("Error", "Failed to fetch journey data from the server."); }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const today = new Date();
        if (startDate !== "" && today < new Date(startDate)) {
            const remainingTime = new Date(startDate) - today;
            const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
            setRemainingDays(remainingDays);
        }
        else { setRemainingDays(0); }

    }, [startDate, endDate]);


    const updateJourney = async (newStartDate, newEndDate) => {
        try {
            await axios.put(`${simulatorAPI}/api/Journeys/groupId/${currentUser.groupId}/startDate/${newStartDate.toISOString()}/endDate/${newEndDate.toISOString()}`);
            setStartDate(newStartDate.toISOString());
            setEndDate(newEndDate.toISOString());
            setJourneyStarted(true);
        }
        catch (error) { Alert.alert("Error", "Failed to update journey."); }

    };
    //--------------| End of unctions |--------------//


    const value = {
        journeyStarted,
        startDate,
        endDate,
        remainingDays,
        updateJourney,
    };


    return (
        <TeacherContext.Provider value={value}>
            {children}
        </TeacherContext.Provider>
    );
}

