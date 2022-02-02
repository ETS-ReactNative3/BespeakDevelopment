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

    // Tab Navigator
    ProfileTabNavigation: {
        tabBarActiveTintColor: '#2b2b2b',
        tabBarInactiveTintColor:'#8c8c8c',
        tabBarPressColor:'#f0c28b',
        tabBarIndicatorStyle: {
            borderBottomColor: '#eb9834',
            borderBottomWidth: 4,
            borderRadius:10,
            width: "25%",
            left: "4.5%"
            
        },
        tabBarLabelStyle: {
            fontSize: 15,
            textTransform: 'none',
            fontWeight: 'bold',
        }
    }
}

export default Options;