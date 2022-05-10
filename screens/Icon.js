import React, { Component, useEffect,useState } from 'react'
import { Text, View,Image } from 'react-native'

import { auth } from '../firebase'

import UserAvatar from 'react-native-user-avatar';





export default function Icon() {
   
 
    return(
     <View style={{width:30,backgroundColor:'transparent'}}>
      <UserAvatar src={auth?.currentUser?.photoURL} />

     </View>
       
    )
    
    }
  

