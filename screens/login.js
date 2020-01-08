import React, { Component } from 'react';
import {View, Text, StyleSheet,TextInput, TouchableOpacity,Image, ActivityIndicator} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {login} from '../action/fetch';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';


class LoginScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
        super(props);
        this.state = {
          checked : false,
          email:'',
          password:'',
          modalVisible:false,
          isFetching:false,
          msg:'',
          siteurl:'http://www.thelittlebigkidcompany.com.ng'
        }
    }
    componentDidMount(){
        //console.error(this.props.data.whichpage);
    }
    checked = () =>{
        this.setState({checked:!this.state.checked});
    }
    savedetails = async (data) =>{
        await AsyncStorage.setItem('data',JSON.stringify(data));
    }
    userlogin = async ()=>{
        if(this.state.email == '' || this.state.password == ''){
            this.setState({msg:'All Input fields are required'});
            this.setState({modalVisible:!this.state.modalVisible});
            return false;
        }
        let formdata = {email:this.state.email,password:this.state.password};
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/customerlogin`, {
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formdata)
            }).then(data => data.json()).then(data => {
                this.setState({isFetching:false}); 
                //console.error(data);
                if(data.status == 'success'){
                    this.setState({msg:'Login Successful'});    
                    this.setState({modalVisible:!this.state.modalVisible});
                    this.props.dispatch(login(data));
                    this.props.navigation.navigate(this.props.data.whichpage);
                    this.savedetails(data);
                    //console.error(data);
                }else if(data.status == 'failed'){
                    this.setState({msg:'Invalid User Name and Password'});    
                    this.setState({modalVisible:!this.state.modalVisible});
                }
            }).catch(err => {

                this.setState({msg:'Invalid User Name and Password'});  
                this.setState({modalVisible:!this.state.modalVisible});              this.setState({modalVisible:!this.state.modalVisible});
            });
    }
    closemodal = () => {
        this.setState({modalVisible:!this.state.modalVisible})
    }

    render(){
        return(
           <View style={styles.container}>
               <View>
                   <Text style={styles.header}>
                        Log In
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
               <View style={{marginTop:48}}>
                   <TextInput
                     value = {this.state.email} onChangeText = {(text) => this.setState({email:text})}
                     placeholder ="Email or Phone Number"
                     style ={styles.text}
                    />
                    <TextInput
                     value = {this.state.password} onChangeText = {(text) => this.setState({password:text})}
                     secureTextEntry = {true}
                     placeholder ="Password"
                     style ={styles.text}
                    />
               </View>
               <View style={{flex:0.14,flexDirection:'row'}}>
                   <View style={{width:'50%'}}>
                   <View style={{flexDirection:'row'}}>
                  {/*
                     {
                         this.state.checked == true &&
                         <IonIcon name="ios-checkbox-outline" size={26} color="#4f4f4f" style={{width:'15%',marginRight:10}}></IonIcon>
                     }
                     {
                         this.state.checked == false &&
                         <IonIcon name="ios-square-outline" size={26} color="#4f4f4f" style={{width:'15%',marginRight:10}}></IonIcon>
                     }  
                     
                     <Text onPress = {this.checked} style={{color:'#000000', fontSize:12, alignSelf:'flex-start',fontWeight:'300',marginTop:5}}>Stay signed in</Text>
                 */} 
                   </View>  
                   
                   </View>
                   <View style={{width:'50%'}}>
                        <Text style={{color:'#35A4F4',fontWeight:'bold', fontSize:13, alignSelf:'flex-end'}}>Forgot Password?</Text>
                   </View>
               </View>
               <View style={{marginTop:0,flex:0.4,justifyContent:'flex-start'}}>
                    <TouchableOpacity onPress = {this.userlogin} style={{backgroundColor:'#EC5198', width:'100%',alignSelf:'center',padding:15,borderRadius:50}}>
                         {
                             this.state.isFetching == false &&
                             <Text style={{alignSelf:'center',fontWeight:'bold',color:'#fff',alignItems:'center',fontSize:18, fontFamily:'Montserrat'}}>
                             Log In
                             </Text>
                         }
                         {
                             this.state.isFetching == true && 
                             <ActivityIndicator size ="small" color="#fff"/>
                          }
                         
                    </TouchableOpacity>
                    <Text style={{textAlign:'center', marginTop:20,color:'#666666', fontFamily:'Montserrat-SemiBold'}}>No account yet? 
                        <Text onPress = {()=>{this.props.navigation.navigate('register')}} style={{color:'#35A4F4'}}> Sign Up</Text>
                    </Text>
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
    backgroundColor:'#F9F9F9',color:'#666666',fontSize:15,fontWeight:'bold',paddingStart:20,borderRadius:20,marginBottom:10
   },
   header:{
       fontSize:20,
       marginTop:33,
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
export default connect(mapStateToProps)(LoginScreen);
//export default LoginScreen;