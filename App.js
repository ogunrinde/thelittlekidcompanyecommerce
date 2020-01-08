/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Stack from './navigation/stack';
import Main from './navigation/main';
import store from './store/store';
import {  Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
       whichstack:-1
    }
  }
  componentDidMount(){
    this.getItem();
  }
  async getItem() {
    const firstinstall  = await AsyncStorage.getItem('firstinstall');
    //console.error(firstinstall);
    if(firstinstall != null) {
      await this.setState({whichstack:1});
      SplashScreen.hide();
    } 
    else {
      await AsyncStorage.setItem('firstinstall', 'true');
      SplashScreen.hide();
      this.setState({whichstack:2});
    }
   }

  render(){
    return (
      <Provider store = {store}>
        {
          this.state.whichstack == 1 && <Main/>
        }
        {
          this.state.whichstack == 2 && <Stack/>
        }
      </Provider> 
    );
  }
  
};

const styles = StyleSheet.create({
  
});

export default App;
