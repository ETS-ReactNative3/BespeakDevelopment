import { StyleSheet } from "react-native";

const SystemStyle = StyleSheet.create({
  // Loading Spinners
  defaultLoader: {
    color: 'white',
    fontFamily: 'RedHatDisplay-Regular',
  },
  whiteLoader: {
    color: '#eb9834',
    fontFamily: 'RedHatDisplay-Regular',
  },

  // For Tab List View
  TabContainer: {
    width: '100%',
    height: '100%',
    alignSelf: "center", 
    justifyContent: "center",
    backgroundColor:'#fff',
  },
  TabEmptyList: {
    alignSelf: "center", 
    justifyContent: "center",
    color:'#ccc',
    fontSize:16,
    fontFamily:'RedHatDisplay-Regular',
    backgroundColor: '#fff',
  },
  //Containers Screen
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '4%',
    },
  EventListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:'3%'
  },
  //For Event Card
  Card:{
    backgroundColor: '#f5f5f5',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '1%',
    marginBottom: '1.5%',
    marginLeft: '3.5%',
    marginRight: '3.5%',
    borderRadius: 20,
  },
  //Card Image
  CardImage:{
    width: '100%',
    height: 130,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //Card Text Container
  CardContainer:{
    padding:'3%',
    marginLeft:'2%',
  },
  //Card Title
  CardTitle:{
    color: "#000",
    justifyContent: 'space-around',
    fontSize: 30,
    fontFamily: 'RedHatDisplay-Medium',
  },
  //Card Schedule
  CardSched:{
    color: "#000",
    fontSize: 20,
    fontFamily: 'RedHatDisplay-Regular',
  },
  //Card Organizer
  CardOrg:{
    color: "#eb9834",
    justifyContent: 'space-around',
    fontSize: 20,
    fontFamily: 'RedHatDisplay-Regular',
  },
  //Card Location Container
  CardLocationContainer:{
    flexDirection:'row',
    alignContent:'center',
  },
  CardLocation:{
    color: "#000",
    justifyContent: 'space-around',
    fontSize: 14,
    fontFamily: 'RedHatDisplay-Light',
  },
  //Card Options
  CardOption:{
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'flex-end',
    marginBottom:'4%',
    marginRight:'4%',
  },
  //Draggable Modal Bottom Sheet
  BottomSheetModal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf:'baseline',
    backgroundColor:'rgba(0,0,0,.5)',
  },
  BottomSheetModalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor:'#fff',
    alignItems: "center",
  },
  //Draggable Modal Image Container
  BottomSheetImage:{
    width: '100%',
    height: '35%',
    marginTop:'-4%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  //Draggable Modal Container
  BottomSheetContainer:{
    flex: 1,
    justifyContent:'center',
    alignContent:'center',
    backgroundColor:'#fff',
    width:'100%',
    marginTop:'3.5%',
    marginBottom:'3.5%',
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  //Draggable Modal Text Content
  DragableModalTitle:{
    color: "#000",
    alignSelf:'center',
    justifyContent: 'center',
    fontSize: 28,
    marginBottom:12,
    fontFamily: 'RedHatDisplay-Medium',
  },
  DraggableModalDescription:{
    color: "#000",
    fontSize: 17,
    fontFamily: 'RedHatDisplay-Regular',
  },
  //To View Organizer Info in Modal
  OrganizerTabModal:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'3%',
    marginLeft:'-4%',
    marginBottom:'3%',
  },
  //Organizer Button Profile
  OrganizerButton:{
    flexDirection:'row',
    marginBottom:10,
  },
  //To View Organizer Info
  OrganizerTab:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'3%',
    marginBottom:'3%',
  },
  OrganizerInfo:{
    flexDirection:'row',
  },
  OrganizerImgContainer: {
    alignItems:'center',
    justifyContent:'center',
  },
  OrganizerImg:{
    borderRadius:25,
    width: 40,
    height:40,
    justifyContent:'center',
  },
  OrgCard:{
    justifyContent:'center',
    alignSelf:'center',
    marginLeft:'4%',
  },
  OrgCardContainer:{
    fontSize: 15,
    fontFamily:'RedHatDisplay-Light',
    color: '#000',
    justifyContent:'center',
    alignSelf:'center',
    marginLeft:10,
    width:'55%',
  },
  OrganizerName:{
    fontSize: 17,
    fontFamily:'RedHatDisplay-Medium',
    color: '#eb9834',
    marginLeft:'1.4%',
    marginTop:'-1%',
  },
  //For Interested Participants Container
  InterestedParticipantsContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 12,
  },
  InterestedParticipantsBtn: {
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 10,
    borderRadius: 25,
    flexDirection: 'column',
  },
  //Interested Individual in Draggable Modal
  //For rowing Images
  RowImg:{
    flexDirection:'row',
  },
  InterestedIndividuals:{
    marginTop:'-2%',
    borderRadius:25,
    width: 18,
    height:18,
    justifyContent:'center',
  },
  InterestedIndividualsText:{
    fontSize: 13,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    fontFamily: 'RedHatDisplay-Light',
  },
  // For Interested Button
  InterestedBtn: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#eb9834',
    height: 46,
    width: 150,
    padding: 10,
    borderRadius: 25,
    justifyContent:'center',
  },
  InterestedTextBtn:{
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: 'RedHatDisplay-Medium',
  },
  //Detailed Screen
    //For Event Notification Detail Screen
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
    //Event Info
    EventTitle:{
        fontSize: 30,
        fontFamily: 'RedHatDisplay-Medium',
        color: '#000',
        marginBottom:'4%',
    },
    //To View Organizer Info
    OrganizerTab:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:'4%',
        marginTop:'4%',
    },
    OrganizerInfo:{
        flexDirection:'row',
    },
    OrganizerImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    OrganizerImg:{
        borderRadius:25,
        width: 40,
        height:40,
        justifyContent:'center',
    },
    OrganizerName:{
        fontSize: 20,
        fontFamily:'RedHatDisplay-Medium',
        color: '#000',
        marginLeft:'1.4%',
        marginTop:'-1%',
    },
    //For Follow Organizer Button
    FollowOrgBtn: {
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#eb9834',
        height: 36,
        width: 120,
        padding: 10,
        borderRadius: 25,
        justifyContent:'center',
    },
    FollowOrgTextBtn:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Event Info
    LowerSection:{
        flexDirection:'row'
    },
    EventSchedule:{
        marginLeft:10,
        marginTop:3,
        marginBottom:20,
        fontSize: 16,
        color: '#121212',
        fontFamily: 'RedHatDisplay-Regular',    
    },
    EventPlace:{
        paddingRight:25,
        marginLeft:10,
        marginTop:1,
        marginBottom:20,
        fontSize: 16,
        color: '#121212',
        fontFamily: 'RedHatDisplay-Regular',    
    },
    //Line Breaks
    LineBreak:{
        borderBottomWidth: 1, 
        borderColor:'#000', 
        opacity:0.1,
        marginTop:'-8%'
    },
    BreakLineContainer:{
        padding:'4%',
    },
    BreakLine:{
        borderBottomWidth:1,
        borderBottomColor: '#000',
        alignItems:'center',
        opacity: .3,
    },
    BreakLineComment:{
        marginTop: '-7.5%',
        padding: '5%',
        backgroundColor:'#fff',
        color:'#000',
        alignSelf:'center',
        fontSize:14,
    },
    //Event Guide
    EventAboutTitle:{
        color:'#eb9834',
        fontFamily:'RedHatDisplay-Medium',
        fontSize: 25,
        marginTop:'-4%',
        marginBottom:'4%',
    },
    EventTextInfo:{
        color:'#000',
        fontFamily:'RedHatDisplay-Regular',
        fontSize: 17.5,
    },
    EventReminderTitle:{
        color:'#000',
        fontFamily:'RedHatDisplay-Medium',
        fontSize: 25,
        marginTop:'4%',
        marginBottom:'4%',
    },
    //Comment Section
    BespeakerCommentContainer:{
        flexDirection:'row',
        marginBottom:'5%',
        width:'90%'
    },
    BespeakerContainer:{
        paddingLeft:'3%',
        width:'90%',
    },
    BespeakerName:{
        paddingBottom:'1%',
        fontFamily:'RedHatDisplay-Medium',
        fontSize:18,
    },
    BespeakerComment:{
        fontSize: 15,
    },
    //Comment Section Image
    BespeakerImgContainer: {
        alignItems:'center',
        justifyContent:'center',
    },
    BespeakerImg: {
        borderRadius:25,
        width: 50,
        height:50,
        justifyContent:'center',
    },
    //Write a comment
    MyCommentInput:{
      fontSize:15,
      borderRadius:25,
      height:35,
      backgroundColor:'#f5f5f5',
      paddingLeft:'2%',
      width:'90%'
    },
    BespeakerInput:{
      flexDirection:'row',
      marginLeft:'-1%'
    },
    //For Comment Info
    CommentInfo:{
        marginLeft:'2%',
    },
    //Send Comment
    SendComment:{
        marginTop:'2%',
        marginLeft:'12%',
        marginRight:'2%',
    },
    //I'm Attending Container
    AttendingContainer:{
        paddingTop:80,
        backgroundColor:'#fff',
        justifyContent:'center',
        marginBottom:5,
        paddingLeft:20,
        paddingRight:20,
    },
    AttendingBtn: {
        marginTop:-2,
        alignItems: 'center',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: '#eb9834',
        height: 40,
        borderRadius: 25,
    },
    AttendingTextBtn:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Modal for viewing ticket    
    YoureSetView: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,.1)',
    },
    YoureSetModalView: {
    backgroundColor: "#fff",
    width: 300,
    height: 200,
    borderRadius:25,
    alignItems: "center",
  },
  //On-modal Text
    ModalText:{
        fontSize:40,
        fontFamily:'RedHatDisplay-Medium',
        color:'#000',
        padding:15,
    },
  // For View Ticket Button
    ViewBtn: {
        marginTop:8,
        alignItems: 'center',
        backgroundColor: '#eb9834',
        height: 40,
        width: 130,
        padding: 10,
        borderRadius: 25,
        justifyContent:'center',
    },
    ViewTextBtn:{
        marginTop: -2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'RedHatDisplay-Medium',
    },
    //Comment Info Delete Modal
    CommentInfoView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf:'baseline',
        backgroundColor:'rgba(0,0,0,.5)',
    },
    DeleteModalView: {
        paddingTop:33,
        paddingLeft:10,
        backgroundColor: "#fff",
        width: 412,
        height: 120,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    Icon:{
        fontSize:20,
        paddingLeft:10,
        flexDirection:'row',
    },
    DeleteTextBtn:{
        paddingLeft:10,
        color:'#000',
        fontSize:20,
        fontFamily:'RedHatDisplay-Regular'
    },
    CommentDateInfo:{
        marginTop:10,
        flexDirection:'row',
        marginLeft:3,
    },
    CommentDate:{
        paddingLeft:10,
        color:'#000',
        fontSize:20,
        fontFamily:'RedHatDisplay-Regular'
    },
  //Screen Footer
  Footer:{
    backgroundColor: '#ebebeb',
    padding: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginLeft:'-15%',
    marginRight:'-15%',
  },
  BespeakLogo:{
    color: '#eb9834',
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 30,
  },
  FooterText:{
    fontFamily: 'RedHatDisplay-Regular',
  },
  //For Organizer Card
  OrganizerCardContainer:{
    justifyContent:'center',
    alignSelf:'center',
    marginLeft:10,
    width:'50%',
  },
  //To view organizer tab
  OrganizerSectionTab:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'3%',
    marginBottom:'3%',
    marginLeft:'-2%',
    width:'100%',
  },
  // Organizer Info
  OrgCardInfo:{
    fontSize: 15,
    fontFamily:'RedHatDisplay-Light',
  }


    
});

export default SystemStyle
