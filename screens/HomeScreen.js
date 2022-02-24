import React, { Component } from "react";
import {
  TouchableOpacity,
  Text, 
  View,
} from 'react-native';
import { Root, 
    Popup, 
    Toast,
    SPSheet } from 'react-native-popup-confirm-toast'
import EventList from "../components/EventList";

import HomeScreenStyle from "../styles/HomeScreenStyle";

//For Example Bottom Sheet
const component = (props) => {
    //hook or class 
    return null;
    
    props.spSheet.hide();
};

//For Open Popup Confirm Messages
const bodyComponent = (props) => {

    return null;
    }


class HomeScreen extends Component {
    render() {
        return (
            <Root>
                <View style={HomeScreenStyle.Container}>
                    <View style={HomeScreenStyle.HomeHeader}>
                        <TouchableOpacity>
                                <Text style={HomeScreenStyle.BespeakLogo}>bespeak</Text>
                        </TouchableOpacity>

    <View>
        <TouchableOpacity
            onPress={() => {
                const spSheet = SPSheet;
                spSheet.show({
                    component: () => component({...this.props, spSheet}),
                    dragFromTopOnly: true,
                    onCloseComplete: () => {
                        alert('onCloseComplete');
                    },
                    onOpenComplete: () => {
                        alert('onOpenComplete');
                    },
                    height:260
                });
            }
            }>
            <Text>Example Bottom Sheet</Text>
        </TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity
            onPress={() =>
              Popup.show({
                type: 'success',
                timing: 3000,
                title: 'Dikkat!',
                textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                buttonText: 'Tamam',
                buttonEnabled: false,
                callback: () => Popup.hide()
              })
            }
        >
            <Text>Open Popup Message</Text>
        </TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity
            onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: 'Dikkat!',
                    textBody: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez. ',
                    buttonText: 'Tamam',
                    confirmText: 'Vazgeç',
                    callback: () => {
                        alert('Okey Callback && hidden');
                        Popup.hide();
                    },
                    cancelCallback: () => {
                        alert('Cancel Callback && hidden');
                        Popup.hide();
                    },
                })
            }
        >
            <Text>Open Popup Confirm Message</Text>
        </TouchableOpacity>
    </View>
    <View>
        <TouchableOpacity
            onPress={() => 
                  Toast.show({
                    title: 'Dikkat!',
                    text: 'Mutlak özgürlük, kendi başına hiçbir anlam ifade etmez.',
                    color: '#702c91',
                    timeColor: '#440f5f',
                    timing: 5000,
                    icon: null,
                    position: 'bottom',
                    })
                }
            >
                <Text>Open Toast</Text>
            </TouchableOpacity>
        </View>

    



                    </View>
                    
                    <EventList for_home = {true}
                        navigation = {this.props.navigation}/>
                </View>
            </Root>
        );
    }
}
  
export default {
    HomeScreen
}