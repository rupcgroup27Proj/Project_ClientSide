import { useContext, createContext, useEffect } from "react";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const TokenContext = createContext();

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    return token;
}

async function sendPushNotification(expoPushToken, ntfText) {
    (expoPushToken.filter(token => token != '')).forEach(token => {
        const message = {
            to: token,
            sound: "default",
            title: "המסע לפולין",
            body: ntfText,
            data: { someData: "goes here" },
        };
        fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
    });
    Alert.alert('Success', `Your message has been sent successfully.`)
}


export function useToken() {
    return useContext(TokenContext);
}

const value = {
    registerForPushNotificationsAsync,
    sendPushNotification
}


export default function TokenProvider({ children }) {
    return (
        <TokenContext.Provider value={value}>
            {children}
        </TokenContext.Provider>
    )
}