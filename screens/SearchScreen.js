import React, { Component } from "react";
import {
  TextInput, 
  Text, 
  View
} from 'react-native';

import SearchScreenStyle from "../styles/SearchScreenStyle";
import SystemStyle from "../styles/SystemStyle";

import { 
  Feather,
} from '@expo/vector-icons';

import SearchContent from "../components/SearchContent";

class SearchScreen extends Component {
  state = {
    _search_key: null,
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
          <TextInput style={SearchScreenStyle.SearchBar} placeholder=' Search Bespeak... '
            selectionColor={'#eb9834'}
            onChangeText = {text => {
              this._handleText(text);
            }}/>
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