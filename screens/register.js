import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity, ScrollView,Image,ActivityIndicator } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {login} from '../action/fetch';
import {connect} from 'react-redux';
import {signup} from '../action/fetch';
import AsyncStorage from '@react-native-community/async-storage';


class RegisterScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        this.state ={
            isFetching:false,
            fullname:'',
            email:'',
            phone:'',
            password:'',
            cpassword:'',
            unique_id:'',
            msg:'',
            modalVisible:false,
            siteurl:'http://www.thelittlebigkidcompany.com.ng'
        }
    }
  
    register = async ()=>{
        if(this.state.fullname == '' || this.state.phone == '' || this.state.email == '' || this.state.password == ''){
            this.setState({msg:'All Input fields are required'});
            this.setState({modalVisible:!this.state.modalVisible});
            return false;
        }else if(this.state.password != this.state.cpassword){
            this.setState({msg:'Password Mismatched'});
            this.setState({modalVisible:!this.state.modalVisible});
            return false;
        }
        let formdata = {unique_id:this.state.unique_id,name:this.state.fullname,email:this.state.email,phone_number:this.state.phone,password:this.state.password};
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/customersignup`, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formdata)
            }).then(data => data.json()).then(data => {
                this.setState({isFetching:false});
                //console.error(data);
                let msg = '';
                if(data.hasOwnProperty('errors')){
                if(typeof data.errors.email !== undefined)
                   msg += data.errors.email[0];
                else if(typeof data.errors.password !== undefined)
                   msg += data.errors.password[0];
                else if(typeof data.errors.name !== undefined)
                   msg += data.errors.name[0];
                }
                if(data.hasOwnProperty('errors')){
                    this.setState({msg:msg});    
                    this.setState({modalVisible:!this.state.modalVisible});
                    return false;
                }  
                if(data.status == 'success'){
                    msg += 'Sign Up Successful';
                    //console.error(data);
                    this.setState({msg:msg});
                    this.setState({modalVisible:!this.state.modalVisible});
                    this.props.dispatch(signup(data));
                    //this.savedetails(data);
                    //console.error(data);
                    this.props.navigation.navigate(this.props.data.whichpage);
                } 
            }).catch(err => {
                this.setState({isFetching:false});
                this.setState({msg:err.toString()});
                this.setState({modalVisible:!this.state.modalVisible});
            });
    }
    closemodal = () => {
        this.setState({modalVisible:false});
    }
    render(){
        return(
           <ScrollView>
           <View style={styles.container}>
               <View>
                   <Text style={styles.header}>
                        Sign Up
                   </Text>
               </View>
               <Modal isVisible={this.state.modalVisible}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                        <Image
                                source={require('../assets/images/info.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Alert</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>{this.state.msg}</Text>        
                        <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                            <TouchableOpacity onPress = {this.closemodal}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>OKAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
               <View style={{marginTop:28}}>
                   <TextInput
                     value = {this.state.fullname} onChangeText={(text)=>this.setState({fullname:text})}
                     placeholder ="Full Name"
                     style ={styles.text}
                    />
                    <TextInput
                     value = {this.state.email} onChangeText = {(text) => this.setState({email:text})}
                     placeholder ="Email"
                     style ={styles.text}
                    />
                    <TextInput
                    keyboardType={'numeric'}
                    value = {this.state.phone} onChangeText={(text)=>this.setState({phone:text})}
                     placeholder ="Phone Number"
                     style ={styles.text}
                    />
                    <TextInput
                     secureTextEntry={true}
                     value = {this.state.password} onChangeText = {(text) => this.setState({password:text})}
                     placeholder ="Password"
                     style ={styles.text}
                    />
                    <TextInput
                     secureTextEntry={true}
                     value = {this.state.cpassword} onChangeText = {(text) => this.setState({cpassword:text})}
                     placeholder ="Confirm Password"
                     style ={styles.text}
                    />
                    <TextInput
                     value = {this.state.unique_id} onChangeText = {(text) => this.setState({unique_id:text})}
                     placeholder ="Unique ID"
                     style ={styles.text}
                    />
               </View>
               
               <View style={{marginTop:0,flex:0.4,justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress = {this.register} style={{backgroundColor:'#EC5198', width:'100%',alignSelf:'center',padding:10,borderRadius:50}}>
                         {
                             this.state.isFetching == false && 
                             <Text style={{alignSelf:'center',fontWeight:'bold',color:'#fff',alignItems:'center',fontSize:18, fontFamily:'Montserrat-Bold'}}>
                                Sign Up
                            </Text>
                         }
                         {
                             this.state.isFetching == true && 
                             <ActivityIndicator size="small" color="#fff"/>
                         }
                         
                    </TouchableOpacity>
                    <Text style={{textAlign:'center', marginTop:20,color:'#000000', fontFamily:'Montserrat-Regular'}}>
                        You agree to the terms and conditions when you sign up
                    </Text>
                    <Text style={{textAlign:'center', marginTop:20,color:'#666666', fontFamily:'Montserrat-SemiBold'}}>
                        Already have an account?
                        <Text onPress = {()=>{this.props.navigation.navigate('login')}} style={{color:'#35A4F4'}}> Log In</Text>
                    </Text>
               </View>
               
           </View>
           </ScrollView> 
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
    backgroundColor:'#F9F9F9',color:'#666666',fontSize:15,fontWeight:'bold',paddingStart:20,borderRadius:20,marginBottom:10
   },
   header:{
       fontSize:20,
       marginTop:15,
       marginLeft:8,
       fontFamily:'Montserrat',
       fontWeight:'bold',
       fontStyle:'normal'
   }
});

const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(RegisterScreen);