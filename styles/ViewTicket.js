import {StyleSheet} from 'react-native'

const ViewTicketStyle=StyleSheet.create({
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
        flexDirection:'row',
    },
    goBack:{
        marginLeft:20,
        width:15,
        height:15,
    },
    YourTickettxt:{
        fontFamily:'RedHatDisplay-Medium',
        marginLeft:10,
        fontSize: 24,
        color:'#eb9834',
        marginTop:-6,
    },
    TicketContent:{
        flex:1,
        backgroundColor:'#eb9834',
    },
    YourTicket:{
        flex:1,
        backgroundColor:'#eb9834',
        alignItems:'center',
        justifyContent:'center',
    },
    YourTicketContent:{
        alignItems:'center',
        justifyContent:'center',
    },
    bespeaklogoWhite:{
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 30,
    },
    eventTitlecontentWhite:{
        paddingTop: 5,
        color: "#fff",
        fontSize: 30,
        fontFamily: 'RedHatDisplay-Medium',
    },
    eventDTRcontentWhite:{
        marginTop:-2,
        color: "#fff",
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
    },
    eventLOCcontentWhite:{
        paddingTop:10,
        color: "#fff",
        justifyContent: 'space-around',
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Regular',
    },
    feedcontentWhite:{
        marginBottom:5,
        color: "#fff",
        justifyContent: 'space-around',
        fontSize: 15,
        fontFamily: 'RedHatDisplay-Light',
    },
    SampleQRpicContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    SampleQRpic: {
        width: 220,
        height:220,
        justifyContent:'center',
    },
    YourTicketContent:{
        alignItems:'center',
        justifyContent:'center',
    },
    NameOnTicketWhite:{
        marginTop:5,
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 25,
    },
    DateRegisteredWhite:{
        color: "#fff",
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
    },
    RefNumWhite:{
        marginTop:15,
        marginBottom:10,
        color: "#fff",
        justifyContent: 'space-around',
        fontSize: 15,
        fontFamily: 'RedHatDisplay-Light',
    },
    DetailscontentOnTicket:{
        marginTop:-30,
        marginLeft:60,
        marginRight:60,
        marginBottom:20,
        alignItems:'stretch',
        justifyContent:'flex-start',
    },
    contentDetailsOnTicket:{
        color:'#fff',
        fontFamily:'RedHatDisplay-Regular',
    },
    doneContainer:{
        alignItems:'center'
    },
    donebtn: {
        marginBottom: 60,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: 130,
        padding: 10,
        borderRadius: 25,
        justifyContent:'center',
    },
    donebtntext:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    },  



})

export default ViewTicketStyle;