import {StyleSheet} from 'react-native'

const ProfileScreenStyle=StyleSheet.create({
  //Profile Screen
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ProfileHeader:{
    paddingTop: 40,
    alignSelf: 'stretch',
  },
  //Cover Image 
  ProfileCoverImgContainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  ProfileCoverImg: {
    marginBottom:10,
    width: '100%',
    height:150,
    justifyContent:'center',
  },
  //
  FirstSection:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  //Display Photo
  ProfileImgContainer: {
    marginLeft:20,
    marginTop:-47,
  },
  ProfileImg: {
    width: 70,
    height:70,
    borderRadius:40,
    borderWidth:1,
    borderColor:'#fff',
  },
  //Edit Profile Button
  EditProfileBtn: {
    alignItems: 'center',
    justifyContent:'center',
  },
  EditProfileText:{
    backgroundColor: '#eb9834',
    paddingVertical: '2%',
    paddingHorizontal :'4.5%',
    borderRadius: 25,
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'RedHatDisplay-Medium',
  },
  //
  SecondSection:{
    marginLeft:15,
    marginRight:15,
  },
  // Basic Info
  ProfileName:{
    fontFamily:'RedHatDisplay-Medium',
    fontSize:23,
  },
  ProfileBio:{
    fontFamily:'RedHatDisplay-Light',
    fontSize:16,
    marginBottom: '1%',
    marginTop: '1%',
  },
  LocationContainer: {
    flexDirection:'row',
    alignItems: 'center',
    color: '#808080',
    marginTop: '1%'
  },
  ProfileLocation:{
    fontFamily:'RedHatDisplay-Medium',
    fontSize:16,
    marginLeft: 5,
    color: '#808080'
  },
  //Followers Following Section
  Dashboard:{
    marginTop: '1%',
    flexDirection:'row',
    alignItems: 'center'
  },
  Counter:{
    flexDirection:'row',
    alignItems: 'center'
  },
  CounterNumber:{
    flexDirection:'row', 
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'RedHatDisplay-Medium',
  },
  BoardTextOne:{
    fontFamily:'RedHatDisplay-Regular',
    fontSize: 16,
    marginLeft: 5,
    marginRight:10,
    color: '#808080'
  },
  BoardTextTwo:{
    fontFamily:'RedHatDisplay-Regular',
    fontSize: 16,
    marginLeft: 5,
    color: '#808080'
  },
    //For Follow Organizer Button
  FollowUserBtn: {
    marginRight:'-1%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#eb9834',
    height: 36,
    width: 120,
    borderRadius: 25,
  },
  //Gray Default Size Button
  UnfollowUserBtn: {
    marginRight:'-1%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#5b5c5a',
    height: 36,
    width: 120,
    borderRadius: 25,
  },  


})
export default ProfileScreenStyle;