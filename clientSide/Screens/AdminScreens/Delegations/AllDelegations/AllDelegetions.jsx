import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
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
                <Text key={Math.random() * 10000} style={Style.text}
                  onPress={() => openModal(delegation)} >
                  {delegation.schoolName}
                </Text>
                <Divider />
              </>

            );
          })
        }
      </View>


      <View>
        <View style={Style.viewTitle}>
          <Text style={Style.title}>Ongoing Delegations</Text>
          <Text style={Style.num}>{ongoing.length}</Text>
        </View>

        {ongoing.length == 0
          ? <Text style={Style.text}>None</Text>
          : ongoing.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={Style.text}
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
        <View style={Style.viewTitle}>
          <Text style={Style.title}>Future Delegations</Text>
          <Text style={Style.num}>{future.length}</Text>
        </View>
        {future.length == 0
          ? <Text style={Style.text}>None</Text>
          : future.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={Style.text}
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
        <View style={Style.viewTitle}>
          <Text style={Style.title}>Pending Delegations</Text>
          <Text style={Style.num}>{pending.length}</Text>
        </View>

        {pending.length == 0
          ? <Text style={Style.text}>None</Text>
          : pending.map((delegation) => {
            return (
              <>
                <Text key={Math.random() * 10000} style={Style.text}
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

        <View style={Style.modalView}>
          <Text style={Style.modalTitle}>Delegation Details</Text>
          <View style={Style.section}>
            <Text style={Style.sectionTitle}>Delegation Information</Text>
            <View style={Style.row}>
              <Text style={Style.label}>Group ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.groupId}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>School Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.schoolName}</Text>
            </View>
          </View>
          <View style={Style.section}>
            <Text style={Style.sectionTitle}>Teacher Information</Text>
            <View style={Style.row}>
              <Text style={Style.label}>Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherFirstName}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherId}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>Email:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.teacherEmail}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>Phone:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.phoneTeacher}</Text>
            </View>
          </View>
          <View style={Style.section}>
            <Text style={Style.sectionTitle}>Guide Information</Text>
            <View style={Style.row}>
              <Text style={Style.label}>Guide Name:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideFirstName}  </Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>Guide ID:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideId}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>Guide Email:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.guideEmail}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>Guide Phone:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.phoneGuide}</Text>
            </View>
          </View>
          <View style={Style.section}>
            <Text style={Style.sectionTitle}>Dates</Text>
            <View style={Style.row}>
              <Text style={Style.label}>Start Date:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.startDate}</Text>
            </View>
            <View style={Style.row}>
              <Text style={Style.label}>End Date:</Text>
              <Text style={{ color: '#EAEAEA' }}>{selectedDelegation.endDate}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={closeModal}>
            <Text style={Style.modalClose}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </ScrollView >
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
    backgroundColor: "#33383E",
    margin: 20,
    padding: 35,
    borderRadius: 20,
    alignItems: 'flex-start',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'white'
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'white'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingLeft: 5
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    color: '#EAEAEA'
  },
  modalClose: {
    marginTop: 20,
    fontWeight: "bold",
    color: "#2196F3",
  },
})
