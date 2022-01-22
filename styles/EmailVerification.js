import {StyleSheet} from 'react-native'

const homeStyles=StyleSheet.create({
    SIcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    createEventheader:{
        paddingTop: 20,
        alignSelf: 'stretch',
        paddingBottom:10,
        borderBottomColor:'#f5f5f5',
        borderBottomWidth:1,
        flexDirection:'row',
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
        fontSize: 28,
        marginBottom: 10,
    },
    DateRegisteredWhite:{
        color: "#fff",
        fontSize: 17,
        fontFamily: 'RedHatDisplay-Regular',
        width:370,
        textAlign:'center'
    },
    doneContainer:{
        alignItems:'center',
    },
    donebtn: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        width: 380,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    donebtntext:{
        marginTop: -2,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
    },
    changebtn: {
        marginBottom: 60,
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        padding: 10,
        borderRadius: 10,
        justifyContent:'center',
    },
    changebtntext:{
        marginTop: -2,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },   
})

export default homeStyles;