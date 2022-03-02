import {StyleSheet} from 'react-native'

const TicketScreenStyle=StyleSheet.create({
    //For Previewing Ticket in Full Screen
    Container: {
        flex: 1,
        backgroundColor: '#eb9834',
    },
    YourTicketContent:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    BespeakLogo:{
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 20,
    },
    EventTitle:{
        paddingTop: 5,
        color: "#fff",
        fontSize: 30,
        fontFamily: 'RedHatDisplay-Medium',
    },
    EventSched:{
        marginTop:-2,
        color: "#fff",
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
    },
    EventOrg:{
        paddingTop:10,
        color: "#fff",
        justifyContent: 'space-around',
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Regular',
    },
    EventLocation:{
        marginBottom:5,
        color: "#fff",
        justifyContent: 'space-around',
        fontSize: 15,
        fontFamily: 'RedHatDisplay-Light',
    },
    QRContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    QRImg: {
        padding:'3%',
        backgroundColor:'#fff',
        justifyContent:'center',
    },
    TicketOwner:{
        color: '#fff',
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 25,
    },
    RegistrationDate:{
        color: "#fff",
        fontSize: 16,
        fontFamily: 'RedHatDisplay-Regular',
    },
    EventDescriptionContainer:{
        marginTop:-30,
        marginLeft:'15%',
        marginRight:'15%',
        marginBottom:20,
        alignItems:'stretch',
        justifyContent:'flex-start',
    },
    EventDescriptionText:{
        color:'#fff',
        fontFamily:'RedHatDisplay-Regular',
    },
    Button:{
 alignItems: 'center',
        justifyContent:'center',
    },
    DoneBtn: {
        marginBottom: "10%",
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#fff',
        height: 40,
        width: 120,
        borderRadius: 25,
    },
    DoneTextBtn:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //For Ticket Stub in Menu Tab Navigator
    MyTicketStub:{
        margin:20,
        borderRadius:20,
        backgroundColor:'#eb9834',
        width: 370,
        height: 140,
    },
    MyTicketStubDiv:{
        margin: '5%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    MyTicketEvent:{
        color:'#fff',
        fontSize:23,
        fontFamily:'RedHatDisplay-Medium',
    },
    MyTicketDate:{
        color:'#fff',
        fontSize:15,
        marginBottom:10,
        fontFamily:'RedHatDisplay-Light',
    },
    MyTicketOrganizer:{
        color:'#fff',
        fontSize:20,
        fontFamily:'RedHatDisplay-Medium',
    },
    MyTicketLocation:{
        color:'#fff',
        fontSize:15,
        fontFamily:'RedHatDisplay-Light',
    },
    MyTicketQR:{
        borderRadius: 15,
        marginTop: '-2%',
        padding: '2.5%',
        backgroundColor:'#fff'
    },
    



})

export default TicketScreenStyle;