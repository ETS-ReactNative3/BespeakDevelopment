import {StyleSheet} from 'react-native'

const EditProfileScreenStyle=StyleSheet.create({
//Change Password Screen
Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: '6%',
},
//Option Guide
OptionGuide:{
    fontSize: 16,
    justifyContent: 'center',
    color: '#ccc',
    fontFamily: 'RedHatDisplay-Regular',
    alignItems: 'center',
    marginLeft:'8%',
    marginRight:'8%',
},
//Text Inputs
ChangePassInput:{
    marginLeft:'8%',
    marginRight:'8%',
    height: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 10,
    color: '#5b5c5a',
    fontSize: 16,
    fontFamily: 'RedHatDisplay-Regular',
},
//Save Button For Change Password
SaveBtn:{
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: '#eb9834',
    padding: 10,
    borderRadius: 25,
    color: '#eb9834',
    marginBottom: '10%',
    alignItems: 'center',
    marginLeft:'8%',
    marginRight:'8%',
},
SaveTextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 20,
},
//Edit Profile Screen
EditProfileContainer: {
    flex: 1,
    backgroundColor: '#fff',
},
//Save Button For Edit Profile
HeaderSave:{
    marginTop:4,
    color: '#eb9834',
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 16,
    marginRight:'6%',
},
//Image Containers
EditProfileCoverImgContainer: {
    alignItems:'center',
    justifyContent:'center',
    zIndex: 2, // works on ios
    elevation: 2,
},
EditProfileCoverImg: {
    width: 412,
    height:150,
    justifyContent:'center',
    opacity:0.4
},
EditCoverImgIcon:{
    color: '#fff', 
    fontSize: 20,
    alignItems:'center',
    position:'absolute',
},
EditProfileImgContainer: {
    
},
EditProfileImg: {
    width: 70,
    height:70,
    borderRadius:40,
    borderWidth:1,
    borderColor:'#fff',
    opacity:.7
},
EditProfileImgIcon:{
    color: '#fff', 
    fontSize: 20,
    position:'absolute',
    marginTop:'35%',
    marginLeft:'35%',
},
//Upper Section
UpperSection:{
    marginLeft: '8%',
    maxWidth: 70,
    marginTop:'-11%',
    zIndex: 3, // works on ios
    elevation: 3,
    flexDirection:'row',
},
//Edit Profile Form
EditProfileFormContainer: {
    paddingLeft:'8%',
    paddingRight:'8%',
    marginTop: '5%'
},
  EditProfileTextInput: {
    marginTop: '7%'
},
//Change Password Button
ChangePassBtn: {
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: '#eb9834',
    borderRadius: 25,
    color: '#eb9834',
    marginTop:'1%',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft: '8%',
    marginRight: '8%'
},
ChangePassTextBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 20,
},
//Log Out Button
LogOutBtn: {
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#eb9834',
    marginLeft: '15%',
    marginRight: '15%',
    alignItems: 'center',
    justifyContent:'center'
  },
LogOutTextBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    color: '#eb9834',
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 20,
  },
//Delete Account Button
DeleteAcctBtn: {
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#eb9834',
    marginTop:'15%',
    marginHorizontal: '15%',
    alignItems: 'center',
    justifyContent:'center'
  },
DeleteAcctTextBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A30000',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 20,
  },
DeleteBtn: {
    alignSelf: 'stretch',
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#eb9834',
    marginHorizontal: '15%',
    alignItems: 'center',
    justifyContent:'center'
  },
DeleteTextBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    color: '#A30000',
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 20,
  },



})
export default EditProfileScreenStyle;