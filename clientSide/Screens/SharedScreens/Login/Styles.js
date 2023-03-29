import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
        borderRadius: 5,
        margin: 20
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 20,
        borderRadius: 10,
    },
    firstInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        buttonColor: "green"
    },

});