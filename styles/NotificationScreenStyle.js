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
    },
    //For Event Notification Detail Screen
    EventContainer:{
        flex:1,
        backgroundColor:'#fff',
        padding:'2%',
    },
    ImgContainer:{
        margin:'-1%',
        width: 412,
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
        justifyContent:'space-between',
        marginBottom:'5%',
    },
    BespeakerContainer:{
        paddingLeft:'3%',
    },
    BespeakerName:{
        paddingBottom:'1%',
        fontFamily:'RedHatDisplay-Medium',
        fontSize:18,
    },
    BespeakerComment:{
        fontSize: 15,
        width: 280,
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
        width:280,
        borderRadius:25,
        height:35,
        backgroundColor:'#f5f5f5',
    },
    BespeakerInput:{
        flexDirection:'row'
    },
    //For Comment Info
    CommentInfo:{
        marginRight:'2%',
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
        backgroundColor: '#eb9834',
        height: 40,
        padding: 10,
        borderRadius: 25,
        justifyContent:'center',
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


})

export default NotificationScreenStyle;