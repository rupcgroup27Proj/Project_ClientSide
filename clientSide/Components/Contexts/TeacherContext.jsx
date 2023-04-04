import { useContext, createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import axios from "axios";

const TeacherContext = createContext();

export function useTeacher() {
    return useContext(TeacherContext);
}

export default function TeacherProvider({ children }) {
    const [journeyStarted, setJourneyStarted] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [remainingDays, setRemainingDays] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("apiA");
                const { startDate } = response.data;
                setStartDate(startDate);
                if (startDate === "1950") {
                    setJourneyStarted(false);
                } else {
                    setJourneyStarted(true);
                }
            } catch (error) {
                Alert.alert("Error", "Failed to fetch data from apiA.");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (startDate !== "" && endDate !== "") {
            const remainingTime = new Date(endDate) - new Date(startDate);
            const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
            setRemainingDays(remainingDays);
        }
    }, [startDate, endDate]);

    const updateJourney = async (newStartDate, newEndDate) => {
        try {
            await axios.put("ApiB", {
                startDate: newStartDate,
                endDate: newEndDate,
            });
            setStartDate(newStartDate);
            setEndDate(newEndDate);
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

