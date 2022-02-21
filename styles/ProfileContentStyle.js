
import {StyleSheet} from 'react-native'

const ProfileContentStyle=StyleSheet.create({
    CardContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:'2.5%'
    },
    CreateCard:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        opacity:0.4,
        flexDirection: 'row',
        alignSelf:'stretch',
        justifyContent: 'space-between',
        marginLeft: '3%',
        marginRight: '3%',
        borderRadius: 35,
        flexDirection:'row',
    },
    CreateCardContent:{
        width:300,
        color: "#000",
        justifyContent: 'space-around',
        fontSize: 16,
        padding:5,
        marginLeft:10,
        fontFamily: 'RedHatDisplay-Regular',
    },
    CardIcon:{
        color: "#000",
        opacity:0.4,
        padding: 10, 
        fontSize: 20,
    },

    
    
})

export default ProfileContentStyle;