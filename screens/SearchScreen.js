import React, { Component } from "react";
import {
  TextInput, 
  Text, 
  View
} from 'react-native';
import SearchScreenStyle from "../styles/SearchScreenStyle";
import { 
  Feather,
} from '@expo/vector-icons';

import SearchContent from "../components/SearchContent";

class SearchScreen extends Component {
  state = {
    _search_key: null,
    refreshing: false
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
            onChangeText = {text => {
              this._handleText(text);
            }}/>
        </View>
        
        <SearchContent refreshing = {this.state.refreshing} 
          search_key = {this.state._search_key}
          navigation = {this.props.navigation}/>
        
        <View style={SearchScreenStyle.Footer}>
          <Text style={SearchScreenStyle.BespeakLogo}>bespeak</Text>
          <Text style={SearchScreenStyle.FooterText}>© Sandbox Technologies.</Text>
        </View>
      </View> 
    );
  }
}
  
export default {
  SearchScreen
}