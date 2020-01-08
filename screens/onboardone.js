import React, { Component } from 'react';
import {View, Text,StyleSheet,TextInput,Picker, Image,TouchableNativeFeedback, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { CheckBox,Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

class OnboardoneScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
       super(props);
    }
     componentDidMount(){
     }
    render(){
        return(
           <View style={styles.container}>
               <View style={{flex:4,marginTop:20}}>
                  <Image
                            source={require('../assets/images/shipping.png')}
                            style={{width:216.96,height:256, alignSelf:'center'}}
                    />
                    <View style={{flexDirection:'row', alignSelf:'center',marginTop:30}}>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3}}></Octicons>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3,opacity:0.3}}></Octicons>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3,opacity:0.3}}></Octicons>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center', fontFamily:'Montserrat-Bold',fontSize:15,marginTop:40}}>100% Quality Products</Text>
                        <Text style={{fontFamily:'Montserrat-Regular',textAlign:'center',fontSize:14,marginTop:22}}>We offer top quality products for your kids. Every age range is covered and can get amazing products</Text>
                    </View>
                    
               </View>
               <View style={{flex:1,justifyContent:'flex-end'}}>
                        <View style={{flexDirection:'row'}}>
                        <View style={{width:'50%',justifyContent:'flex-end'}}>
                          <TouchableOpacity onPress = {() => {this.props.navigation.navigate('welcome')}} style={{padding:10,borderRadius:20,borderWidth:1, width:'80%',backgroundColor:'#fff',borderColor:'#EC5198'}}>
                            <Text style={{textAlign:'center',color:'#EC5198',fontFamily:'Montserrat-Bold',fontSize:15}}>Skip</Text>
                          </TouchableOpacity>  
                          </View>  
                          
                          <View style={{width:'50%',justifyContent:'flex-end'}}>
                          <TouchableOpacity onPress = {() => {this.props.navigation.navigate('onboardtwo')}} style={{padding:10,borderRadius:20, width:'80%',marginStart:'20%',backgroundColor:'#EC5198',borderColor:'#EC5198'}}>
                            <Text style={{textAlign:'center',color:'#fff',fontFamily:'Montserrat-Bold',fontSize:15}}>Next</Text>
                          </TouchableOpacity>  
                          </View>
                        </View>
                </View>
           </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#fff',
       padding:15
    },
    text:{
        color:'#4f4f4f',fontSize:15,fontWeight:'normal',borderBottomColor:'#C1c1c1',paddingStart:0,borderBottomWidth:1,marginBottom:10
       },
})
export default OnboardoneScreen;