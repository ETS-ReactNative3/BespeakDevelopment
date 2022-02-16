import React, { Component } from 'react';
import {
    ScrollView, 
    TouchableOpacity, 
    Text, 
    View,
    Image,
    Pressable,
    TextInput
} from 'react-native';
import { 
    Feather,
    AntDesign,
    SimpleLineIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';
import * as ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';

import { auth, db, storage } from '../firebase'

import fetch_date_time from '../api/GlobalTime'

import CreateEventStyle from "../styles/CreateEventStyle.js";
import Validation from '../styles/Validation';
import SystemStyle from "../styles/SystemStyle";

import Properties from "../values/Properties"
import dateFormat from "../helper/DateFormat"

class EventScreen extends Component {
    render() {
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
            <View style={SystemStyle.NotifCard}>
              <Text style={SystemStyle.OrganizerName}>Every Nation Campus</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={SystemStyle.FollowOrgBtn}
            onPress={() => navigation.navigate('')}>
            <Text style={SystemStyle.FollowOrgTextBtn}>Followed</Text>
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
            </ScrollView>
        );
    }
}

export {
    EventScreen
}