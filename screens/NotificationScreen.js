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
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    FontAwesome5,
    MaterialIcons,
  } from '@expo/vector-icons';
  import A from "../assets/img/A.jpg";

  function NotificationScreen({ navigation }) {
    return (
      <ScrollView style={homeStyles.notifcontent}>
      <Text style={homeStyles.notifDates}>Today</Text>
        
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>a minute ago.</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>an hour ago.</Text>
        </View>
      </TouchableOpacity>
  
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>6 hours ago.</Text>
        </View>
      </TouchableOpacity>
      <Text style={homeStyles.notifDates}>Earlier</Text>
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>a day ago.</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>Sunday at 1:00PM</Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={homeStyles.notifTab}
        onPress={() => navigation.navigate('NotificationDetailScreen')}>
        <View style={homeStyles.notifimgContainer}>
          <Image
          style={homeStyles.notifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
        <View style={homeStyles.notifCard}>
          <Text style={homeStyles.notifContentName}>Every Nation Campus</Text>
          <Text style={homeStyles.notifContentPost}>Created a new event! Find out whats new!</Text>
          <Text style={homeStyles.notifContentTime}>Nov 10 at</Text>
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
      <View style={homeStyles.homeDetailsContainer}>
        <View style={homeStyles.picContainerOncontent}>
          <Image
            style={homeStyles.picOncontent}
            source={require('../assets/img/B.jpg')}
            />
        </View>
        <View style={homeStyles.homeDetailscontent}>
        <Text style={homeStyles.homeDetailscontentTitle}>Sunday Worship Service</Text>
        <View style={homeStyles.eventOrgOnContainerContent}>
          <TouchableOpacity style={homeStyles.eventTabOnmodal}
            onPress={() => navigation.navigate('NotificationDetailScreen')}>
          <View style={homeStyles.fullnotifimgContainer}>
          <Image
          style={homeStyles.fullnotifimg}
          source={require('../assets/img/EveryNation.png')}
          />
        </View>
            <View style={homeStyles.notifCard}>
              <Text style={homeStyles.eventOrgName}>Every Nation Campus</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyles.FollowOrg}
            onPress={() => navigation.navigate('')}>
            <Text style={homeStyles.FollowOrgText}>Followed</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={{flexDirection:'row'}}>
            <Feather name="calendar" size={24} color="black" />
            <Text style={homeStyles.homeDetailscontentOnTime}>Sunday, November 14 ∘ Starts at 12:00PM</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <SimpleLineIcons name="location-pin" size={24} color="black" />
            <Text style={homeStyles.homeDetailscontentOnLocation}>L3 Robinsons MetroEast Barangay, Pasig, 1800, Metro Manila, Philippines</Text>
          </View>
        </View>
      </View>
      </View>
      <View>
        <Text style={{borderTopWidth: 1, borderColor:'#000', opacity:0.1,marginTop:-20,}}></Text>
      </View>
      <View>
      <View style={homeStyles.homeDetailsabtcontent}>
        <Text style={homeStyles.homeDetailsAbout}>
          About</Text>
        <Text style={homeStyles.homeDetailscontentAbout}>
          As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={homeStyles.homeDetailscontentAbout}>
          ENC adheres to the safety protocols and guidelines issued by
          the Government during pandemic. In compliance to this,
          membres who wish to worship onsite must be FULLY
          VACCINATED
        </Text>
        <Text style={homeStyles.homeDetailscontentAbout}>
          If fully vaccinated, please proceed to our online registration to
          secure a seat.
        </Text>
        <Text style={homeStyles.homeDetailsReminder}>
          Reminder</Text>
        <Text style={homeStyles.homeDetailscontentReminder}>
          1. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={homeStyles.homeDetailscontentReminder}>
          2. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={homeStyles.homeDetailscontentReminder}>
          3. As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <View style={homeStyles.hrtextcontainer}>
          <Text style={homeStyles.hrline}></Text>
          <Text style={homeStyles.hrtext}>Comment</Text>
        </View>
        <View style={homeStyles.commentBlock}>
          <MaterialCommunityIcons name="face-profile" size={40} color="black" />
            <View style={homeStyles.commentTab}>
              <Text style={homeStyles.commentName}>Aegon Targaryen</Text>
              <Text style={homeStyles.commentsays}>I guess it would be good to go here after finding out
                something about myself.</Text>
            </View>
          <SimpleLineIcons name="options" size={24} color="black" style={homeStyles.commentInfo}/>
          </View>
          <View style={homeStyles.commentBlock}>
          <MaterialCommunityIcons name="face-profile" size={40} color="black" />
            <View style={homeStyles.commentTab}>
              <Text style={homeStyles.commentName}>Daenarys</Text>
              <Text style={homeStyles.commentsays}>Feld bad might burn
                a city later, idk.</Text>
            </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SimpleLineIcons name="options" size={24} color="black" style={homeStyles.commentInfo}/>
          </TouchableOpacity>
          </View>
          <View style={homeStyles.MYcommentBlock}>
          <MaterialCommunityIcons name="face-profile" size={40} color="black" />
            <View style={homeStyles.commentTab}>
              <Text style={homeStyles.commentName}>Sansa Stark</Text>
              <View style={{flexDirection:'row'}}>
              <TextInput style={homeStyles.MYcommentsays} placeholder='Write a comment'></TextInput>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="send" size={24} color="black" style={homeStyles.commentInfo}/>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={homeStyles.attendingtab}>
          <TouchableOpacity style={homeStyles.attendingbutton}
            onPress={() => setModalAttendingVisible(true)}>
            <Text style={homeStyles.attendingtext}>I'm attending!</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAttendingVisible}
        onRequestClose={() => {
          setModalAttendingVisible(!modalAttendingVisible);}}>
        <View style={homeStyles.youresetView}>
          <View style={homeStyles.youresetmodalView}>
          <View>
            <Text style={homeStyles.modaltxt}>Youre all set!</Text>
          </View>
          <View>
          <Feather name="check-circle" size={55} color="black" />
          </View>
          <View style={homeStyles.commentdateinfo}>
            <TouchableOpacity style={homeStyles.okaybtn}
              //onPress={() => navigation.navigate('')}
              >
            <Text style={homeStyles.okaybtntext}>View ticket</Text>
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
        <View style={homeStyles.centeredView}>
          <View style={homeStyles.deletemodalView}>
              <TouchableOpacity style={homeStyles.deletebutton}
                onPress={() => ('')}
                >
                <MaterialIcons name="delete-outline" size={24} color="black" />
                <Text style={homeStyles.deleteText}>Delete</Text>
              </TouchableOpacity>
              <View style={homeStyles.commentdateinfo}>
                <FontAwesome5 name="clock" size={24} color="black" style={homeStyles.deletebutton}/>
                <Text style={homeStyles.commentdate}>Sunday, November 9  12:00PM</Text>
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