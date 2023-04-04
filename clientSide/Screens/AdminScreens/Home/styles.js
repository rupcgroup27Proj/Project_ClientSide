import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#33383E',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    titleContainer: {
        backgroundColor: 'black',
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: "center"
    },
    delegationContainer: {
        marginBottom: 30,
        backgroundColor: '#181B20',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        borderWidth:4
    },
    delegationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    delegationBarBackground: {
        backgroundColor: '#333333',
        height: 30,
        borderRadius: 15,
        marginBottom: 10,
        width: '100%',
    },
    delegationAmount: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#00BFFF',
    },
});