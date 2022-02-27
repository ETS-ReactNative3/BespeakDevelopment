import React, { useState, useEffect, useRef } from 'react';
import  Apploading  from 'expo-app-loading';

import * as Notifications from 'expo-notifications';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, LogBox } from 'react-native';

import { auth, d_link } from './firebase';

import StartScreen from './screens/StartScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/LoginScreen';

import UserTabNavigate from './components/MenuTabNavigator'

import useFonts from './hooks/useFonts';
import Options from './values/Options';

const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [dummy, setDummy] = useState(true);
    const [_link, setLink] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    LogBox.ignoreLogs([
        'Warning: Can\'t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.',
        'Non-serializable values were found in the navigation state',
        'Animated: `useNativeDriver`']);
    
    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

            //when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen 
            try {        
                let notif_data = response.notification.request.content.data;

                setLink(notif_data);

            } catch(e) { console.log(e.message) }
        });
        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const getFonts = async () => {
        await useFonts();
    };

    // Listener for any Authentication Changes
    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((receivedUser) => {
            setUser(receivedUser);
            if (initializing) setInitializing(false);
        });
        return subscribe; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
        setDummy(!dummy);
            try {
                let user = auth.currentUser
                if (user) {
                    await user.reload();
                } 
            } catch (error) {
                console.log(error);
            }
        }, 1000);
        return () => clearInterval(interval);
    });

    // Listener for clicked Dynamic Links
    useEffect(() => {
        const unsubscribeDynamicLinks = d_link().onLink(({url}) => {
            console.log('Link loaded 1:  ', url);

            setLink(false);

            // #TODO: Refactor
            var regex = /[?&]([^=#]+)=([^&#]*)/g, params = {}, match;
            try {        
                while (match = regex.exec(url)) {
                    console.log('Getting parameters...')
                    params[match[1]] = match[2];
                }
            } catch(e) { Alert.alert(e.message) }

            console.log(params?.event)

            //if(user && user.emailVerified) {
                setLink(params);
            //}
        });
        return () => unsubscribeDynamicLinks();
    })
    
    useEffect(async () => {
        await d_link()
            .getInitialLink()
            .then(link => {
                let url = link?.url;

                console.log('Link loaded 2:  ', link);

                setLink(false);

                // #TODO: Refactor
                var regex = /[?&]([^=#]+)=([^&#]*)/g, params = {}, match;
                try {    
                    while (match = regex.exec(url)) {
                        console.log('Getting parameters...')
                        params[match[1]] = match[2];
                    }
                } catch(e) { Alert.alert(e.message) }

                console.log(params?.event)

                setLink(params);
            });
    }, []);

    if(!isLoaded){
        return (
            <Apploading startAsync={getFonts} onFinish={()=> setIsLoaded(true)}
                onError={() => console.log('error')}/>
        )
    }
    if (initializing) return null;

    return(
        <>
            {user && user.emailVerified ? (
                <UserTabNavigate direct = {_link} key = {_link?.event ? _link?.event : _link?.user}/>
            ) : (
                <NavigationContainer key = {_link?.event ? _link?.event : _link?.user}>
                    <Stack.Navigator >
                        <Stack.Screen options={Options.TitleScreen} name="TitleScreen" component={StartScreen.TitleScreen} 
                            initialParams ={{direct: _link}} />
                        <Stack.Screen options={Options.NoTitleWithBack} name="LoginScreen" component={SignInScreen.LoginScreen} />
                        <Stack.Screen options={Options.WithTitleWithBack.ForgotPassword} name="ResetFormScreen" component={SignInScreen.ResetFormScreen} />
                        <Stack.Screen options={Options.NoTitleNoBack} name="ResetPasswordScreen" component={SignInScreen.ResetPasswordScreen} />
                        <Stack.Screen options={Options.NoTitleWithBack} name="ContinueScreen" component={StartScreen.ContinueScreen} />
                        <Stack.Screen options={Options.NoTitleWithBack} name="SignUpNameScreen" component={SignUpScreen.SignUpNameScreen} />
                        <Stack.Screen options={Options.NoTitleWithBack} name="SignUpFormScreen" component={SignUpScreen.SignUpFormScreen} />
                        <Stack.Screen options={Options.NoTitleNoBack} name="EmailVerificationScreen" component={SignUpScreen.EmailVerificationScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}
