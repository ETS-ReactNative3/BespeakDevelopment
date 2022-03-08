import {StyleSheet} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const StartScreenStyle=StyleSheet.create({
    //StartScreen
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    //Start Screen Image
    FrontPic: {
        width: '100%',
        height:'72%',
    },
    Footer:{
        backgroundColor: '#eb9834',
        padding: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    //Log In Button
    LogIn: {
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        height: 46,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        color: '#fff',
        marginBottom:27,
    },
    LogInText:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Regular',
    },
    //Sign Up Button
    SignUp: {
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 46,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
    },
    SignUpText:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
    },
    //SignUpAsScreen
    SigningUpContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '6%',
        paddingLeft:'8%',
        paddingRight:'8%',
    },
    PageGuide:{
        fontSize: 35,
        marginBottom:'8%',
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Card Option
    Card:{
        color: '#000',
        alignItems:'stretch',
        justifyContent:'space-between',
        alignSelf:'center',
        marginLeft:'3.5%',
        marginRight:'25%',
    },
    OptionTitle:{
        fontSize: 20,
        fontFamily:'RedHatDisplay-Medium',
        color: '#000',
    },
    OptionText:{
        fontSize: 13,
        fontFamily:'RedHatDisplay-Light',
        color: '#000',
    },
    //Individual Button
    SignUpAsContainer:{
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#eb9834',
        flexDirection:'row',
        padding: '3%',
        marginBottom:'5%',
    },
    IndivIcon:{
        padding:20,
        color:'#eb9834',
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        marginLeft:2,
    },
    //Organization Button
    SignUpAsContainerNotActive:{
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#f5f5f5',
        flexDirection:'row',
        padding:'3%',
    },
    OrgIconContainer:{
        padding:'5.7%',
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        marginLeft:'1%',
    },
    OrgIcon:{
        marginLeft:-1,
        width:28,
        height:28,
    },
    //Sign Up Image
    SignUpImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    SignUpImg: {
        marginBottom:'1.5%',
        width: 280,
        height:250,
        justifyContent:'center',
    },
    //Footer For Log In
    LogInFooter:{
        backgroundColor: '#ebebeb',
        padding: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexDirection:'row',
        marginLeft:'-15%',
        marginRight:'-15%',  
    },
    LogInFooterText:{
        fontFamily: 'RedHatDisplay-Regular',
    },
    LogInFooterBtn:{
        color:'#eb9834', 
        fontFamily:'RedHatDisplay-Medium'
    },
    

})

export default StartScreenStyle;