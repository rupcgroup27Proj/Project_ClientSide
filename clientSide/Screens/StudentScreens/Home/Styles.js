import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20, 
        textAlign: 'center', 
        color: '#2196F3'
    },
    ibView:  {
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-evenly"
    },
    ibSubView: {
        alignItems:'center',
    },
    ibText: {
        fontSize:18,
        color:'#2196F3'
    },
    card: {
        backgroundColor:'#2196F3',
        padding:1,
        borderRadius:7,
        margin:2,
        padding:2,
        width:200,
    },
    cardTitle:{
        marginTop:-18,
        color:'white',
        fontWeight:'bold',
        fontSize:16,
    },
    simText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5, 
        marginLeft:10,
        textAlign: 'left', 
        color: '#2196F3'
    },
    noPostText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center', 
        color: 'white'
    },


})