import { StyleSheet } from "react-native";


export const AllDell = StyleSheet.create({
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
      fontSize: 18,
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