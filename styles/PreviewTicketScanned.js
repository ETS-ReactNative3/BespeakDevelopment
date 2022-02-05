import {StyleSheet} from 'react-native'

const PreviewTicketScannedStyle=StyleSheet.create({
    TicketContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },    
    EventContainer:{
        marginTop:15,
        marginLeft:40,
        marginRight:40,
    },
    EventName:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:35,
        color:'#000',
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
    },
    EventStat:{
        marginLeft:40,
        marginRight:40,
    },
    EventStattxt:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:35,
        color:'#eb9834',
    },
    TicketPersonalInfo:{
        marginTop:15,
        marginLeft:40,
        marginRight:40,
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
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
        fontSize: 30,
    },
    sandboxtech:{
        fontSize:15,
        fontFamily: 'RedHatDisplay-Regular',
    },
    admitcontainer:{
        marginLeft:40,
        marginRight:40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    admitbtn: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 46,
        padding: 10,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 25,
    },
    admitbtntxt:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },


})

export default PreviewTicketScannedStyle;