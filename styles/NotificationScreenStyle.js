import {StyleSheet} from 'react-native'

const NotificationScreenStyle=StyleSheet.create({
    //Notification Screen
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:'4%',
    },
    //Page Guide
    NotifDates:{
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 22,
        color:'#eb9834',
        paddingHorizontal: '4%',
        marginVertical:'1.5%'
    },
    //Notification Card
    NotifTab:{
        flexDirection:'row',
        paddingVertical:'3%',
    },
    //Notification Image
    NotifImgContainer: {
        marginLeft:'4%',
        alignItems:'center',
        justifyContent:'center',
    },
    NotifImg: {
        borderRadius:25,
        width: 50,
        height:50,
        justifyContent:'center',
    },
    //Notification Info
    NotifCard:{
        fontSize: 15,
        fontFamily:'RedHatDisplay-Light',
        color: '#000',
        justifyContent:'center',
        alignSelf:'center',
        marginLeft:'4%',
        width:'75%'
    },
    NotifContentName:{
        fontSize: 16,
        fontFamily:'RedHatDisplay-Medium',
        color: '#000',
    },
    NotifContentPost:{
        fontSize: 16,
        fontFamily:'RedHatDisplay-Regular',
        color: '#000',
    },
    NotifContentTime:{
        fontSize: 15,
        fontFamily:'RedHatDisplay-Light',
        color: '#000',
    },
    // For Unread NotifCard
    NotifTabUnread:{
        backgroundColor:'#f5f2f2',
        flexDirection:'row',
        paddingVertical:'3%',
        borderRadius: 6,
        width:'100%'
    },
    NotifContentNameUnread:{
        fontSize: 16,
        fontFamily:'RedHatDisplay-Medium',
        color: '#eb9834',
    },
    NotifContentPostUnread:{
        fontSize: 16,
        fontFamily:'RedHatDisplay-Medium',
        color: '#000',
    },
    NotifContentTimeUnread:{
        fontSize: 15,
        fontFamily:'RedHatDisplay-Regular',
        color: '#000',
    },
    BUlletPosition:{
        alignItems:'center',
        justifyContent:'center',

    }

})

export default NotificationScreenStyle;