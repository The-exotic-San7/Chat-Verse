import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as GoogleSignIn from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import firebase from 'firebase/compat/app';

import { TextInput,Button,Text, View ,StyleSheet, TouchableOpacity,TouchableWithoutFeedback,Keyboard,ImageBackground} from 'react-native'
import {auth} from '../firebase'
import {useEffect,useState} from 'react'






export default function LoginScreen({navigation}) {
   const [email,setEmail] =useState('')
   const [password,setPassword] =useState('')
   
    const signIn=()=>{
      auth.signInWithEmailAndPassword(email,password)
      
      .catch((error)=>{
        var errorMessage=error.message
        alert(errorMessage);
      })
    }
   useEffect(()=>{
     const unsub=auth.onAuthStateChanged(function(user){
       if(user){
         navigation.navigate("ChatScreen")
       }else{
           
       }
     })
     return unsub;
   },[])
  return (
       <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    < ImageBackground source={{uri:"https://wallpaperaccess.com/full/7331555.jpg"}} style={{flex:1}}>
    <View style={styles.container}>
    
      <Text style={{fontWeight:'bold',position:"relative",top:-150,fontSize:30,color:"#d9dadb"}}>Hey There!</Text>
      <TextInput
        style={{paddingBottom:20,position:"relative",fontSize:20,top:-55,borderBottomWidth:1,width:300,borderColor:'lightgrey',color:"black",textDecorationStyle:"none"}}
        placeholder="Email"
        label="Email"
        value={email}
        placeholderStyle={{position:"relative",left:-20,}}
        placeholderTextColor="#d9dadb"
        onChangeText={text=>setEmail(text)}
        /> 
             
<TextInput
       style={{position:"relative",fontSize:20,bottom:-15,borderBottomWidth:1,width:300,borderColor:'lightgrey'}} 
        placeholder="Passsword"
        label="Password"
        value={password}
        placeholderTextColor="#d9dadb"
        onChangeText={text=>setPassword(text)}
        secureTextEntry
        />
      <View style={{position:'relative',paddingTop:30,marginTop:50,width:250}}>
    <Button title="Sign In"onPress={signIn} color="black"/>
    </View>
    
      <Text style={{marginBottom:-10,position:'relative',bottom:-20,fontSize:16,left:-20,color:"#d9dadb"}}>Don't have an account?</Text>
        <TouchableOpacity style={{position:'relative',bottom:-10,right:-90}}>
          <Text style={{color:'lightblue'}} onPress={()=>navigation.navigate("SignUpScreen")}>Sign up</Text>
        </TouchableOpacity>

     
   
       
     
    </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    alignItems: 'center',
    justifyContent: 'center',
  },
});