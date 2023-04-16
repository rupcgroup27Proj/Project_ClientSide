import { Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { AllDell } from "./AllDellStyles";
import { Divider } from "react-native-paper";
import { useAPI } from "../../../../Components/Contexts/APIContext";
import { useFocusEffect } from "@react-navigation/native";


export default function AllDelegations() {

  const { simulatorAPI } = useAPI();
  const [pending, setPending] = useState([]);
  const [ongoing, setOnging] = useState([]);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDelegation, setSelectedDelegation] = useState({});


  useEffect(() => {
    getAllDelegetions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllDelegetions();
    }, [])
  );

  function getAllDelegetions() {
    axios.get(`${simulatorAPI}/api/Journeys/GetJourneyList`)
      .then((res) => {
        const pending = [];
        const past = [];
        const future = [];
        const ongoing = [];

        res.data.forEach((dlg) => {
          if (dlg.startDate === "1950-01-01T00:00:00") {
            pending.push(dlg);
          } else if (Date.parse(dlg.endDate) < new Date()) {
            past.push(dlg);
          } else if (Date.parse(dlg.startDate) > new Date()) {
            future.push(dlg);
          } else {
            ongoing.push(dlg);
          }
        });

        setPending(pending);
        setPast(past);
        setFuture(future);
        setOnging(ongoing);
      })
      .catch((err) => console.log("getAllDelegations " + err));
  }

  function openModal(delegation) {
    setSelectedDelegation(delegation);
    setModalVisible(true);
  }

  function closeModal() {
    setSelectedDelegation({});
    setModalVisible(false);
  }

  const dateFormat = (sd, ed) => {
    const sday = sd.getDate();
    const smonth = sd.getMonth() + 1; //months are 0-based, so we add 1
    const syear = sd.getFullYear();
    const eday = ed.getDate();
    const emonth = ed.getMonth() + 1;
    const eyear = ed.getFullYear();
    return `${sday.toString().padStart(2, "0")}/${smonth.toString().padStart(2, "0")}/${syear} - ${eday.toString().padStart(2, "0")}/${emonth.toString().padStart(2, "0")}/${eyear}`;
  }


  return (
    <ScrollView style={{ backgroundColor: '#33383E', paddingTop: 40, height: '100%' }}>

      <View style={{ backgroundColor: '#33383E' }}>
        <View style={AllDell.viewTitle}>
          <Text style={AllDell.title}>Past Delegations</Text>
          <Text style={AllDell.num}>{past.length}  </Text>
        </View>

        {past.length == 0
          ? <Text style={AllDell.text}>None</Text>
          : past.map((delegation) => {
            return (
              <View style={{ flex: 5, flexDirection: 'row' }}>
                <Text key={Math.random() * 10000} style={Style.text}
                  onPress={() => openModal(delegation)} >
                  {delegation.schoolName}
                </Text>
                <Divider />
              </View>
            );
          })
        }
      </View>


      <View>
        <View style={AllDell.viewTitle}>
          <Text style={AllDell.title}>Ongoing Delegations</Text>
          <Text style={AllDell.num}>{ongoing.length}</Text>
        </View>

        {ongoing.length == 0
          ? <Text style={AllDell.text}>None</Text>
          : ongoing.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={AllDell.text}
                  onPress={() => openModal(delegation)}>
                  {delegation.schoolName}
                </Text>
                <Divider />
              </>
            );
          })
        }
      </View>


      <View>
        <View style={AllDell.viewTitle}>
          <Text style={AllDell.title}>Future Delegations</Text>
          <Text style={AllDell.num}>{future.length}</Text>
        </View>
        {future.length == 0
          ? <Text style={AllDell.text}>None</Text>
          : future.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={AllDell.text}
                  onPress={() => openModal(delegation)}  >
                  {delegation.schoolName}
                </Text>
                <Divider />
              </>
            );
          })
        }
      </View>

      <View>
        <View style={AllDell.viewTitle}>
          <Text style={AllDell.title}>Pending Delegations</Text>
          <Text style={AllDell.num}>{pending.length}</Text>
        </View>

        {pending.length == 0
          ? <Text style={AllDell.text}>None</Text>
          : pending.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={AllDell.text}
                  onPress={() => { openModal(delegation) }}>
                  {delegation.schoolName}
                </Text>
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

        <View style={AllDell.modalView}>
          <Text style={AllDell.modalTitle}>Delegation Details</Text>
          <View style={AllDell.section}>
            <Text style={AllDell.sectionTitle}>Delegation Information</Text>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Group ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.groupId}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>School Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.schoolName}</Text>
            </View>
          </View>
          <View style={AllDell.section}>
            <Text style={AllDell.sectionTitle}>Teacher Information</Text>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherFirstName}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherId}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Email:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherEmail}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Phone:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.phoneTeacher}</Text>
            </View>
          </View>
          <View style={AllDell.section}>
            <Text style={AllDell.sectionTitle}>Guide Information</Text>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Guide Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideFirstName}  </Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Guide ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideId}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Guide Email:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideEmail}</Text>
            </View>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Guide Phone:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.phoneGuide}</Text>
            </View>
          </View>
          <View style={AllDell.section}>
            <Text style={AllDell.sectionTitle}>Dates</Text>
            <View style={AllDell.row}>
              <Text style={AllDell.label}>Dates:</Text>
              <Text style={{ color: '#EAEAEA' }}>{dateFormat(new Date(selectedDelegation.startDate), new Date(selectedDelegation.endDate))}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={closeModal}>
            <Text style={AllDell.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView >
  );
}


