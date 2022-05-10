import React, { Component } from 'react'
import { Text, View,Button ,StyleSheet,TouchableOpacity } from 'react-native'
import { auth } from './firebase'
import { MaterialIcons } from '@expo/vector-icons'
export default function SignOut({navigation}) {
    const signingOut=()=>{
        auth.signOut().then(()=>{
            navigation.navigate('LoginScreen') 
        }).catch((error)=>{
     
        })
      }  
    return (
      <View style={{width:100,marginLeft:200}} >
      <TouchableOpacity onPress={signingOut} style={{marginLeft:60}}>
        <MaterialIcons name="logout" size={24}color="white" />
        
        </TouchableOpacity>  
      </View>
    )
  }

  
