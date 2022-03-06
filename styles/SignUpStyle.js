import {StyleSheet} from 'react-native'

const SignUpStyle=StyleSheet.create({
    //Sign Up Screen
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: '6%',
        marginHorizontal:'8%',
    },
    //PageGuide
    PageGuide:{
        fontSize: 35,
        marginBottom:'6%',
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
        marginLeft:'8%',
        marginRight:'8%',
    },
    GuideText:{
        fontSize: 17,
        marginTop:'-7%',
        marginBottom:'7%',
        justifyContent: 'center',
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        alignItems: 'center',
        marginLeft:'8%',
        marginRight:'8%',
    },
    //Text Input for Email and Password
    InputOutlineContainer:{
        marginTop:'4%',
        marginLeft:'8%',
        marginRight:'8%',
    },
    //Continue Buttons for SignUpForm
    ContinueBtn:{
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 48,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 15,
        marginLeft:'25%',
        marginRight:'25%',
        marginTop:'11%',
        marginBottom:80,
    },
    ContinueTextBtn: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
    },
    //Images
    LetsGetStartedImgContainer:{
        marginTop:'12%',
        alignItems:'center',
        justifyContent:'center',
    },
    LetsGetStartedImg: {
        marginBottom:10,
        width: 280,
        height:250,
        justifyContent:'center',
    },
    AlmostThereImgContainer:{
        marginTop: '-20%',
        alignItems:'center',
        justifyContent:'center',
        zIndex: -1, // works on ios
        elevation: -1,
    },
    AlmostThereImg: {
        width: 280,
        height:250,
        justifyContent:'center',
    },
    //Terms and Data Policy
    GreyText:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 17,
    },
    TextBtn:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    //Email Verification Screen
    TicketContainer:{
        flex:1,
        backgroundColor:'#eb9834',
        marginTop:'2%',
        marginLeft:'-15%',
        marginRight:'-15%'
    },
    Content:{
        flex:1,
        backgroundColor:'#eb9834',
        alignItems:'center',
        justifyContent:'center',
    },
    //Verify Email Image
    VerifyEmailImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    VerifyEmailImg: {
        justifyContent:'center',
    },
    //Email Verification Text
    MessageContent:{
        alignItems:'center',
        justifyContent:'center',
    },
    ContentTitle:{
        marginTop:5,
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 28,
        marginBottom: '4%',
    },
    ContentInfo:{
        color: "#fff",
        fontSize: 17,
        fontFamily: 'RedHatDisplay-Regular',
        width:370,
        textAlign:'center'
    },
    //Email Verification  Buttons
    LowerContainer:{
        alignItems:'center',
        marginBottom:'15%'
    },
    DoneBtn: {
        marginHorizontal:'4%',
        marginBottom: '4%',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: '85%',
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    DoneTextBtn:{
        marginTop: -2,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    },
    ResendBtn: {
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResendTextBtn:{
        marginTop: -2,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    TermsContainer: {
        backgroundColor: '#fff',
        paddingTop: '6%',
    },
    Background:{
        flexDirection:'row', 
        justifyContent:'center', 
        backgroundColor:'#fff'
    }


})

export default SignUpStyle;
