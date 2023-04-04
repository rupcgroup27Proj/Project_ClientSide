import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Styles } from "./Styles";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { Divider } from "react-native-paper";

export default function AllDelegations({ delegation, navigation }) {
    const [pending, setPending] = useState([]);
    const [ongoing, setOnging] = useState([]);
    const [past, setPast] = useState([]);
    const [future, setFuture] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDelegation, setSelectedDelegation] = useState({});

    useEffect(() => {
        getAllDelegetions();
    }, []);

    function getAllDelegetions() {
        axios
          .get(`http://10.0.2.2:5283/api/Journeys/GetJourneyList`)
          .then((res) => {
            res.data.forEach(dlg => {
              if (dlg.startDate == "1950-01-01T00:00:00") {
                setPending(prev => [...prev, dlg])
                return
              }
              if (Date.parse(dlg.endDate) < new Date()) {
                setPast(prev => [...prev, dlg])
                return
              }
              if (Date.parse(dlg.startDate) > new Date()) {
                setFuture(prev => [...prev, dlg])
                return
              }
              setOnging(prev => [...prev, dlg])
            })
          })
          .catch((err) => console.log("getAllDelegetions " + err));
      }
    

    function openModal(delegation) {
        setSelectedDelegation(delegation);
        setModalVisible(true);
    }

    function closeModal() {
        setSelectedDelegation({});
        setModalVisible(false);
    }

    return (
        <ScrollView style={{ backgroundColor: '#33383E', marginTop: 40, height: '100%' }}>
            <View style={{ backgroundColor: '#33383E' }}>
                <View style={Style.viewTitle}>
                    <Text style={Style.title}>Past Delegations</Text>
                    <Text style={Style.num}>{past.length}</Text>
                </View>

                {past.length == 0
                    ? <Text style={Style.text}>None</Text>
                    : past.map((delegation) => {
                        return (
                            <>
                                <TouchableOpacity key={Math.random() * 10000} onPress={() => openModal(delegation)}>
                                    <Text style={Style.text}>
                                        {delegation.schoolName}
                                    </Text>
                                </TouchableOpacity>
                                <Divider />
                            </>
                        );
                    })
                }
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={Style.modalView}>
                    <Text style={Style.modalText}>{selectedDelegation.schoolName}</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={Style.modalClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
}

const Style = StyleSheet.create({
    viewTitle: {
        borderWidth: 1,
        flex: 15,
        flexDirection: 'row',
        backgroundColor: '#181B20',
        paddingVertical: 15
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        paddingHorizontal: 10,
        color: 'white',
        flex: 13
    },
    text: {
        color: '#EAEAEA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 18
    },
    num: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00BFFF',
        flex: 2,
        margin: 'auto'
    },
    modalView: {
        backgroundColor: '#33383E',
        margin: 50,
        padding: 40,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})
