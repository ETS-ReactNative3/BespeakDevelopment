import React, { Component } from "react";
import {
    TextInput, 
    Alert, 
    View,
    TouchableOpacity
} from 'react-native';
import { 
    Feather,
    MaterialIcons
} from '@expo/vector-icons';

import SearchScreenStyle from "../styles/SearchScreenStyle";

import SearchContent from "../components/SearchContent";

class SearchScreen extends Component {
    state = {
        _raw_key: false,
        _search_key: false,
        refreshing: false
    }
    componentDidMount() {
        let direct = this.props.route.params.direct;
        console.log('Direct in Search Screen: ', direct);
        
        if(direct?.event) {
            this.props.navigation.navigate('EventScreen', {event_id: direct.event});
        } else if(direct?.user) {
            this.props.navigation.navigate('UserProfileScreen', {user_id: direct.user});
        }
    }
    _handleText(value) {
        if(value == '')
            value = false;
        this.setState({_raw_key: value});
    } 
    _handleSubmit() {
        let value = this.state._raw_key;
        this.setState({refreshing: true})
        setTimeout(() => {
            this.setState({_search_key: value, refreshing: false});
        }, 100);
    }
    render() {
        return (
            <View style={SearchScreenStyle.Container}>
                <View style={SearchScreenStyle.CardSearchInHeader}> 
                    <Feather name="search" size={24} style={SearchScreenStyle.SearchBarIcon}/>
                    <TextInput style={SearchScreenStyle.SearchBar} placeholder='Search Bespeak... '
                        value = {this.state._raw_key ? this.state._raw_key : null}
                        selectionColor={'#eb9834'}
                        onChangeText = {text => this._handleText(text)}
                        onSubmitEditing={() => this._handleSubmit() }/>

                    { this.state._search_key &&
                        <TouchableOpacity style={SearchScreenStyle.SearchClear} 
                            onPress = {() => {
                                this.setState({refreshing: true})
                                setTimeout(() => {
                                    this.setState({
                                        _raw_key: false,
                                        _search_key: false,
                                        refreshing: false
                                    })
                                }, 100);
                            }}>
                            <MaterialIcons name="clear" size={22} color="black"/>
                        </TouchableOpacity>
                    }
                </View>

                <SearchContent refreshing = {this.state.refreshing} 
                    search_key = {this.state._search_key}
                    navigation = {this.props.navigation}/>
            </View> 
        );
    }
}
  
export default {
  SearchScreen
}