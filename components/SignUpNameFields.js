import React, { Component } from 'react';
import { TextInput, View, Text, Alert} from 'react-native';

import SignUp from "../styles/SignUp";
import Validation from "../styles/Validation"

import { validateName, validateOrgName } from "../helper/TextValidate";

class SignUpNameFields extends Component {
    //#TODO: Optimized Implementation
        //Transfer the Whole form as the component.
    state = {
        l_name: '',
        f_name: '',
        org_name: '', 
        val_l_name: '',
        val_f_name: '',
        val_org_name: '',
    }
    _handleText (key, value) {
        if(validateName(value) ||
            (validateOrgName(value) && key == 'org_name')) {
                this.setState({[key]: value});
                this.props.handleTextValue(key, value);
                key = 'val_'.concat(key)
                this.setState({[key]: false});
        } else {
            let val_msg = ''
            if(value == '') {
                val_msg = 'This field is required.';
            } else {
                val_msg = 'Invalid name.'
            }
            this.props.handleTextValue(key, false);
            key = 'val_'.concat(key)
            this.setState({[key]: val_msg});
        }
    }
    render () {
        if(this.props.USER_TYPE == 'INDIV') {
            return (
                <View>
                    <TextInput style={SignUp.SIinput}
                        type='text'
                        id='first-name' 
                        name='firstname' 
                        placeholder='First Name'
                        maxLength = {26}
                        onChangeText = {text => this._handleText('f_name', text)}/>
                    <Text style={Validation.textVal}>
                        {this.state.val_f_name}</Text>     
                    <TextInput style={SignUp.SIinput}
                        type='text'
                        id='last-name' 
                        name='lastname'
                        placeholder='Last Name'
                        maxLength = {26}
                        onChangeText = {text => this._handleText('l_name', text)}/> 
                    <Text style={Validation.textVal}>
                        {this.state.val_l_name}</Text>                 
                </View>
            );
        } else {
            return (
                <View>
                    <TextInput style={SignUp.SIinput}
                        type='text'
                        id='org_name' 
                        name='org_name' 
                        placeholder='Organization Name'
                        maxLength = {46}
                        onChangeText = {text => this._handleText('org_name', text)}/>
                    <Text style={Validation.textVal}>
                        {this.state.val_org_name}</Text>     
                </View>
            );
        }
    }
}

export default SignUpNameFields;