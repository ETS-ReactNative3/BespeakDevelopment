
import {StyleSheet} from 'react-native'

const EditEventStyle=StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    addbannercoverimgContainer: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft: '3%',
        marginRight: '3%',
    },
    addbannerimg:{
        color: '#000', 
        fontSize: 20,
        alignItems:'center',
        position:'absolute',
    },
    addbannercoverimg: {
        marginBottom:10,
        width: 368,
        height:150,
        justifyContent:'center',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius: 10,
    },
    //Edit Event Screen
    EditEventContainer:{
        margin:'3%',
    },
    TitleScreen:{
        fontFamily:'RedHatDisplay-Medium',
        fontSize:30,
    },
    EditEventNamecontainer:{
        marginLeft: '3%',
        marginRight: '3%',
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    EditEventNameIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10
},
    EditEventNameField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: '3%',
        flexDirection:'row',
        marginTop:-3,
        padding:10,
        color:'#5b5c5a'
    },
    EditEventSchedcontainer:{
        marginLeft: '3%',
        marginRight: '3%',
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    EditEventSchedIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10,
    },
    EditEventSchedField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 12,
        marginRight: '3%',
        flexDirection:'row',
        marginTop:-3,
        padding:10,
        color:'#5b5c5a'
    },
    EditEventLoccontainer:{
        marginLeft: '3%',
        marginRight: '3%',
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    EditEventLocIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10
    },
    EditEventLocField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: '3%',
        flexDirection:'row',
        marginTop:-3,
        padding:10,
        color:'#5b5c5a'
    },
    EditEventMaxAttendcontainer:{
        marginLeft: '3%',
        marginRight: '3%',
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.5)',
        borderRadius:10,
        marginBottom:15,
    },
    EditEventMaxAttendIcon:{
        color:'#000',
        opacity: .5,
        marginLeft:10,
        marginTop:10,
        width: 22,
    },
    EditEventMaxAttendField:{
        fontSize:16,
        fontFamily:'RedHatDisplay-Regular',
        marginLeft: 10,
        marginRight: '3%',
        flexDirection:'row',
        marginTop:-3,
        padding:10,
        color:'#5b5c5a'
    },
    DeleteBtn: {
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent:'center',
        backgroundColor: '#eb9834',
        height: 46,
        margin: '3%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 25,
        color: '#fff',
    },
    DeleteTextBtn:{
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    LockEventContainer:{
        height: 50,
        flexDirection:'row',
        backgroundColor: 'rgba(221, 221, 221, 0.3)',
        marginBottom: '3%',
        justifyContent:'space-between'
        
    },
    LockEventText:{
        marginLeft: '10%',
        fontFamily:'RedHatDisplay-Medium',
        fontSize:16,
        alignSelf:'center'
    },
    //Toggle Switch
    LockEventToggle:{
        marginRight: 30,
        alignSelf:'center'
    },
    tabSave:{
        marginTop:4,
        color: '#eb9834',
        fontFamily: 'RedHatDisplay-Medium',
        fontSize: 16,
        marginRight:'6%',
    },
    //Own Event Perspective Screen
    EventContainer:{
        flex:1,
        backgroundColor:'#fff',
        padding:'2%',
    },
    ImgContainer:{
        margin:'-1%',
        width: '102%',
        height: 180,
    },
    EventTitle:{
        fontSize: 30,
        fontFamily: 'RedHatDisplay-Medium',
        color: '#000',
        marginBottom:'4%',
        width:'65%',
    },
    TitleAndButtonRow:{
        flexDirection:'row',
        justifyContent:"space-between"
    }
    

    
})

export default EditEventStyle;