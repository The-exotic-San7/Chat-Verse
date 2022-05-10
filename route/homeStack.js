
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import SignUpScreen from "../screens/SignUpScreen"
import { Button } from "react-native";
import {auth} from '../firebase';
import SignOut from "../SignOut";
import Icon from "../screens/Icon";
import { Header } from "react-native/Libraries/NewAppScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

const screens ={
   
    
    
    LoginScreen:{
        screen:LoginScreen,
        navigationOptions:({navigation})=>{
           return{
               header:null
           }
        }
        
        
    },
    SignUpScreen:{
        screen:SignUpScreen,
        navigationOptions:({navigation})=>{
            return{
                header:null
            }
         }
         
       },
    
    ChatScreen:{
        screen:ChatScreen,
        navigationOptions:({navigation})=>{
            
            return{
                headerRight:()=><SignOut navigation={navigation} />,
                headerTitle:()=><Icon />,
                headerLeft:null,
                headerStyle:{backgroundColor:'#383737'},
                gesturesEnabled:false
                
                
            }
        }
        
    }
}

const HomeStack=createStackNavigator(screens,{
    defaultNavigationOptions:{
        backgroundColor:"black"
    }
});
export default createAppContainer(HomeStack);




