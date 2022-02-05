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
  import NotificationScreenStyle from "../styles/NotificationScreenStyle";
  import { 
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
    MaterialIcons,
  } from '@expo/vector-icons';
  import A from "../assets/img/A.jpg";

  function NotificationScreen({ navigation }) {
    return (
      <ScrollView style={NotificationScreenStyle.Container}>
      <Text style={NotificationScreenStyle.NotifDates}>Today</Text>
        
      <TouchableOpacity style={NotificationScreenStyle.NotifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={NotificationScreenStyle.NotifImgContainer}>
          <Image
          style={NotificationScreenStyle.NotifImg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={NotificationScreenStyle.NotifCard}>
          <Text style={NotificationScreenStyle.NotifContentName}>Every Nation Campus</Text>
          <Text style={NotificationScreenStyle.NotifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={NotificationScreenStyle.NotifContentTime}>a minute ago.</Text>
        </View>
      </TouchableOpacity>
      
      <Text style={NotificationScreenStyle.NotifDates}>Earlier</Text>
      <TouchableOpacity style={NotificationScreenStyle.NotifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={NotificationScreenStyle.NotifImgContainer}>
          <Image
          style={NotificationScreenStyle.NotifImg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={NotificationScreenStyle.NotifCard}>
          <Text style={NotificationScreenStyle.NotifContentName}>Every Nation Campus</Text>
          <Text style={NotificationScreenStyle.NotifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={NotificationScreenStyle.NotifContentTime}>a minute ago.</Text>
        </View>
      </TouchableOpacity>
  </ScrollView>
    );
  }
  
  function NotificationDetailScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAttendingVisible, setModalAttendingVisible] = useState(false);
    return (
  <ScrollView>
      <View style={NotificationScreenStyle.EventContainer}>
        <View style={NotificationScreenStyle.ImgContainer}>
          <Image
            style={NotificationScreenStyle.ImgContainer}
            source={require('../assets/img/B.jpg')}
            />
        </View>
        <View style={NotificationScreenStyle.EventContainer}>
        <Text style={NotificationScreenStyle.EventTitle}>Sunday Worship Service</Text>
        <View style={NotificationScreenStyle.OrganizerTab}>
          <TouchableOpacity style={NotificationScreenStyle.OrganizerInfo}
            onPress={() => navigation.navigate('NotificationDetailScreen')}>
          <View style={NotificationScreenStyle.OrganizerImgContainer}>
          <Image
          style={NotificationScreenStyle.OrganizerImg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
            <View style={NotificationScreenStyle.NotifCard}>
              <Text style={NotificationScreenStyle.OrganizerName}>Every Nation Campus</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={NotificationScreenStyle.FollowOrgBtn}
            onPress={() => navigation.navigate('')}>
            <Text style={NotificationScreenStyle.FollowOrgTextBtn}>Followed</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={NotificationScreenStyle.LowerSection}>
            <Feather name="calendar" size={24} color="black" />
            <Text style={NotificationScreenStyle.EventSchedule}>Sunday, November 14 ∘ Starts at 12:00PM</Text>
          </View>
          <View style={NotificationScreenStyle.LowerSection}>
            <SimpleLineIcons name="location-pin" size={24} color="black" />
            <Text style={NotificationScreenStyle.EventPlace}>L3 Robinsons MetroEast Barangay, Pasig, 1800, Metro Manila, Philippines</Text>
          </View>
        </View>
      </View>
      </View>
      <View>
        <Text style={NotificationScreenStyle.LineBreak}></Text>
      </View>
      <View style={NotificationScreenStyle.Container}>
        <Text style={NotificationScreenStyle.EventAboutTitle}>About</Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          ENC adheres to the safety protocols and guidelines issued by
          the Government during pandemic. In compliance to this,
          membres who wish to worship onsite must be FULLY
          VACCINATED
        </Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          If fully vaccinated, please proceed to our online registration to
          secure a seat.
        </Text>
        <Text style={NotificationScreenStyle.EventReminderTitle}>
          Reminder</Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          1. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          2. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={NotificationScreenStyle.EventTextInfo}>
          3. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <View style={NotificationScreenStyle.BreakLineContainer}>
          <Text style={NotificationScreenStyle.BreakLine}></Text>
          <Text style={NotificationScreenStyle.BreakLineComment}>Comment</Text>
        </View>

        <View style={NotificationScreenStyle.BespeakerCommentContainer}>
          <View style={NotificationScreenStyle.BespeakerImgContainer}>
            <Image
              style={NotificationScreenStyle.BespeakerImg}
              source={require('../assets/img/EveryNation.png')}
            />
          </View>
            <View style={NotificationScreenStyle.BespeakerContainer}>
              <Text style={NotificationScreenStyle.BespeakerName}>Aegon Targaryen</Text>
              <Text style={NotificationScreenStyle.BespeakerComment}>I guess it would be good to go here after finding out
                something about myself.</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <SimpleLineIcons name="options" size={24} color="black" style={NotificationScreenStyle.CommentInfo}/>
            </TouchableOpacity>
          </View>          

        <View style={NotificationScreenStyle.BespeakerCommentContainer}>
          <View style={NotificationScreenStyle.BespeakerImgContainer}>
            <Image
              style={NotificationScreenStyle.BespeakerImg}
              source={require('../assets/img/EveryNation.png')}
            />
          </View>
            <View style={NotificationScreenStyle.BespeakerContainer}>
              <Text style={NotificationScreenStyle.BespeakerName}>Sansa Stark</Text>
              <View style={NotificationScreenStyle.BespeakerInput}>
              <TextInput style={NotificationScreenStyle.MyCommentInput} placeholder=' Write a comment..'>
              </TextInput>
              <TouchableOpacity>
                <Ionicons name="send" size={24} color="black" style={NotificationScreenStyle.SendComment}/>
              </TouchableOpacity>
              </View>
            </View>
          </View>          
        </View>

        <View style={NotificationScreenStyle.AttendingContainer}>
          <TouchableOpacity style={NotificationScreenStyle.AttendingBtn}
            onPress={() => setModalAttendingVisible(true)}>
            <Text style={NotificationScreenStyle.AttendingTextBtn}>I'm attending!</Text>
          </TouchableOpacity>
        </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAttendingVisible}
        onRequestClose={() => {
          setModalAttendingVisible(!modalAttendingVisible);}}>
        <View style={NotificationScreenStyle.YoureSetView}>
          <View style={NotificationScreenStyle.YoureSetModalView}>
          <View>
            <Text style={NotificationScreenStyle.ModalText}>Youre all set!</Text>
          </View>
          <View>
          <Feather name="check-circle" size={55} color="black" />
          </View>
          <View style={NotificationScreenStyle.commentdateinfo}>
            <TouchableOpacity style={NotificationScreenStyle.ViewBtn}
              //onPress={() => navigation.navigate('')}
              >
            <Text style={NotificationScreenStyle.ViewTextBtn}>View ticket</Text>
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
        <View style={NotificationScreenStyle.CommentInfoView}>
          <View style={NotificationScreenStyle.DeleteModalView}>
              <TouchableOpacity style={NotificationScreenStyle.Icon}
                onPress={() => ('')}
                >
                <MaterialIcons name="delete-outline" size={24} color="black" />
                <Text style={NotificationScreenStyle.DeleteTextBtn}>Delete</Text>
              </TouchableOpacity>
              <View style={NotificationScreenStyle.CommentDateInfo}>
                <FontAwesome5 name="clock" size={24} color="black" style={NotificationScreenStyle.Icon}/>
                <Text style={NotificationScreenStyle.CommentDate}>Sunday, November 9  12:00PM</Text>
              </View>
          </View>
        </View>
      </Modal>
      </ScrollView>
    );
  }

export default {
    NotificationScreen,
    NotificationDetailScreen
}