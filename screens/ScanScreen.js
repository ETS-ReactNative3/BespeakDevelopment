'use strict';

import React, { Component } from "react";
import {
    AppRegistry,
    Alert,
    Text,
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay/lib";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import ScanScreenStyle from "../styles/ScanScreenStyle";
import SystemStyle from "../styles/SystemStyle";

import { _fetchScannedData } from "../helper/ScanHelper";

class ScanScreen extends Component {
    state = {
        is_verifying: false
    }
    constructor() {
        super();

        this.Scanner = React.createRef();
    }

    onSuccess = async e => {     
        try {
            this.setState({is_verifying: true});

            let _data = JSON.parse(e.data)
            console.log('QR Result: ', _data);
            let _content = await _fetchScannedData(_data);
            let _result = []

            if(_content == 104) {
                _result = ['Invalid bespeak QR', 'Please make sure that the ticket is from bespeak.'];
            } else if(_content == 103) {
                _result = ['Not found on bespeak', 'Your ticket or the event you are attending may have been removed.'];
            } else if(_content == 102) {
                _result = ['Restricted access', 'You have no access to this information.'];
            }

            this.setState({is_verifying: false});

            if(_result.length > 0) {
                Alert.alert(_result[0], _result[1]);
                return;
            }

            this.props.navigation.navigate('AdmitScreen', {content: _content});
        } catch (ex) {
            Alert.alert('Error!', 'Please try again. Showing error on logs...');
            console.log('Error: ', ex);
        }

        this.setState({is_verifying: false});
    };

    render() {
        return (
            <>
                { this.state.is_verifying && 
                    <Spinner visible={true} textContent={'Checking...'}
                        textStyle={SystemStyle.defaultLoader}
                        animation = 'fade'
                        overlayColor = 'rgba(0, 0, 0, 0.50)'/>
                }

                <QRCodeScanner
                    ref = {(ref) => {this.Scanner = ref}}
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    reactivate = {true}
                    reactivateTimeout = {5000}
                    topContent={
                        <Text style={ScanScreenStyle.ScanText}>Scan a bespeak QR code</Text>
                    }/>
            </>
        );
    }
}

AppRegistry.registerComponent('default', () => ScanScreen);
export default ScanScreen;