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
    },
    goBack:{
        marginLeft:20,
        width:15,
        height:15,
    },
    SItitleText:{
        marginTop: 23,
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
        marginLeft: 40,
        marginTop: -5,
        color: '#eb9834',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        marginRight: 40,
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
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 48,
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        marginLeft:110,
        marginRight:110,
        marginTop:40,
        marginBottom:80,
    },
    continuebtntext: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
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
        marginTop: 23,
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
    AlmostTherepicContainer:{
        flex:1,
        marginTop:112,
        alignItems:'center',
        justifyContent:'center',
    },
    AlmostTherepic: {
        width: 280,
        height:250,
        justifyContent:'center',
    },
    


})

export default homeStyles;
