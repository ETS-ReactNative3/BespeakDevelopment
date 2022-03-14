import React, { Component } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect, Circle, } from "react-content-loader/native"

import SystemStyle from "../styles/SystemStyle";
import EditEventStyle from "../styles/EditEventStyle";
import ProfileScreenStyle from "../styles/ProfileScreenStyle";

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
                    <Rect x="5%" y="190" rx="4" ry="4" width="70%" height="10"/>
                    <Circle cx="8%" y="220" cy="15" r="15" />
                    <Rect x="15%" y="232" rx="3" ry="3" width="20%" height="6"/>
                    <Rect x="5%" y="260" rx="3" ry="3" width="70%" height="6"/>
                    <Rect x="5%" y="280" rx="3" ry="3" width="30%" height="6"/>
                        
                    <Rect x="5%" y="330" rx="4" ry="4" width="20%" height="10"/>
                    <Rect x="5%" y="360" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="390" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="5%" y="420" rx="3" ry="3" width="25%" height="6"/>

                    <Rect x="5%" y="470" rx="4" ry="4" width="35%" height="10"/>
                    <Rect x="5%" y="500" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="530" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="560" rx="3" ry="3" width="45%" height="6"/>
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

export {
    EventListLoader,
    EventScreenLoader,
    UserProfileLoader 
};


