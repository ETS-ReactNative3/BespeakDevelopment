import {StyleSheet} from 'react-native'

const homeStyles=StyleSheet.create({
    SIcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    createEventheader:{
        paddingTop: 40,
        alignSelf: 'stretch',
        paddingBottom:10,
        borderBottomColor:'#f5f5f5',
        borderBottomWidth:1,
        flexDirection:'row'
    },
    goBack:{
        marginTop:6,
        marginLeft:20,
        width:15,
        height:15,
    },
    SItitleText:{
        marginTop: 10,
        fontSize: 35,
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
        marginLeft: 40,
    },
    SUAltText:{
        fontSize: 16,
        justifyContent: 'center',
        marginLeft: 40,
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        alignItems: 'center',
    },
    SIinput:{
        height: 46,
        borderBottomWidth: 1,
        marginLeft: 20,
        marginTop: 10,
        color: '#eb9834',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        marginRight: 20,
    },
    SIinputFocus: { 
        borderColor: '#719ECE',
    },
    altText:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20,
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    andText:{
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    btnText:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    continuebtn:{
        alignSelf: 'stretch',
        height: 46,
        backgroundColor: '#eb9834',
        padding: 10,
        borderRadius: 25,
        color: '#eb9834',
        marginTop:50,
        marginLeft: 20,
        marginRight: 20,
        marginBottom:20,
        alignItems: 'center',
    },
    continuebtntext: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 20,
    },
    LetsGetStartedpicContainer:{
        marginTop:80,
        alignItems:'center',
        justifyContent:'center',
    },
    loginpic: {
        marginBottom:10,
        width: 280,
        height:250,
        justifyContent:'center',
    },
    SUcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    SUtitleText:{
        marginTop: 10,
        fontSize: 35,
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
        marginLeft: 40,
    },
    SUAltText:{
        fontSize: 16,
        justifyContent: 'center',
        marginLeft: 20,
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: -20,
    },
    AlmostTherepicContainer:{

        alignItems:'center',
        justifyContent:'center',
    },
    AlmostTherepic: {
        width: 280,
        height:250,
        marginBottom:-30,
        justifyContent:'center',
    },
    tabTitle:{
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
        fontSize: 25,
        marginLeft:20,
    },    


})

export default homeStyles;