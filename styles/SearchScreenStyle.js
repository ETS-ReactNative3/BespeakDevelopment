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
        width:'80%',
    },
    //For Top Search 
    TopSearch:{
        fontSize: 20,
        fontFamily: 'RedHatDisplay-Medium',
        color: '#000',
        marginTop:'3%',
        marginLeft:'4%',
    },
    //For "X"
    SearchClear:{
        //backgroundColor:'#5b5c5a'
    }
})

export default SearchScreenStyle;