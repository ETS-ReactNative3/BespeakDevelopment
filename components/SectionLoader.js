import React, { Component } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect, Circle, } from "react-content-loader/native"

import SystemStyle from "../styles/SystemStyle";
import EditEventStyle from "../styles/EditEventStyle";
import ProfileScreenStyle from "../styles/ProfileScreenStyle";
import NotificationScreenStyle from "../styles/NotificationScreenStyle";
import TicketScreenStyle from '../styles/TicketScreenStyle';

class EventListLoader extends Component {
    render() {
        return(
            <>
                <View style={SystemStyle.CardContentLoader}>
                    <ContentLoader 
                        speed={4}
                        width={'100%'}
                        height={280}
                        backgroundColor="#cccccc"
                        foregroundColor="#ebebeb">
                            <Rect x="0" y="0" rx="20" width="100%" height="130" />
                            <Rect x="5%" y="150" rx="4" ry="4" width="50%" height="10"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Rect x="5%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Rect x="5%" y="250" rx="4" ry="4" width="30%" height="10"/>
                    </ContentLoader>
                </View>
                <View style={SystemStyle.CardContentLoader}>
                <ContentLoader 
                        speed={4}
                        width={'100%'}
                        height={280}
                        backgroundColor="#cccccc"
                        foregroundColor="#ebebeb">
                            <Rect x="0" y="0" rx="20" width="100%" height="130" />
                            <Rect x="5%" y="150" rx="4" ry="4" width="50%" height="10"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Rect x="5%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Rect x="5%" y="250" rx="4" ry="4" width="30%" height="10"/>
                    </ContentLoader>
                </View>  
                <View style={SystemStyle.CardContentLoader}>
                    <ContentLoader speed={4} width={'100%'} height={280}
                        backgroundColor="#cccccc" foregroundColor="#ebebeb">
                            <Rect x="0" y="0" rx="20" width="100%" height="130" />
                            <Rect x="5%" y="150" rx="4" ry="4" width="50%" height="10"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Rect x="5%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Rect x="5%" y="250" rx="4" ry="4" width="30%" height="10"/>
                    </ContentLoader>
                </View>  
            </>
        );
    }
}

class EventScreenLoader extends Component {
    render() {
        return(
            <View style={EditEventStyle.Container}>
            <ContentLoader 
                speed={4}
                width={'100%'}
                height={1000}
                backgroundColor="#cccccc"
                foregroundColor="#ebebeb">
                    <Rect x="0" y="0" width="100%" height="160" />
                    <Rect x="5%" y="190" rx="4" ry="4" width="65%" height="10"/>
                    <Circle cx="12%" y="220" cy="15" r="25" />
                    <Rect x="20%" y="232" rx="3" ry="3" width="20%" height="8"/>
                    <Rect x="5%" y="270" rx="3" ry="3" width="70%" height="6"/>
                    <Rect x="5%" y="290" rx="3" ry="3" width="30%" height="6"/>
                        
                    <Rect x="5%" y="340" rx="4" ry="4" width="20%" height="10"/>
                    <Rect x="5%" y="360" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="380" rx="3" ry="3" width="60%" height="6"/>
                    <Rect x="5%" y="400" rx="3" ry="3" width="25%" height="6"/>

                    <Rect x="5%" y="470" rx="4" ry="4" width="35%" height="10"/>
                    <Rect x="5%" y="490" rx="3" ry="3" width="85%" height="6"/>
                    <Rect x="5%" y="510" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="530" rx="3" ry="3" width="45%" height="6"/>
            </ContentLoader>
            </View>
        );
    }
}

class UserProfileLoader extends Component {
    render() {
        return (
            <View style={ProfileScreenStyle.Container}>
                <View style={ProfileScreenStyle.ProfileHeader}/>
                <ContentLoader 
                    speed={4}
                    width={'100%'}
                    height={1000}
                    backgroundColor="#cccccc"
                    foregroundColor="#ebebeb">
                        <Rect x="0" y="0" width="100%" height="145" />
                        <Circle cx="14%" y="110" cy="35" r="35" />
                        <Rect x="4%" y="210" rx="4" ry="4" width="35%" height="10"/>
                        <Rect x="4%" y="230" rx="3" ry="3" width="50%" height="6"/>
                        <Rect x="4%" y="250" rx="3" ry="3" width="65%" height="6"/>
                        <Rect x="4%" y="275" rx="3" ry="3" width="12%" height="6"/>
                        <Rect x="20%" y="275" rx="3" ry="3" width="12%" height="6"/>
                </ContentLoader>
            </View>   
        );
    }
}

class NotificationListLoader extends Component {
    render() {
        return (
            <View style={NotificationScreenStyle.Container}>
               <ContentLoader 
                    speed={4}
                    width={'100%'}
                    height={1000}
                    backgroundColor="#cccccc"
                    foregroundColor="#ebebeb">
                        <Circle cx="10%" y="0" cy="25" r="25" />
                        <Rect x="20%" y="0" rx="4" ry="4" width="45%" height="10"/>
                        <Rect x="20%" y="20" rx="3" ry="3" width="70%" height="6"/>
                        <Rect x="20%" y="35" rx="3" ry="3" width="20%" height="6"/>
                        <Circle cx="10%" y="60" cy="25" r="25" />
                        <Rect x="20%" y="60" rx="4" ry="4" width="45%" height="10"/>
                        <Rect x="20%" y="80" rx="3" ry="3" width="70%" height="6"/>
                        <Rect x="20%" y="95" rx="3" ry="3" width="20%" height="6"/>
                        <Circle cx="10%" y="120" cy="25" r="25" />
                        <Rect x="20%" y="120" rx="4" ry="4" width="45%" height="10"/>
                        <Rect x="20%" y="140" rx="3" ry="3" width="70%" height="6"/>
                        <Rect x="20%" y="155" rx="3" ry="3" width="20%" height="6"/>
                </ContentLoader>
           </View>
        );
    }
}

class TicketListLoader extends Component {
    render() {
        return(
            <View style={TicketScreenStyle.MyTicketStub}>
                <View style={TicketScreenStyle.MyTicketStubDiv}>
                    <ContentLoader 
                        speed={4}
                        width={'100%'}
                        height={100}
                        backgroundColor="#fff"
                        foregroundColor="#eb9834">
                            <Rect x="3%" y="0" rx="4" ry="4" width="45%" height="10"/>
                            <Rect x="3%" y="20" rx="3" ry="3" width="55%" height="6"/>
                            <Rect x="3%" y="50" rx="4" ry="4" width="35%" height="10"/>
                            <Rect x="3%" y="70" rx="3" ry="3" width="20%" height="6"/>
                    </ContentLoader>
                </View>
            </View>
        );
    }
}

export {
    EventListLoader,
    EventScreenLoader,
    UserProfileLoader,
    NotificationListLoader,
    TicketListLoader
};


