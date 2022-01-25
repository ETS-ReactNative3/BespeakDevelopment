import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';


const TransparentLoading = 
    <>
        <Spinner visible={true} textContent={'Please wait...'}
            textStyle={SpinnerStyle.defaultLoader}/>
    </>




  
export default {
    TransparentLoading
}