import {StyleSheet} from 'react-native'

const homeStyles=StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
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
    frontpic: {
        width: 412,
        height:520,
    },
    footer:{
        backgroundColor: '#eb9834',
        padding: 46,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    button: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        height: 46,
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        color: '#fff',
        marginBottom:27,
    },
    buttonText:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Regular',
    },
    button2: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 46,
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 5,
    },
    buttonText2:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
    },
    SIcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    SItitleText:{
        marginTop: 23,
        fontSize: 35,
        color: '#000',
        fontFamily: 'RedHatDisplay-Medium',
        marginLeft: 40,
    },
    SIinput:{
        height: 41,
        borderBottomWidth: 1,
        marginLeft: 40,
        marginTop: 0,
        color: '#eb9834',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        marginRight: 40,
    },
    SIforgotpass:{
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 30,
        padding: 10,
        color: '#ccc',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 16,
    },
    SIbutton: {
        alignSelf: 'stretch',
        height: 46,
        backgroundColor: '#eb9834',
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        color: '#eb9834',
        margin: 60,
        alignItems: 'center',
    },
      SIbuttonText:{
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 20,
    },
    loginpicContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    loginpic: {
        marginBottom:10,
        width: 280,
        height:250,
        justifyContent:'center',
    },
    SIfooter:{
        backgroundColor: '#ebebeb',
        padding: 46,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexDirection:'row',
    },
    signup:{
        fontFamily: 'RedHatDisplay-Regular',
    },
    signupbtn:{
        color:'#eb9834', 
        fontFamily:'RedHatDisplay-Medium'
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
    ContinueAsbtncontainer:{
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#eb9834',
        flexDirection:'row',
        padding:10,
        marginTop:35,
        marginLeft:35,
        marginRight:35,
    },
    ContinueAsbtncontainerNotActive:{
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#f5f5f5',
        flexDirection:'row',
        padding:10,
        marginTop:35,
        marginLeft:35,
        marginRight:35,
    },
    IndivIcon:{
        padding:20,
        color:'#eb9834',
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        marginLeft:2,
    },
    OrgIconContainer:{
        padding:18,
        backgroundColor: '#f5f5f5',
        borderRadius: 40,
        marginLeft:2,
    },
    OrgIcon:{
        marginLeft:-1,
        width:28,
        height:28,
    },
    IndivCard:{
        color: '#000',
        alignItems:'stretch',
        justifyContent:'space-between',
        alignSelf:'center',
        marginLeft:10,
    },
    IndivTitle:{
        fontSize: 20,
        fontFamily:'RedHatDisplay-Medium',
        color: '#000',
    },
    IndivText:{
        fontSize: 13,
        fontFamily:'RedHatDisplay-Light',
        color: '#000',
    },
    capicContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    capic: {
        marginBottom:10,
        width: 280,
        height:250,
        justifyContent:'center',
    },
    SUfooter:{
        backgroundColor: '#ebebeb',
        padding: 46,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexDirection:'row',
    },
    signin:{
        fontFamily: 'RedHatDisplay-Regular',
    },
    signinbtn:{
        color:'#eb9834', 
        fontFamily:'RedHatDisplay-Medium'
    },

//ResendResetPW
    tabTitle:{
        fontFamily:'RedHatDisplay-Medium',
        marginLeft:10,
        fontSize: 24,
        color:'#eb9834',
        marginTop:-6,
    },
    Content:{
        paddingTop:170,
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    PhonepicContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    Phonepic: {
        marginBottom:10,
        width: 90,
        height:160,
        justifyContent:'center',
    },
    TitleContainer:{
        alignSelf:'center',
        margin:25
    },
    Titletxt:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:24,
    },
    ResetInfoContainer:{
        alignSelf:'center',
    },
    ResetInfotxt:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        alignSelf:'center'
    },
    Input:{
        height: 46,
        borderBottomWidth: 1,
        borderBottomColor:'#ddd',
        marginLeft: 40,
        marginTop: 10,
        color: '#eb9834',
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
        marginRight: 40,
    },
    ResendResetPWContainer:{
        alignSelf:'center',
        margin:30,
    },
    ResendResetPWbtn: {
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        width: 370,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResendResetPWbtntext:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    ResendPWEmailbtn: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResendPWEmailbtntext:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    }, 
//ResetPW
    ResetPWContent:{
        flex:1,
        backgroundColor:'#fff',
    },
    ResetPWContainer:{
        alignSelf:'center',
        margin:30,
    },
    ResetPWbtn: {
        marginBottom: 60,
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        width: 340,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    ResetPWbtntext:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },  


})

export default homeStyles;