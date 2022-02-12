import {StyleSheet} from 'react-native'

const NotificationScreenStyle=StyleSheet.create({
    //Notification Screen
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: '4%',
    },
    //Page Guide
    NotifDates:{
        fontFamily: 'RedHatDisplay-Regular',
        fontSize: 22,
        color:'#eb9834',
        marginTop:'1.5%'
    },
    //Notification Card
    NotifTab:{
        flexDirection:'row',
        marginTop:'2%',
        marginBottom: '2%'

    },
    //Notification Image
    NotifImgContainer: {
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
    }
})

export default NotificationScreenStyle;