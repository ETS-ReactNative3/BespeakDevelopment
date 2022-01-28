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
  
  import { auth } from '../firebase'

  function ProfileScreen({ navigation }) {
    return (
      <View style={homeStyles.uHcontainer}>
        <View style={homeStyles.Profileheader}/>
        <View style={homeStyles.profilecoverimgContainer}>
          <Image
          style={homeStyles.profilecoverimg}
          source={require('../assets/img/F.jpg')}
          />
          </View>
        <View style={homeStyles.firstSection}>
          <View style={homeStyles.profileimgContainer}>
            <Image
            style={homeStyles.profileimg}
            source={require('../assets/img/SecondPages.png')}
            />
          </View>
          <View>
          <TouchableOpacity style={homeStyles.EditProfile}
            onPress={() => navigation.navigate('ProfileDetailScreen')}>
            <Text style={homeStyles.EditProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={homeStyles.secondSection}>
          <Text style={homeStyles.ProfileName}>Second Pages</Text>
          <Text style={homeStyles.ProfileBio}>We are the source of low-priced unused, as well as previously-owned, books and bargain publications from the U.S., Canada, Australia and the UK. We are also a distributor of locally-printed slick Pinoy magazines in both English and Pilipino.</Text>
          <View style={{flexDirection:'row'}}>
            <SimpleLineIcons name="location-pin" size={13} color="black" />
            <Text style={homeStyles.ProfileLocation}> Market! Market! Mall,  26th Street Corner C5, Taguig</Text>
          </View>
        </View>
        <View style={homeStyles.dashboard}>
          <View style={homeStyles.counter}>            
            <Text style={homeStyles.counterint}>814</Text>
            <Text style={homeStyles.boardtextOne}>Followers</Text>
          </View>
          <View style={homeStyles.counter}>            
            <Text style={homeStyles.counterint}>26</Text>
            <Text style={homeStyles.boardtextTwo}>Following</Text>
          </View>
        </View>
        <ScrollView>
        <View style={homeStyles.MyTabsContainer}>
            <TouchableOpacity style={homeStyles.MyTabsSelect}>
            <Text style={homeStyles.MyTabs}>My Events</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>My Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>Bookmarks</Text>
            </TouchableOpacity>
        </View>
        <View style={homeStyles.createcard}>
          <TextInput style={homeStyles.createCardcontent} placeholder="Create event "></TextInput>
          <Feather name="plus" size={50} style={homeStyles.cardicon}/>
        </View>
  
        <View style={homeStyles.MyTabsContainer}>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>My Events</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.MyTabsSelect}>
            <Text style={homeStyles.MyTabs}>My Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>Bookmarks</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity>
        <View style={homeStyles.MyTicketStub}> 
        <View style={homeStyles.MyTicketStubDiv}>
          <View>
          <Text style={homeStyles.MyTicketEvent}>Sunday Worship Service</Text>
          <Text style={homeStyles.MyTicketDate}>Sunday November 14 Starts at 9:00AM </Text>
  
          <Text style={homeStyles.MyTicketOrganizer}>Sunday Worship Service</Text>
          <Text style={homeStyles.MyTicketLocation}>L3 Alpha Kokak</Text>
          </View>
          <View style={homeStyles.MyTicketQRContainer}>
              <Image
                  style={homeStyles.MyTicketQR}
                  source={require('../assets/img/SampleQR.png')}
              />
              </View>
        </View>
        </View>
        </TouchableOpacity>
  
        <View style={homeStyles.MyTabsContainer}>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>My Events</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={homeStyles.MyTabs}>My Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={homeStyles.MyTabsSelect}>
            <Text style={homeStyles.MyTabs}>Bookmarks</Text>
            </TouchableOpacity>
        </View>
  
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
            <MaterialIcons name="bookmark" size={22} color="black" />
            </TouchableOpacity>
          </View>     
        </TouchableOpacity>
  
  
      </ScrollView>
    </View>
    );
  }
  
  function ProfileDetailScreen() {
    return (
      <View style={homeStyles.detailsScreencontainer}>
          <View style={homeStyles.editProfileheader}>
            <Text style={homeStyles.tabTitle}>Edit Profile</Text>
            <Text style={homeStyles.tabSave}>Save</Text>
          </View>
          <TouchableOpacity>
          <View style={homeStyles.editprofilecoverimgContainer}>
          <Feather name="plus" size={50} style={homeStyles.editcoverimg}/>
          <Image
            style={homeStyles.editprofilecoverimg}
            source={require('../assets/img/F.jpg')}
            />
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <View style={homeStyles.firstSection}>
          <View style={homeStyles.editprofileimgContainer}>
          <Feather name="plus" size={50} style={homeStyles.editimg}/>
            <Image
            style={homeStyles.editprofileimg}
            source={require('../assets/img/SecondPages.png')}
            />
          </View>
        </View>
        </TouchableOpacity>
        <ScrollView>
        <Text style={homeStyles.Info}>Organization Name</Text>
        <TextInput style={homeStyles.Profileinput} placeholder='Second Pages'/>
        <Text style={homeStyles.Info}>Bio</Text>
        <TextInput style={homeStyles.Profileinput} placeholder='We are the source of low-priced unused, as well as previously-owned, books and bargain publications from the U.S., Canada, Australia and the UK. We are also a distributor of locally-printed slick Pinoy magazines in both English and Pilipino.'/>
        <Text style={homeStyles.Info}>Location</Text>
        <TextInput style={homeStyles.Profileinput} placeholder='Market! Market! Mall,  26th Street Corner C5, Taguig'/>
        <Text style={homeStyles.Info}>Email</Text>
        <TextInput style={homeStyles.Profileinput} placeholder='secondpages@gmail.com'/>
        <Text style={homeStyles.Info}>Phone Number</Text>
        <TextInput style={homeStyles.Profileinput} placeholder='+639123456789'/>
        <TouchableOpacity style={homeStyles.changepw}
          onPress = {() => {
            auth.signOut()
          }}>
          <Text style={homeStyles.changepwtxt}> Change Password</Text>
        </TouchableOpacity>
        </ScrollView>
        
      </View>
    );
  }

export default {
    ProfileScreen,
    ProfileDetailScreen
}