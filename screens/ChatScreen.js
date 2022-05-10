import React, { Component, useLayoutEffect } from 'react'
import { Text, View ,StyleSheet,Platform,KeyboardAvoidingView,SafeAreaView,FlatList,TouchableOpacity,BackHandler,backAction,Alert,ImageBackground} from 'react-native'
import { GiftedChat,InputToolbar,Bubble,Send,TypingIndicator} from 'react-native-gifted-chat';
import { useState,useEffect,useCallback } from 'react';
import { auth, db } from '../firebase';
import firebase from 'firebase/compat/app';
import {collection,addDoc,orderBy,query,onSnapshot} from 'firebase/firestore'
import {useAuthState} from 'react-firebase-hooks/auth'
import{useNavigation} from '@react-navigation/native'
import UserAvatar from 'react-native-user-avatar'
import { MaterialIcons } from '@expo/vector-icons'





export default function ChatScreen({navigation,route}) {


  function renderInputToolbar (props) {
    return (
      <InputToolbar {...props} placeholder="Type your message" containerStyle={{backgroundColor:"#383737",borderTopColor:"#383737",borderRadius:20,borderColor:'#383737',position:'relative',top:-5,}}    />
    )
  }
  function renderBubble(props){
    return(
         <Bubble {...props}  wrapperStyle={{
          
          right: {
            backgroundColor: '#364052',
          },
        }}/>
    )
  }

 const renderSend = (props) => {
    
      return(
        <TouchableOpacity>
          <Send {...props} containerStyle={{}}>
          <MaterialIcons name="send" size={25} style={{position:"relative",left:-10,top:-7}} color="white" />
          </Send>
        </TouchableOpacity>
        
      )
    
   
 }



 useEffect(()=>{
  const backAction = () => {
    Alert.alert("Hold on!", "Exit App?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  }

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove();
 },[])
   

 

  const [messages, setMessages] = useState([]);
 
  
 
  useLayoutEffect(()=>{
   const unsubscribe= db.collection('chats').orderBy('createdAt','desc').onSnapshot(snapshot=>setMessages(
      snapshot.docs.map(doc=>({
        _id:doc.data()._id,
        createdAt:doc.data().createdAt.toDate(),
        text:doc.data().text,
       user:doc.data().user

      }))
    ))
    return unsubscribe;
  },[])

  const onSend = useCallback((messages = []) => {
    
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
      _id,
      createdAt,
      text,
      user 
      
    }=messages[0];
    
    db.collection('chats').add({
      _id,
      createdAt,
      text,
      user
      
    })
  }, [])

  return (
    <View style={{flex:1}}>
      <ImageBackground  source={{uri:"https://wallpaperaccess.com/full/7331554.jpg"}} style={{flex:1}}>
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      renderAvatar={null}
      onSend={messages => onSend(messages)}
      avatar={auth?.currentUser?.photoURL}
      user={{
        _id:auth?.currentUser?.email,
        name:auth?.currentUser?.displayName,
        avatar:auth?.currentUser?.photoURL
      }}
      renderUsernameOnMessage={true}
      renderInputToolbar={renderInputToolbar}
      renderBubble={renderBubble}
      renderSend={renderSend}
      textInputProps={{color:'white',marginTop:20,}}
     
     
    />
    
    </ImageBackground>
    </View>
  )
}

const styles=StyleSheet.create({
  send: {
    fontSize: 25,
    color: '#3A97F9'
},
})