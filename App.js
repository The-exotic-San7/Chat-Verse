import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Navigator from './route/homeStack'
import { LogBox } from 'react-native';

export default function App () {
  

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreAllLogs();
    return (
      <Navigator />
    )
  }


