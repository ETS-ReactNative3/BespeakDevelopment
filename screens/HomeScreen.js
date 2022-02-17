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
import { 
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import EventList from "../components/EventList";

import HomeScreenStyle from "../styles/HomeScreenStyle";
import SystemStyle from "../styles/SystemStyle";

class HomeScreen extends Component {
  render() {
    return (
      <View style={HomeScreenStyle.Container}>
        <View style={HomeScreenStyle.HomeHeader}>
          <Text style={HomeScreenStyle.BespeakLogo}>bespeak</Text>
        </View>
        <EventList for_home = {true}
          navigation = {this.props.navigation}/>
      </View>
    );
  }
}

function HomeDetailsScreen() {
  const bottomSheet = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAttendingVisible, setModalAttendingVisible] = useState(false);
  return (
  <ScrollView>
    <View style={SystemStyle.EventContainer}>
      <View style={SystemStyle.ImgContainer}>
        <Image
          style={SystemStyle.ImgContainer}
          source={require('../assets/img/B.jpg')}
          />
      </View>
      <View style={SystemStyle.EventContainer}>
      <Text style={SystemStyle.EventTitle}>Sunday Worship Service</Text>
      <View style={SystemStyle.OrganizerTab}>
        <TouchableOpacity style={SystemStyle.OrganizerInfo}
          onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={SystemStyle.OrganizerImgContainer}>
        <Image
        style={SystemStyle.OrganizerImg}
        source={require('../assets/img/EveryNation.png')}
        />
      </View>
          <View style={SystemStyle.OrgCardContainer}>
            <Text style={SystemStyle.OrganizerName}>Every Nation Campus</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={SystemStyle.FollowOrgBtn}
          onPress={() => navigation.navigate('')}>
          <Text style={SystemStyle.FollowOrgTextBtn}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={SystemStyle.LowerSection}>
          <Feather name="calendar" size={24} color="black" />
          <Text style={SystemStyle.EventSchedule}>Sunday, November 14 ∘ Starts at 12:00PM</Text>
        </View>
        <View style={SystemStyle.LowerSection}>
          <SimpleLineIcons name="location-pin" size={24} color="black" />
          <Text style={SystemStyle.EventPlace}>L3 Robinsons MetroEast Barangay, Pasig, 1800, Metro Manila, Philippines</Text>
        </View>
      </View>
    </View>
    </View>
    <View>
      <Text style={SystemStyle.LineBreak}></Text>
    </View>
    <View style={SystemStyle.Container}>
      <Text style={SystemStyle.EventAboutTitle}>About</Text>
      <Text style={SystemStyle.EventTextInfo}>
        As much as we are all excited to regather, ENC is also
        commited in ensuring a safe worry-free Worship
        experience for you
      </Text>
      <Text style={SystemStyle.EventTextInfo}>
        ENC adheres to the safety protocols and guidelines issued by
        the Government during pandemic. In compliance to this,
        membres who wish to worship onsite must be FULLY
        VACCINATED
      </Text>
      <Text style={SystemStyle.EventTextInfo}>
        If fully vaccinated, please proceed to our online registration to
        secure a seat.
      </Text>
      <Text style={SystemStyle.EventReminderTitle}>
        Reminder</Text>
      <Text style={SystemStyle.EventTextInfo}>
        1. As much as we are all excited to regather, ENC is also
        commited in ensuring a safe worry-free Worship
        experience for you
      </Text>
      <Text style={SystemStyle.EventTextInfo}>
        2. As much as we are all excited to regather, ENC is also
        commited in ensuring a safe worry-free Worship
        experience for you
      </Text>
      <Text style={SystemStyle.EventTextInfo}>
        3. As much as we are all excited to regather, ENC is also
        commited in ensuring a safe worry-free Worship
        experience for you
      </Text>
      <View style={SystemStyle.BreakLineContainer}>
        <Text style={SystemStyle.BreakLine}></Text>
        <Text style={SystemStyle.BreakLineComment}>Comment</Text>
      </View>

      <View style={SystemStyle.BespeakerCommentContainer}>
        <View style={SystemStyle.BespeakerImgContainer}>
          <Image
            style={SystemStyle.BespeakerImg}
            source={require('../assets/img/EveryNation.png')}
          />
        </View>
          <View style={SystemStyle.BespeakerContainer}>
            <Text style={SystemStyle.BespeakerName}>Aegon Targaryen</Text>
            <Text style={SystemStyle.BespeakerComment}>I guess it would be good to go here after finding out
              something about myself.</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <SimpleLineIcons name="options" size={24} color="black" style={SystemStyle.CommentInfo}/>
          </TouchableOpacity>
        </View>          

      <View style={SystemStyle.BespeakerCommentContainer}>
        <View style={SystemStyle.BespeakerImgContainer}>
          <Image
            style={SystemStyle.BespeakerImg}
            source={require('../assets/img/EveryNation.png')}
          />
        </View>
          <View style={SystemStyle.BespeakerContainer}>
            <Text style={SystemStyle.BespeakerName}>Sansa Stark</Text>
            <View style={SystemStyle.BespeakerInput}>
            <TextInput style={SystemStyle.MyCommentInput} placeholder=' Write a comment..'>
            </TextInput>
            <TouchableOpacity>
              <Ionicons name="send" size={24} color="black" style={SystemStyle.SendComment}/>
            </TouchableOpacity>
            </View>
          </View>
        </View>          
      </View>

      <View style={SystemStyle.AttendingContainer}>
        <TouchableOpacity style={SystemStyle.AttendingBtn}
          onPress={() => setModalAttendingVisible(true)}>
          <Text style={SystemStyle.AttendingTextBtn}>I'm attending!</Text>
        </TouchableOpacity>
      </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalAttendingVisible}
      onRequestClose={() => {
        setModalAttendingVisible(!modalAttendingVisible);}}>
      <View style={SystemStyle.YoureSetView}>
        <View style={SystemStyle.YoureSetModalView}>
        <View>
          <Text style={SystemStyle.ModalText}>Youre all set!</Text>
        </View>
        <View>
        <Feather name="check-circle" size={55} color="black" />
        </View>
        <View style={SystemStyle.commentdateinfo}>
          <TouchableOpacity style={SystemStyle.ViewBtn}
            //onPress={() => navigation.navigate('')}
            >
          <Text style={SystemStyle.ViewTextBtn}>View ticket</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </Modal>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);}}>
      <View style={SystemStyle.CommentInfoView}>
        <View style={SystemStyle.DeleteModalView}>
            <TouchableOpacity style={SystemStyle.Icon}
              onPress={() => ('')}
              >
              <MaterialIcons name="delete-outline" size={24} color="black" />
              <Text style={SystemStyle.DeleteTextBtn}>Delete</Text>
            </TouchableOpacity>
            <View style={SystemStyle.CommentDateInfo}>
              <FontAwesome5 name="clock" size={24} color="black" style={SystemStyle.Icon}/>
              <Text style={SystemStyle.CommentDate}>Sunday, November 9  12:00PM</Text>
            </View>
        </View>
      </View>
    </Modal>
    </ScrollView>
      
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    elevation: 6
  },
  text: {
    color: "white",
    fontWeight: "600"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

  
export default {
    HomeScreen,
    HomeDetailsScreen
}