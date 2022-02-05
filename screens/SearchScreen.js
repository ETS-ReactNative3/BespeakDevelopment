import React, { 
    useState,
    useRef, 
    Component 
  } from "react";
  import {
    SafeAreaView,
    TextInput, 
    ScrollView, 
    TouchableOpacity,
    Text, 
    View,
    Image,
     Alert, Modal,Pressable, StyleSheet
  } from 'react-native';
  import SearchScreenStyle from "../styles/SearchScreenStyle";
  import { 
    Feather,
  } from '@expo/vector-icons';
  import A from "../assets/img/A.jpg";
import ProfileContent from "../components/ProfileContent";

//forSearch
function SearchScreen({ navigation }) {

    return (
      <View style={SearchScreenStyle.Container}>
      <View style={SearchScreenStyle.CardSearchInHeader}> 
      <Feather name="search" size={24} style={SearchScreenStyle.SearchBarIcon}/>
      <TextInput style={SearchScreenStyle.SearchBar} placeholder=' Search event... '></TextInput>
      </View>
  

      <ProfileContent/>       

  
      <View style={SearchScreenStyle.Footer}>
        <Text style={SearchScreenStyle.BespeakLogo}>bespeak</Text>
        <Text style={SearchScreenStyle.FooterText}>© Sandbox Technologies.</Text>
      </View>
    </View> 
    );
  }
  
  function SearchDetailsScreen() {
    return (
      <View style={SearchScreenStyle.Container}>
      </View>
      );
  }

export default {
    SearchScreen,
    SearchDetailsScreen
}