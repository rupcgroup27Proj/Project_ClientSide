import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { useUser } from "./UserContext";

const TeacherContext = createContext();

export function useTeacher() {
    return useContext(TeacherContext);
}

export default function TeacherProvider({ children }) {
    const [journeyStarted, setJourneyStarted] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remainingDays, setRemainingDays] = useState(null);
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://10.0.2.2:5283/api/Journeys/GetJourneyDatesAndSchoolName/groupId/${currentUser.groupId}`);
                setStartDate(response.data.startDate);
                setEndDate(response.data.endDate);
                if (response.data.startDate === "1950-01-01T00:00:00")
                    setJourneyStarted(false);
                else
                    setJourneyStarted(true);

            } catch (error) {
                Alert.alert("Error", "Failed to fetch journey data from the server.");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const today = new Date();
        if (startDate !== "" && today < new Date(startDate)) {
            const remainingTime = new Date(startDate) - today;
            const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
            setRemainingDays(remainingDays);
        } else {
            setRemainingDays(0);
        }
    }, [startDate, endDate]);

    const updateJourney = async (newStartDate, newEndDate) => {
        console.log(`start: ${newStartDate.toISOString()}`)
        console.log(`end: ${newEndDate.toISOString()}`)
        try {
            await axios.put(`http://10.0.2.2:5283/api/Journeys/groupId/${currentUser.groupId}/startDate/${newStartDate.toISOString()}/endDate/${newEndDate.toISOString()}`);
            setStartDate(newStartDate.toISOString());
            setEndDate(newEndDate.toISOString());
            setJourneyStarted(true);
        } catch (error) {
            Alert.alert("Error", "Failed to update journey.");
        }
    };

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

