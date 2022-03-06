import {StyleSheet} from 'react-native'

const LogInScreenStyle=StyleSheet.create({
    //LogInScreen, Forgot Password
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '6%',
    },
    //PageGuide
    PageGuide:{
        marginLeft:'8%',
        marginRight:'8%',
        fontSize: 35,
        marginBottom:'6%',
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Text Input for Email and Password
    InputStandardContainer:{
        marginTop:'3%',
        marginLeft:'8%',
        marginRight:'8%',
    },
    PassiveInputColor:{
        tintColor:'#eb9834',
        color:'#eb9834',
    },
    //Forgot Password Text Button
    ForgotPasswordBtn:{
        marginLeft:'8%',
        marginRight:'8%',
        marginTop: '2%',
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    //Log In Button
    LogInBtn: {
        marginLeft:'8%',
        marginRight:'8%',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent:'center',
        height: 46,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#fff',
        color: '#eb9834',
        backgroundColor: '#eb9834',
        marginTop:'13%',
        marginBottom:'20%',
    },
    LogInTextBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
        fontSize: 20,
    },
    //Log In Image
    LogInImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    LogInImg: {
        width: 280,
        height:250,
        justifyContent:'center',
    },
    //Footer For Sign Up
    SignUpFooter:{
        backgroundColor: '#ebebeb',
        padding: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexDirection:'row',
        marginLeft:'-15%',
        marginRight:'-15%',
    },
    SignUpFooterText:{
        fontFamily: 'RedHatDisplay-Regular',
    },
    SignUpFooterBtn:{
        color:'#eb9834', 
        fontFamily:'RedHatDisplay-Medium'
    },
    //Title Screen Page
    TitleContainer:{
        alignSelf:'center',
    },
    TitleTxt:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:24,
    },
    //Optional Text
    ResetInfoContainer:{
        alignSelf:'center',
    },
    ResetInfoTxt:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        alignSelf:'center'
    },

    //Reset Password Buttons
    ResetPWContent:{
        flex:1,
        backgroundColor:'#fff',
    },
    ResetPWContainer:{
        alignSelf:'center',
        margin:30,
    },
    ResetPassBtn: {
        marginBottom: 16,
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        width: 340,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResetPassTextBtn:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Reset Password
    ResetPassScreenContent:{
        paddingTop:'40%',
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    PhoneImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    PhoneImg: {
        marginBottom:'10%',
        width: 90,
        height:160,
        justifyContent:'center',
    },
    //Resend Email Button
    ResendPassEmailBtn: {
        marginBottom: 70,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResendPassEmailTextBtn:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    }, 

})

export default LogInScreenStyle;