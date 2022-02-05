import React, { Component } from 'react';
import { TextInput,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView } from 'react-native';
import { InputOutline, InputStandard } from 'react-native-input-outline';

import SignUpStyle from "../styles/SignUpStyle";

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
                    <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="First Name"
                            characterCount = {26}
                            onChangeText = {text => this._handleText('f_name', text)}
                            {...Properties.defaultInputOutline}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.txtLname.focus(); }}
                            blurOnSubmit={false}/> 
                    </SafeAreaView>
                    {this.state.f_name.valid ?
                        <Text style={Validation.textVal}>
                            {this.state.f_name.valid}</Text>
                    : null}
                    <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="Last Name"
                            characterCount = {26}
                            onChangeText = {text => this._handleText('l_name', text)}
                            {...Properties.defaultInputOutline}
                            returnKeyType="done"
                            onSubmitEditing = {() => { this._handleChildSubmit(); }}
                            blurOnSubmit = {false}
                            ref={(input) => { this.txtLname = input; }}/>
                    </SafeAreaView>
                    {this.state.l_name.valid ?
                        <Text style={Validation.textVal}>
                            {this.state.l_name.valid}</Text>
                    : null}
                    <TouchableOpacity style={SignUpStyle.ContinueBtn}
                        onPress={() => this._handleChildSubmit()}>
                            <Text style={SignUpStyle.ContinueTextBtn}>Continue</Text>
                    </TouchableOpacity>                 
                </>
            );
        } else {
            return (
                <>
                    <SafeAreaView style={SignUpStyle.InputOutlineContainer}>
                        <InputOutline placeholder="Organization Name"
                            characterCount = {46}
                            onChangeText = {text => this._handleText('org_name', text)}
                            {...Properties.defaultInputOutline}
                            returnKeyType = "done"
                            onSubmitEditing = {() => { this._handleChildSubmit(); }}
                            blurOnSubmit = {false}/> 
                    </SafeAreaView>
                    <Text style={Validation.textVal}>
                        {this.state.org_name.valid}</Text>     
                    <TouchableOpacity style={SignUpStyle.ContinueBtn}
                        onPress={() => this._handleChildSubmit()}>
                            <Text style={SignUpStyle.ContinueTextBtn}>Continue</Text>
                    </TouchableOpacity>
                </>
            );
        }
    }
}

export default SignUpNameFields;