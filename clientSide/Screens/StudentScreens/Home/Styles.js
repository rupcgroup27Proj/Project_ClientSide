import { Dimensions, StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
    con: {
        height: Dimensions.get('window').height,
        display:'flex'
    },
    title: {
        flex:0.5,
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10, 
        textAlign: 'center', 
        color: '#2196F3'
    },
    ibView:  {
        flex:1.2,
        paddingVertical:10,
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-evenly",
        backgroundColor:'#2196F3',
        borderWidth:0.5,
        borderColor:'rgba(44, 199, 242, 0.9)'
    },
    postCon:{
        flex:3,
        borderBottomWidth:0.5,
        borderColor:'rgba(44, 199, 242, 0.9)'
    },
    recView: {
        flex:3,
        margin:5,
        marginTop:0
    },
    ibSubView: {
        alignItems:'center',
    },
    ibText: {
        fontSize:16,
        color:'white'
    },
    card: {
        backgroundColor:'rgba(33, 150, 243,.9)',
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
        fontSize:15,
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
    recT:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    recI:{
        fontSize: 15,
    }
})