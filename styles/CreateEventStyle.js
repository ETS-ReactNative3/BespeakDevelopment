
import {StyleSheet} from 'react-native'

const CreateEventStyle=StyleSheet.create({
    ScreenContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    FormContainer: {
        marginTop: '3%',
        marginLeft: '3%',
        marginRight: '3%',
    },
    CreateEventFormHeader: {
        paddingTop: 20,
        alignSelf: 'stretch',
        paddingBottom:10,
        borderBottomColor:'#f5f5f5',
        borderBottomWidth:1,
        fontFamily:'RedHatDisplay-Medium',
        fontSize:30,
    },
    AddBannerContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    AddImageIcon: {
        color: '#000', 
        fontSize: 20,
        alignItems:'center',
        position:'absolute',
    },
    AddBannerImg: {
        marginBottom:10,
        width: 368,
        height:150,
        justifyContent:'center',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius: 10,
    },
    FormField: {
        marginTop: '3%'
    },
    createeventcontainer:{
        margin:20,
    },
    CreateEventNamecontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    CreateEventIcon:{
        color:'#000',
        opacity: .5
    },
    CreateEventNameField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    CreateEventSchedcontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },

    CreateEventSchedField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 12,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    CreateEventLoccontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    CreateEventLocIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10
    },
    CreateEventLocField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    CreateEventMaxAttendcontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    CreateEventMaxAttendIcon:{
        opacity: .5,
        marginLeft:10,
        marginTop:10,
        width: 22,
    },
    CreateEventMaxAttendField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    CreateEventDesccontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    CreateEventDescIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10
    },
    CreateEventDescField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    CreateEventInfocontainer:{
        marginLeft: 20,
        marginRight: 20,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    CreateEventInfoIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10
    },
    CreateEventInfoField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: 20,
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    createeventbtn: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 46,
        padding: 10,
        marginLeft:20,
        marginRight:20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
        color: '#fff',
    },
    createeventtxt:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    
})

export default CreateEventStyle;