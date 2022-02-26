
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
    FormFieldAssisted: {
        marginTop: '3%',
        marginBottom: '3%',
        paddingRight: '5%'
    },
    CreateEventIcon:{
        color:'#000',
        opacity: .5
    },
    EventFieldContainer:{
        marginTop: '3%',
        marginRight:'0%',
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
    },
    EventFieldIcon:{
        opacity: .5,
        marginLeft:10,
        marginTop:10,
        width: 22,
    },
    FormEventField:{
        color:"#5b5c5a",
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: '1%',
        flexDirection:'row',
        marginTop:-3,
        padding:10,
    },
    FormButton: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#eb9834',
        height: 46,
        padding: 10,
        marginLeft:20,
        marginRight:20,
        marginBottom: 20,
        marginTop: '5%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
        color: '#fff',
    },
    FormButtonText: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    
})

export default CreateEventStyle;