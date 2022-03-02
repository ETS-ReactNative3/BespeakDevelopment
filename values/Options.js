const Options = {
    TitleScreen: {
        title:'bespeak',
        headerShadowVisible: false,
        headerTintColor: '#eb9834',
        borderWidth:0,
        headerTitleStyle: {
            fontFamily: 'RedHatDisplay-Medium',
            fontSize: 40,
        },
    },
    NoTitleWithBack: {
        title: ''
    },
    WithTitleWithBack: {
        ForgotPassword: {
            title: 'Forgot Password',
            headerTitleStyle: {
                fontFamily: 'RedHatDisplay-Medium',
                color: '#eb9834',
            },
        }
    },
    NoTitleNoBack: {
        title:' ',
        headerShown: false,
        headerShadowVisible: false,
        borderWidth:0,
    },

    // Profile Screen Tab Navigator for Events,Ticket,Bookmark
    TopTabNavigation: {
        tabBarActiveTintColor: '#2b2b2b',
        tabBarInactiveTintColor:'#8c8c8c',
        tabBarPressColor:'#f0c28b',
        tabBarLabelStyle: {
            fontSize: 17,
            textTransform: 'none',
            fontFamily:'RedHatDisplay-Medium',
        }
    },

    ProfileTabNavigation: {
        tabBarIndicatorStyle: {
            borderBottomColor: '#eb9834',
            borderBottomWidth: 4,
            borderRadius:10,
            width: "25%",
            left: "4.5%"  
        },
    },

    // Search Screen Tab Navigator
    SearchScreenNavigation: {
        tabBarActiveTintColor: '#eb9834',
        tabBarInactiveTintColor:'#5b5c5a',
        tabBarPressColor:'#f0c28b',
        tabBarLabelStyle: {
            fontSize: 18,
            textTransform: 'none',
            fontFamily: 'RedHatDisplay-Medium',
        }
    },
    SearchTabNavigation: {
        tabBarIndicatorStyle: {
            borderBottomColor: '#eb9834',
            borderBottomWidth: 3,
            borderRadius:10,
            width: "50%",
        },
    },

    // Attendees Screen Tab Navigator
    AttendeesScreenNavigation: {
        tabBarActiveTintColor: '#eb9834',
        tabBarInactiveTintColor:'#bbb',
        tabBarPressColor:'#f0c28b',
        tabBarLabelStyle: {
            fontSize: 18,
            textTransform: 'none',
            fontFamily: 'RedHatDisplay-Medium',
        }
    },
    AttendeesTabNavigation: {
        tabBarIndicatorStyle: {
            borderBottomColor: '#eb9834',
            borderBottomWidth: 4,
            borderRadius:10,
            width: "15%",
            marginLeft: '6.5%',
        },
    }

}

export default Options;