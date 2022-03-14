import React, { Component } from 'react';
import { View } from 'react-native';
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

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
                            <Rect x="5%" y="150" rx="3" ry="3" width="50%" height="6"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Circle cx="7%" y="203" cy="10" r="10" />
                            <Rect x="11%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Circle cx="7%" y="243" cy="10" r="10" />
                            <Rect x="11%" y="250" rx="3" ry="3" width="25%" height="6"/>
                            <Circle cx="85%" y="243" cy="10" r="10" />
                            <Circle cx="92%" y="243" cy="10" r="10" />
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
                            <Rect x="5%" y="150" rx="3" ry="3" width="50%" height="6"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Circle cx="7%" y="203" cy="10" r="10" />
                            <Rect x="11%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Circle cx="7%" y="243" cy="10" r="10" />
                            <Rect x="11%" y="250" rx="3" ry="3" width="25%" height="6"/>
                            <Circle cx="85%" y="243" cy="10" r="10" />
                            <Circle cx="92%" y="243" cy="10" r="10" />
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
                            <Rect x="5%" y="150" rx="3" ry="3" width="50%" height="6"/>
                            <Rect x="5%" y="170" rx="3" ry="3" width="70%" height="6"/>
                            <Rect x="5%" y="190" rx="3" ry="3" width="44%" height="6"/>
                            <Circle cx="7%" y="203" cy="10" r="10" />
                            <Rect x="11%" y="210" rx="3" ry="3" width="20%" height="6"/>
                            <Circle cx="7%" y="243" cy="10" r="10" />
                            <Rect x="11%" y="250" rx="3" ry="3" width="25%" height="6"/>
                            <Circle cx="85%" y="243" cy="10" r="10" />
                            <Circle cx="92%" y="243" cy="10" r="10" />
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
                    <Rect x="0" y="0" width="100%" height="135" />
                    <Rect x="5%" y="160" rx="3" ry="3" width="70%" height="6"/>
                    <Circle cx="8%" y="185" cy="15" r="15" />
                    <Rect x="15%" y="195" rx="3" ry="3" width="20%" height="6"/>
                    <Circle cx="7%" y="220" cy="10" r="10" />
                    <Rect x="11%" y="227" rx="3" ry="3" width="55%" height="6"/>
                    <Circle cx="7%" y="243" cy="10" r="10" />
                    <Rect x="12%" y="250" rx="3" ry="3" width="70%" height="6"/>
                    <Rect x="12%" y="270" rx="3" ry="3" width="30%" height="6"/>
                        
                    <Rect x="5%" y="310" rx="3" ry="3" width="20%" height="6"/>
                    <Rect x="5%" y="330" rx="3" ry="3" width="70%" height="6"/>
                    <Rect x="5%" y="350" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="370" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="5%" y="400" rx="3" ry="3" width="80%" height="6"/>
                    <Rect x="5%" y="420" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="440" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="5%" y="460" rx="3" ry="3" width="15%" height="6"/>

                    <Rect x="5%" y="500" rx="3" ry="3" width="35%" height="6"/>
                    <Rect x="5%" y="520" rx="3" ry="3" width="70%" height="6"/>
                    <Rect x="5%" y="540" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="560" rx="3" ry="3" width="80%" height="6"/>
                    <Rect x="5%" y="580" rx="3" ry="3" width="80%" height="6"/>
                    <Rect x="5%" y="600" rx="3" ry="3" width="75%" height="6"/>
                    <Rect x="5%" y="620" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="5%" y="640" rx="3" ry="3" width="45%" height="6"/>

                    <Circle cx="7%" y="700" cy="15" r="15" />
                    <Rect x="12%" y="705" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="12%" y="718" rx="3" ry="3" width="65%" height="6"/>
                    <Circle cx="7%" y="750" cy="15" r="15" />
                    <Rect x="12%" y="755" rx="3" ry="3" width="50%" height="6"/>
                    <Rect x="12%" y="768" rx="3" ry="3" width="30%" height="6"/>
                    <Circle cx="7%" y="800" cy="15" r="15" />
                    <Rect x="12%" y="805" rx="3" ry="3" width="45%" height="6"/>
                    <Rect x="12%" y="818" rx="3" ry="3" width="80%" height="6"/>
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
                    <Rect x="4%" y="210" rx="3" ry="3" width="35%" height="6"/>
                    <Rect x="4%" y="230" rx="3" ry="3" width="50%" height="6"/>
                    
                    <Circle cx="7%" y="250" cy="10" r="10" />
                    <Rect x="11%" y="257" rx="3" ry="3" width="65%" height="6"/>

                    <Rect x="4%" y="280" rx="3" ry="3" width="12%" height="6"/>
                    <Rect x="20%" y="280" rx="3" ry="3" width="12%" height="6"/>
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


