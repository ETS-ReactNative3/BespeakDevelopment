import * as Font from 'expo-font';

let getFonts;
export default getFonts = () => Font.loadAsync({
    'RedHatDisplay-Light': require('../assets/fonts/RedHatDisplay-Light.ttf'),
    'RedHatDisplay-Medium': require('../assets/fonts/RedHatDisplay-Medium.ttf'),
    'RedHatDisplay-Regular': require('../assets/fonts/RedHatDisplay-Regular.ttf'),
});