import React, { useState, Component } from 'react';
import  Apploading  from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './screens/StartScreen';
import SignUpScreen from './screens/SignUpScreen';

import useFonts from './hooks/useFonts';
import Options from './values/Options';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const getFonts = async () => {
    await useFonts();
  };
  if(!isLoaded){
    return (
      <Apploading startAsync={getFonts} onFinish={()=> setIsLoaded(true)}
        onError={() => console.log('error')}/>
    )
  } 
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={Options.TitleScreen} name="TitleScreen" component={StartScreen.TitleScreen} />
        <Stack.Screen options={Options.NoTitleWithBack} name="ContinueScreen" component={StartScreen.ContinueScreen} />
        <Stack.Screen options={Options.NoTitleWithBack} name="SignUpNameScreen" component={SignUpScreen.SignUpNameScreen} />
        <Stack.Screen options={Options.NoTitleWithBack} name="SignUpFormScreen" component={SignUpScreen.SignUpFormScreen} />
        <Stack.Screen options={Options.NoTitleNoBack} name="EmailVerificationScreen" component={SignUpScreen.EmailVerificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
