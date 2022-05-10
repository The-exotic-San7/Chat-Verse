import React, { Component, useState } from 'react'
import { Text, View ,StyleSheet,TextInput,Button, TouchableWithoutFeedback, Keyboard,Image,ImageBackground } from 'react-native'
import { auth } from '../firebase'
import * as ImagePicker from 'expo-image-picker'
import UserAvatar from 'react-native-user-avatar'

export default function SignUpScreen({navigation}) {
    const [email,setEmail] =useState('')
    const[name,setName] =useState('')
    const [password,setPassword] =useState('')
    const [imageURL ,setImageURL]=useState('')
    const [photo,setPhoto]=useState('')
    
    const handleChoosePhoto=async()=>{
      const permission=await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(permission.granted==="false"){
        alert("You have cancelled");
        return
      }

      const result=await ImagePicker.launchImageLibraryAsync();
      if(!result.cancelled){
        setPhoto(result.uri);
         
      }
    }

    const register=()=>{
        auth.createUserWithEmailAndPassword
        (email,password)
        .then((userCredential)=>{
            var user =userCredential.user;
            user.updateProfile({
                displayName:name,
                photoURL: photo
            }).then(function(){
                  
            }).catch(function(error){

            })
           navigation.navigate("ChatScreen");
        })
        .catch((error)=>{
           
            var errorMessage=error.message;
            alert(errorMessage)
        })
    }
   return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    
     <View style={styles.container}>
      <Text style={{position:'relative',top:-160,fontSize:25,color:"black",fontWeight:"bold"}}>Why use whatsapp? :)</Text>
      
        
      
       <TextInput
        style={{paddingBottom:20,position:"relative",fontSize:20,top:-55,borderBottomWidth:1,width:300,borderColor:'lightgrey'}} 
         placeholder="Enter your Name"
         label="Name"
         value={name}
         placeholderTextColor="grey"
         onChangeText={text=>setName(text)}
         />
 
 <TextInput 
        style={{paddingBottom:20,position:"relative",fontSize:20,top:-10,borderBottomWidth:1,width:300,borderColor:'lightgrey'}}
         placeholder="Enter your Email"
         label="Email"
         value={email}
         placeholderTextColor="grey"
         onChangeText={text=>setEmail(text)}
         
         />
          <TextInput 
           style={{paddingBottom:20,position:"relative",bottom:-30,fontSize:20,borderBottomWidth:1,width:300,borderColor:'lightgrey'}}
         placeholder="Enter your Password"
         label="Password"
         value={password}
         placeholderTextColor="grey"
         onChangeText={text=>setPassword(text)}
         secureTextEntry
         />
         <View style={{position:'relative',bottom:-100,left:-80,width:150}}>
         <Button title="Select avatar" onPress={handleChoosePhoto} color="black"></Button> 
         </View>
         <View style={{position:'relative',bottom:-50,right:-100}}>
            <UserAvatar name="Display Picture"size={60} src={photo} />
         </View>
              
    <View  style={{position:'relative',bottom:-200,width:250}}>
     <Button title="Sign up" color="black" onPress={register} />
     </View>
     </View>
     
     </TouchableWithoutFeedback>
     
   );
 }
 
 
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor:"white",
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
