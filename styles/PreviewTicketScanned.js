import {StyleSheet} from 'react-native'

const PreviewTicketScannedStyle=StyleSheet.create({
    TicketContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },    
    EventContainer:{
        marginTop:'4%',
        marginLeft:'10%',
        marginRight:'10%',
    },
    EventName:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:35,
        color:'#000',
        width:'75%',
    },
    EventDate:{
        fontFamily:'RedHatDisplay-Regular',
        fontSize:16,
        color:'#000',
    },
    EventOrganizer:{
        color:'#eb9834',
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
    },
    TicketLocContainer:{
        flexDirection:'row',
        marginTop:2,
    },
    EventLocation:{
        marginTop:-1,
        fontSize:14,
        fontFamily:'RedHatDisplay-Light',
    },
    imgContainer: {
        alignItems:'center',
        padding:15,
    },
    imgscan: {
        width: 260,
        height: 260,
        borderRadius: 150
    },
    EventStat:{
        marginLeft: '10%',
        marginRight: '10%',
    },
    EventStattxt:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:35,
        color:'#eb9834',
    },
    TicketPersonalInfo:{
        marginTop: '3%',
        marginLeft: '10%',
        marginRight: '10%',
        opacity: .6
    },
    PersonName:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:25,
        color:'#000',
    },
    PersonEmail:{
        fontFamily:'RedHatDisplay-Regular',
        fontSize:15,
        color:'#000',
    },
    DateRegistered:{
        marginTop:1,
        fontFamily:'RedHatDisplay-Regular',
        fontSize:15,
        color:'#000',
    },
    ticketfooter:{
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    bespeaklogo:{
        marginTop:'1%',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
        fontSize: 30,
    },
    sandboxtech:{
        fontSize:15,
        fontFamily: 'RedHatDisplay-Regular',
    },
    AdmitContainer:{
        marginHorizontal: '10%',
        marginBottom: '3%',
        zIndex: -1, //pacheck neto pre mamats
    },
    AdmitBtn: {
        marginTop:'4%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eb9834',
        height: 46,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
    },
    AdmitTextBtn:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //For Not Today Sched
    WhyAreYouHere: {
        marginTop:-2,
        alignItems: 'center',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: '#fff',
        borderColor:'#eb9834',
        borderWidth: 2,
        height: 40,
        borderRadius: 25,
        flexDirection:'row'
      },
    WhyAreYouStillHere:{
        marginTop: -2,
        marginLeft:'2%',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
      },
      


})

export default PreviewTicketScannedStyle;