import React, { Component } from 'react';
import {View, Text,StyleSheet,TextInput,Picker, Image,TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { CheckBox } from 'react-native-elements'

class OnboardthreeScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
       super(props);
    }
    render(){
        return(
           <View style={styles.container}>
               <View style={{flex:4,marginTop:20}}>
                  <Image
                            source={require('../assets/images/fogg.png')}
                            style={{width:216.96,height:256, alignSelf:'center'}}
                    />
                    <View style={{flexDirection:'row', alignSelf:'center',marginTop:30}}>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3,opacity:0.3}}></Octicons>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3,opacity:0.3}}></Octicons>
                      <Octicons name="primitive-dot" size={26} color="#EC5198" style={{width:'9%',marginTop:3}}></Octicons>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center', fontFamily:'Montserrat-Bold',fontSize:15,marginTop:40}}>Nationwide Delivery</Text>
                        <Text style={{fontFamily:'Montserrat-Regular',textAlign:'center',fontSize:14,marginTop:22}}>We will deliver anywhere you want us to. Our delivery service is one of the most efficient and they do a great service</Text>
                    </View>
                    
               </View>
               <View style={{flex:1,justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress = {() => {this.props.navigation.navigate('welcome')}} style={{width:'70%',alignSelf:'center',backgroundColor:'#EC5198',borderColor:'#EC5198',borderWidth:1,padding:10,borderRadius:5,borderRadius:20}}>
                       <Text style={{textAlign:'center',color:'#fff',fontFamily:'Montserrat-Bold',fontSize:15}}>Get Started</Text>
                    </TouchableOpacity>
                        
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
export default OnboardthreeScreen;