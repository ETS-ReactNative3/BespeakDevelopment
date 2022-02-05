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
    fontFamily:'RedHatDisplay-Regular' 
    },


    
});

export default SystemStyle
