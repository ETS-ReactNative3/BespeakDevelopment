import React, { Component } from 'react';
import { TextInput,
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,} from 'react-native';

import SignUp from "../styles/SignUp";

import OutlineInput from 'react-native-outline-input';

import Validation from "../styles/Validation"

import { validateName, validateOrgName } from "../helper/TextValidate";

class SignUpNameFields extends Component {
    //#TODO: Optimized Implementation
        //Transfer the Whole form as the component.
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
                            <OutlineInput
                                label="Email"
                                activeValueColor="#eb9834"
                                activeBorderColor="#eb9834"
                                activeLabelColor="#eb9834"
                                passiveBorderColor="#ccc"
                                passiveLabelColor="#ccc"
                                passiveValueColor="#ccc"
                                fontFamily="RedHatDisplay-Regular"
                                height={46}
                                fontSize={18}
                            type='text'
                            id='first-name' 
                            name='firstname' 
                            maxLength = {26}
                            onChangeText = {text => this._handleText('f_name', text)}
                            returnKeyType="next"
                            onSubmitEditing={() => { this.txtLName.focus();}}
                            blurOnSubmit={false}
                            />
                        </SafeAreaView>
                        <Text style={Validation.textVal}>
                        {this.state.f_name.valid}</Text>     
                        <SafeAreaView style={SignUp.newlnameInput}>
                            <OutlineInput
                                label="Last Name"
                                activeValueColor="#eb9834"
                                activeBorderColor="#eb9834"
                                activeLabelColor="#eb9834"
                                passiveBorderColor="#ccc"
                                passiveLabelColor="#ccc"
                                passiveValueColor="#ccc"
                                fontFamily="RedHatDisplay-Regular"
                                height={46}
                                fontSize={18}
                            type='text'
                            id='last-name' 
                            name='lastname'
                            placeholder='Last Name'
                            maxLength = {26}
                            onChangeText = {text => this._handleText('l_name', text)}
                            ref={(input) => { this.txtLName = input; }}
                            />
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
                    <TextInput style={SignUp.SIinput}
                        type='text'
                        id='org_name' 
                        name='org_name' 
                        placeholder='Organization Name'
                        maxLength = {46}
                        onChangeText = {text => this._handleText('org_name', text)}/>
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