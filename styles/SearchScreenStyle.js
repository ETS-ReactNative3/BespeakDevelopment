import {StyleSheet} from 'react-native'

const SearchScreenStyle=StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    TabContainer:{
        flex: 1,
        backgroundColor: 'red',
        paddingTop:'3%',
    },
    CardSearchInHeader:{
        padding:10,
        margin:'4%',
        backgroundColor: '#fff',
        borderRadius: 25,
        flexDirection:'row',
        marginTop: 40,
        borderColor:'#ccc',
        opacity:.5,
        borderWidth:1,
        marginLeft:'5%',
        marginRight:'5%',
    },
    SearchBarIcon:{
        fontFamily: 'RedHatDisplay-Regular',
        color: '#000',
        marginLeft:5,
        color:'#eb9834',
    },
    SearchBar:{
        flexDirection: 'row',
        fontFamily: 'RedHatDisplay-Regular',
        color: '#000',
        fontSize: 20,
        marginLeft: '3%',
        width:'100%',
    },
    eventTitlecontentOnmodal:{
        color: "#000",
        alignSelf:'center',
        justifyContent: 'center',
        fontSize: 28,
        marginBottom:12,
        fontFamily: 'RedHatDisplay-Medium',
    },
    feed:{
        backgroundColor: '#f5f5f5',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
    },
    firstpic:{
        width: 370,
        height: 130,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    eventInfoTab:{
        padding: 10,
        marginLeft:10,
    },
    eventTitlecontent:{
        color: "#000",
        justifyContent: 'space-around',
        fontSize: 30,
        fontFamily: 'RedHatDisplay-Medium',
    },
    eventDTRcontent:{
        color: "#000",
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Regular',
    },
    eventLOCcontent:{
        color: "#eb9834",
        justifyContent: 'space-around',
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Regular',
    },
    GeoLocTabcontent:{
        flexDirection:'row',
        alignContent:'center',
    },
    feedcontent:{
        color: "#000",
        justifyContent: 'space-around',
        fontSize: 14,
        fontFamily: 'RedHatDisplay-Light',
    },
    eventOptionTabcontent:{
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'flex-end',
        marginBottom:10,
        marginRight: 10,
    },
})

export default SearchScreenStyle;