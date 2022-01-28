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
  import homeStyles from "../styles/homeStyles";
  import { 
    Feather,
  } from '@expo/vector-icons';
  import A from "../assets/img/A.jpg";

//forSearch
function SearchScreen({ navigation }) {
    return (
      <View style={homeStyles.uHcontainer}>
      <View style={homeStyles.cardsearchheader}> 
      <Feather name="search" size={24} style={homeStyles.searchbarIcon}/>
      <TextInput style={homeStyles.searchBar} placeholder=' Search event... '></TextInput>
      </View>
  
      <ScrollView style={homeStyles.homecontent}>
        <TouchableOpacity style={homeStyles.card}
          onPress={() => navigation.navigate('SearchDetailScreen')}>
          <Text style={homeStyles.cardTitle}>Events</Text> 
        </TouchableOpacity>        
        <TouchableOpacity style={homeStyles.card}
          onPress={() => navigation.navigate('SearchDetailScreen')}>
          <Text style={homeStyles.cardTitle}>Organizers</Text> 
        </TouchableOpacity>        
      </ScrollView>
  
      <View style={homeStyles.searchfooter}>
        <Text style={homeStyles.bespeaklogo}>bespeak</Text>
        <Text style={homeStyles.signin}>© Sandbox Technologies.</Text>
      </View>
    </View>
    );
  }
  
  function SearchDetailsScreen() {
    return (
      <View style={homeStyles.homeDetailscontent}>
        <Text style={homeStyles.homeDetailscontentTitle}>Title</Text>
          <Text style={homeStyles.homeDetailscontentTime}>Set time</Text>
        <Text style={homeStyles.homeDetailscontentDetails}>What is Lorem Ipsum?
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
  
  Why do we use it?
  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
  
  
  Where does it come from?
  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.!</Text>
      </View>
      );
  }

export default {
    SearchScreen,
    SearchDetailsScreen
}