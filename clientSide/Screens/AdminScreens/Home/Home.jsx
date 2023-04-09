import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { styles } from "./styles";


export default function Home() {

    const [delegations, setDelegations] = useState([]);
    const [pending, setPending] = useState(0);
    const [ongoing, setOnging] = useState(0);
    const [past, setPast] = useState(0);
    const [future, setFuture] = useState(0);
    const { simulatorAPI } = useAPI();
    
    useEffect(() => {
        getAllDelegetions();
    }, []);

    const getAllDelegetions = async () => {
        await axios.get(`${simulatorAPI}/api/Journeys/GetJourneyList`)
            .then((res) => {
                res.data.forEach(journey => {
                    if (journey.startDate == "1950-01-01T00:00:00") {
                        setPending(prev => prev + 1)
                        return
                    }
                    if (Date.parse(journey.endDate) < new Date()) {
                        setPast(prev => prev + 1)
                        return
                    }
                    if (Date.parse(journey.startDate) > new Date()) {
                        setFuture(prev => prev + 1)
                        return
                    }
                    setOnging(prev => prev + 1)
                });
            })
            .catch((err) => console.log(err))
    }


    return (


        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome, Admin!</Text>
            </View>
            <View>
                <View style={styles.delegationContainer}>
                    <Text style={styles.delegationTitle}>Pending Delegations</Text>
                    <Text style={styles.delegationAmount}>{pending}</Text>
                </View>
                <View style={styles.delegationContainer}>
                    <Text style={styles.delegationTitle}>Ongoing Delegations</Text>
                    <Text style={styles.delegationAmount}>{ongoing}</Text>
                </View>
                <View style={styles.delegationContainer}>
                    <Text style={styles.delegationTitle}>Past Delegations</Text>
                    <Text style={styles.delegationAmount}>{past}</Text>
                </View>
                <View style={styles.delegationContainer}>
                    <Text style={styles.delegationTitle}>Future Delegations</Text>
                    <Text style={styles.delegationAmount}>{future}</Text>
                </View>
            </View>
        </View>

    )
}
