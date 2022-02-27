import { Alert } from 'react-native';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus",existingStatus)
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Failed to get push token for push notification!');
            console.log("finalStatus",finalStatus)
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync({experienceId:'@jedpedregosa/Bespeak'})).data;
    } else {
        Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FE9018',
        });
    }

    return token;
}

export { registerForPushNotificationsAsync };