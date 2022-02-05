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
  import ScanScreenStyle from "../styles/ScanScreenStyle";
  import { 
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
    MaterialIcons,
  } from '@expo/vector-icons';
  import A from "../assets/img/A.jpg";

export default function ScanScreen({ navigation }) {
    return (
      <View style={ScanScreenStyle.Container}>
      <ScrollView>
        <Text style={ScanScreenStyle.ScanText}>Scan an bespeak QR code</Text>
        <Ionicons name="scan-outline" size={440} color="#ccc" />
  
      </ScrollView>
      </View>
  );
}
  