import React, { Component } from 'react';
import { TextInput,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView } from 'react-native';
import OutlineInput from 'react-native-outline-input';

import SignUp from "../styles/SignUp";

import Validation from "../styles/Validation"

import { validateName, validateOrgName } from "../helper/TextValidate";
import Properties from '../values/Properties';

class SignUpNameFields extends Component {
    //#TODO: Optimized Implementation
    state = {
        l_name: {value: '', valid: ''},
        f_name: {value: '', valid: ''},
        org_name: {value: '', valid: ''}, 
    }
    _handleText (key, value) {
        this.setState({[key]: {value: value, valid: ''}});
        if(validateName(value) ||
            (validateOrgName(value) && key == 'org_name')) {
                this.props.handleTextValue(key, value);
        } else {
            let val_msg = ''
            if(value == '') {
                val_msg = 'This is a required field.';
            } else {
                val_msg = 'Invalid name.'
            }
            this.setState({[key]: {value: value, valid: val_msg}});
        }
    }
    async _handleChildSubmit() {
        if(this.props.USER_TYPE == 'INDIV') {
            await this._handleText('f_name', this.state.f_name.value) 
            await this._handleText('l_name', this.state.l_name.value) 
        } else {
            await this._handleText('org_name', this.state.org_name.value) 
        }

        if(this.state.l_name.valid == '' &&
            this.state.f_name.valid == '' &&
            this.state.org_name.valid == '') {
                this.props.handleParentSubmit();
        } 
    }
    render () {
        if(this.props.USER_TYPE == 'INDIV') {
            return (
                <>
                    <SafeAreaView style={SignUp.newfnameInput}>
                        <OutlineInput label="First Name"
                            value = {this.state.f_name.value}
                            onChangeText = {text => this._handleText('f_name', text)}
                            maxLength = {26}
                            {...Properties.defaultTextBox}/>
                    </SafeAreaView>
                    <Text style={Validation.textVal}>
                        {this.state.f_name.valid}</Text>     
                    <SafeAreaView style={SignUp.newlnameInput}>
                        <OutlineInput label="Last Name"
                            value = {this.state.l_name.value}
                            onChangeText = {text => this._handleText('l_name', text)}
                            maxLength = {26}
                            {...Properties.defaultTextBox}/>
                    </SafeAreaView>
                    <Text style={Validation.textVal}>
                        {this.state.l_name.valid}</Text>
                    <TouchableOpacity style={SignUp.continuebtn}
                        onPress={() => this._handleChildSubmit()}>
                            <Text style={SignUp.continuebtntext}>Continue</Text>
                    </TouchableOpacity>                 
                </>
            );
        } else {
            return (
                <>
                    <SafeAreaView style={SignUp.newdefaultInput}>
                    <OutlineInput label="Organization Name"
                            value = {this.state.org_name.value}
                            onChangeText = {text => this._handleText('org_name', text)}
                            maxLength = {26}
                            {...Properties.defaultTextBox}/>
                    </SafeAreaView>
                    <Text style={Validation.textVal}>
                        {this.state.org_name.valid}</Text>     
                    <TouchableOpacity style={SignUp.continuebtn}
                        onPress={() => this._handleChildSubmit()}>
                            <Text style={SignUp.continuebtntext}>Continue</Text>
                    </TouchableOpacity>
                </>
            );
        }
    }
}

export default SignUpNameFields;