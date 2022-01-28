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
  import BottomSheet from 'react-native-gesture-bottom-sheet';
  
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

  function HomeScreen({ navigation }) {
    const bottomSheet = useRef();
    return (
      <View style={homeStyles.container}>
        <View style={homeStyles.Homeheader}>
          <Text style={homeStyles.bespeaklogo}>bespeak</Text>
        </View>
      <ScrollView style={homeStyles.homecontent}>
  
        <TouchableOpacity style={homeStyles.feed}>
          <Image
          style={homeStyles.firstpic}
          source={require('../assets/img/A.jpg')}
          />
          <View style={homeStyles.eventInfoTab}>
            <Text style={homeStyles.eventTitlecontent}>Not Bad Sunday</Text>
            <Text style={homeStyles.eventDTRcontent}>Sunday, November 14 ∘ 12:00PM</Text>
            <Text style={homeStyles.eventLOCcontent}>Every Nation Campus</Text>
            <View style={homeStyles.GeoLocTabcontent}>
              <SimpleLineIcons name="location-pin" size={16} color="black"/>
              <Text style={homeStyles.feedcontent}>Bulacan, Bulacan</Text>
            </View>
          </View>
          <View style={homeStyles.eventOptionTabcontent}>
            <TouchableOpacity>
            <Ionicons name="share-social-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather name="bookmark" size={22} color="black" />
            </TouchableOpacity>
          </View>     
        </TouchableOpacity>
  
        <SafeAreaView style={styles.container}>
        <TouchableOpacity style={homeStyles.feed}
          onPress={() => bottomSheet.current.show()}>
          <Image
          style={homeStyles.secondpic}
          source={require('../assets/img/B.jpg')}
          />
          <View style={homeStyles.eventInfoTab}>
            <Text style={homeStyles.eventTitlecontent}>Sunday Worship Service</Text>
            <Text style={homeStyles.eventDTRcontent}>Sunday, November 14 ∘ 10:00AM</Text>
            <Text style={homeStyles.eventLOCcontent}>Every Nation Campus</Text>
            <View style={homeStyles.GeoLocTabcontent}>
              <SimpleLineIcons name="location-pin" size={16} color="black"/>
              <Text style={homeStyles.feedcontent}>Metro East, Pasig</Text>
            </View>
          </View>
          <View style={homeStyles.eventOptionTabcontent}>
            <TouchableOpacity>
            <Ionicons name="share-social-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather name="bookmark" size={22} color="black" />
            </TouchableOpacity>
          </View>     
        </TouchableOpacity>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={480}
          radius={35}>
        <View style={homeStyles.centeredView}>
          <View style={homeStyles.modalView}>
            <Image
              style={homeStyles.firstpiconmodal}
              source={require('../assets/img/B.jpg')}
            />
          <View style={homeStyles.eventInfoOnmodal}>
            <Text style={homeStyles.eventTitlecontentOnmodal}>Sunday Wordship Service</Text>
            <Text style={homeStyles.eventDesccontentOnmodal}>"Gago kaba?"</Text>
            <Text style={homeStyles.eventDesccontentOnmodal}>Content 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kunoContent 4 lines kuno</Text>
            <Text style={homeStyles.eventDescTagcontentOnmodal}>Bring your friends and classmates now!</Text>
            <TouchableOpacity style={homeStyles.eventTabOnmodal}
              onPress={() => navigation.navigate('NotificationDetailScreen')}>
              <Ionicons name="md-person" size={30} style={homeStyles.eventOrgIconOnmodal}/>
              <View style={homeStyles.notifCard}>
                <Text style={homeStyles.eventOrgOnmodal}>Dikta Studio</Text>
              </View>
            </TouchableOpacity>
            <Text style={homeStyles.eventDesccontentOnmodal}>Posted November 14, 2021</Text>
            <Text style={homeStyles.eventDesccontentOnmodal}>For All</Text>
            <View style={homeStyles.joinTabOnmodal}>
              <TouchableOpacity style={homeStyles.othersInOnmodal}
                onPress={() => navigation.navigate('')}> 
                <View style={homeStyles.rowimgOnmodal}>
                  <SimpleLineIcons name="location-pin" size={18} color="black" style={{marginTop:-4}}/>
                  <SimpleLineIcons name="location-pin" size={18} color="black" style={{marginTop:-4}}/>
                  <SimpleLineIcons name="location-pin" size={18} color="black" style={{marginTop:-4}}/>
                  <SimpleLineIcons name="location-pin" size={18} color="black" style={{marginTop:-4}}/>
                  <SimpleLineIcons name="location-pin" size={18} color="black" style={{marginTop:-4}}/>
                </View>
                <Text style={homeStyles.othersInTextOnmodal}>Name, Name and Other's are interested</Text>
              </TouchableOpacity>  
              <TouchableOpacity style={homeStyles.imInOnmodal}
                onPress={() => navigation.navigate('HomeDetailScreen')}
                >
                <Text style={homeStyles.imInTextOnmodal}>I'm Interested</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
        </BottomSheet>
      </SafeAreaView>
  
        <TouchableOpacity style={homeStyles.feed}
          onPress={() => navigation.navigate('HomeDetailScreen')}>
          <Image
          style={homeStyles.thirdpic}
          source={require('../assets/img/C.jpg')}
          />
          <View style={homeStyles.eventInfoTab}>
            <Text style={homeStyles.eventTitlecontent}>TITLE</Text>
            <Text style={homeStyles.eventDTRcontent}>Date n' Time∘</Text>
            <Text style={homeStyles.eventLOCcontent}>Event Organizer</Text>
            <View style={homeStyles.GeoLocTabcontent}>
              <SimpleLineIcons name="location-pin" size={16} color="black"/>
              <Text style={homeStyles.feedcontent}>Location</Text>
            </View>
          </View>
          <View style={homeStyles.eventOptionTabcontent}>
            <TouchableOpacity>
            <Ionicons name="share-social-outline" size={22} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
            <Feather name="bookmark" size={22} color="black" />
            </TouchableOpacity>
          </View>     
        </TouchableOpacity>
  </ScrollView>
  </View>
    );
  }
  
  function HomeDetailsScreen() {
    const bottomSheet = useRef();
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
          <Ionicons name="md-person" size={34} style={homeStyles.eventOrgIconOnmodal}/>
            <View style={homeStyles.notifCard}>
              <Text style={homeStyles.eventOrgName}>Every Nation Campus</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={homeStyles.FollowOrg}
            onPress={() => navigation.navigate('')}>
            <Text style={homeStyles.FollowOrgText}>Follow</Text>
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
          As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
        </Text>
        <Text style={homeStyles.homeDetailscontentAbout}>
          As much as we are all excited to regather, ENC is also
          commited in ensuring a safe worry-free Worship
          experience for you
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
          <TouchableOpacity 
          onPress={() => bottomSheet.current.show()}>
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
  
      <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={115}
          radius={35}>
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
      </BottomSheet>
  
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