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
    }
}

export default Options;