import React, { Component } from 'react';
import {View, Text,TextInput,ScrollView,StyleSheet,Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {whichpage} from '../action/fetch';

class ProfileScreen extends React.Component {
    constructor(props){
      super(props);
      this.state = {
         select:'',
         modalVisible:false,
         name:'',
         email:'',
         phone_number:'',
         msg:'',
         siteurl:'http://www.thelittlebigkidcompany.com.ng',
         isFetching:false,
         customer_id : Object.keys(this.props.data.userData).length > 0 ? this.props.data.userData.id : ''
      }
    }
    static navigationOptions = {
        header:null
    };
    save = async ()=>{
      if(this.state.email == '' || this.state.name == '' || this.state.phone_number == ''){
          this.setState({msg:'All Input fields are required'});
          this.setState({modalVisible:!this.state.modalVisible});
          return false;
      }
      let formdata = {customer_id:this.state.customer_id,email:this.state.email,phone_number:this.state.phone_number,name:this.state.name};
      this.setState({isFetching:true});
      await fetch(`${this.state.siteurl}/api/auth/updatecustomerlogin`, {
      method:'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${this.props.data.access_token}`
      },
      body: JSON.stringify(formdata)
          }).then(data => data.json()).then(data => {
              this.setState({isFetching:false}); 
              //console.error(data);
              if(data.status == 'success'){
                  this.setState({msg:'Profile Edited Successful'});    
                  this.setState({modalVisible:!this.state.modalVisible});
              }else if(data.status == 'failed'){
                  this.setState({msg:'Error Updating Data, Try again Later'});    
                  this.setState({modalVisible:!this.state.modalVisible});
              }
          }).catch(err => {

              this.setState({msg:err.toString()});  
              this.setState({modalVisible:!this.state.modalVisible});              this.setState({modalVisible:!this.state.modalVisible});
          });
  }

    componentDidMount() {
        if(Object.keys(this.props.data.userData).length == 0){
           let data = {page:'profile'};
          this.props.dispatch(whichpage(data)); 
          this.setState({msg:'Kindly Sign up or Login'});
          this.setState({modalVisible:!this.state.modalVisible});
        }else {
           this.setState({
              email: Object.keys(this.props.data.userData).length > 0 ? this.props.data.userData.email : '',
              phone_number:Object.keys(this.props.data.userData).length > 0 ? this.props.data.userData.phone_number : '',
              name:Object.keys(this.props.data.userData).length > 0 ? this.props.data.userData.name : ''
           })
        }
           
    }
    select = (val) =>{
       this.setState({select:val})
    }
    closemodal = () =>{
       this.setState({modalVisible:!this.state.modalVisible});
    }
    login = ()=>{
      this.setState({modalVisible:!this.state.modalVisible});
      this.props.navigation.navigate('login');
    }
    render(){
        return(
           <ScrollView showsVerticalScrollIndicator = {false} style= {styles.container}>
               <View style={{flexDirection:'row',padding:10,backgroundColor:'#fff',borderBottomEndRadius:20,borderBottomStartRadius:20}}>
                   <View style={{width:'25%'}}>
                   <Image
                            source={require('../assets/images/profile.jpg')}
                            style={{width:80,height:80,borderRadius:40}}
                    />
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
                            <TouchableOpacity onPress = {this.login}>
                                <Text onPress = {this.action} style={{color:'#ec5198',fontSize:13,borderWidth:2,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,fontFamily:'Montserrat-Bold'}}>SIGN IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.closemodal}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>OKAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> 
                   <View style={{width:'75%'}}>
                        <Text style={{color:'#000000', fontFamily:'Montserrat-SemiBold',marginTop:10}}>{this.props.data.userData.name}</Text>
                        <Text style={{color:'#000000', fontFamily:'Montserrat-Regular',marginTop:4,fontSize:10}}>Loyalty Level {this.props.data.customer.length > 0 ? this.props.data.customer[0].customer_level : 'Unknown'}</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'50%'}}>
                               <Text style={{color:'#000000', fontFamily:'Montserrat-Regular',marginTop:4,fontSize:10}}>Gift Wrapping</Text>
                               <Text style={{color:'#c21c1c', fontFamily:'Montserrat-Regular',marginTop:4,fontSize:13,marginLeft:'25%'}}>{this.props.data.customer.length > 0 ? this.props.data.customer[0].customer_wrapping_left : 'Unknown'}</Text>
                            </View>
                            <View style={{width:'50%'}}>
                               <Text style={{color:'#000000', fontFamily:'Montserrat-Regular',marginTop:4,fontSize:10}}>Gift Certificate</Text>
                               <Text style={{color:'#c21c1c', fontFamily:'Montserrat-Regular',marginTop:4,fontSize:13}}>{this.props.data.customer.length > 0 ? this.props.data.customer[0].customer_certificate_left : 'Unknown'}</Text>
                            </View>
                        </View>
                    </View>
               </View>
               <View style={{marginTop:20,padding:10}}>
                  {
                     Object.keys(this.props.data.userData).length > 0 &&
                     <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:-10}}>
                           <IonIcon name="md-person" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:-10,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text onPress={()=>this.select('profile')} style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Edit Profile</Text>
                        { 
                           this.state.select !== 'profile' && 
                           <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                        }
                        { 
                           this.state.select == 'profile' && 
                           <IonIcon name="ios-arrow-down" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                        }
                        </View>
                       </View>

                  }
                   
                   {
                           this.state.select == 'profile' && 
                           <View> 
                              <View style={{flexDirection:'row',marginTop:-10}}>
                                    <View style={{width:'10%',marginTop:0}}>
                                       
                                    </View>
                                    <View style={{width:'90%',marginTop:30,paddingBottom:4}}>
                                       <TextInput placeholder='Name' value={this.state.name} onChangeText = {(text) => this.setState({name:text})} style={{marginTop:10,borderRadius:3,borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                                       <TextInput placeholder='Email' value={this.state.email} value={this.state.email} onChangeText = {(text) => this.setState({email:text})} style={{marginTop:10,borderRadius:3,width:'100%',borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                                       <TextInput keyboardType={'numeric'} placeholder='Phone Number' value={this.state.phone_number} onChangeText = {(text) => this.setState({phone_number:text})} style={{marginTop:10,borderRadius:3,width:'100%',borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                                       {
                                          this.state.isFetching == true &&
                                          <TouchableOpacity onPress = {this.save} style={{backgroundColor:'#ec5198',padding:10,marginTop:5,width:'60%',alignSelf:'center'}}>
                                          <ActivityIndicator  size = 'small' color = '#fff'/>
                                          </TouchableOpacity>
                                       }
                                       {
                                          this.state.isFetching == false && 
                                          <TouchableOpacity onPress = {this.save} style={{backgroundColor:'#ec5198',padding:10,marginTop:5,width:'60%',alignSelf:'center'}}>
                                           <Text style={{color:'#fff',alignSelf:'center',fontFamily:'Montserrat-Bold',fontSize:12}}>Save Changes</Text>
                                          </TouchableOpacity>
                                       }
                                       
                                    </View>
                              </View>
                              
                        </View>
                     }
                     {
                        Object.keys(this.props.data.userData).length > 0 &&
                        <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="ios-bookmark" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text onPress = {() => this.props.navigation.navigate('orders')} style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>My Orders</Text>
                        <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>

                        </View>
                        </View>
                     }
                   
                   <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="md-settings" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Settings</Text>
                        <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>

                        </View>
                   </View>
                   <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="md-document" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Terms and Conditions</Text>
                        <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>

                        </View>
                   </View>
                   <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="md-headset" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text onPress = {()=>this.select('support')} style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Support Center</Text>
                           { 
                              this.state.select !== 'support' && 
                              <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                           }
                           { 
                              this.state.select == 'support' && 
                              <IonIcon name="ios-arrow-down" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                           }
                        </View>
                   </View>
                   {
                      this.state.select == 'support' && 
                      <View> 
                        <View style={{flexDirection:'row',marginTop:-10}}>
                              <View style={{width:'10%',marginTop:0}}>
                                 
                              </View>
                              <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                              <Image
                                          source={require('../assets/images/email.png')}
                                          style={{width:20,aspectRatio:1.3,alignSelf:'center',width:'10%',margin:5}}
                                 />
                                 <Text style={{fontFamily:'Montserrat-Bold',fontSize:12,color:'#000',width:'80%',marginTop:10,marginStart:10}}>ogunrindeomotayo@gmail.com</Text>
                              </View>
                        </View>
                        <View style={{flexDirection:'row',marginTop:-10}}>
                              <View style={{width:'10%',marginTop:0}}>
                                 
                              </View>
                              <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                              <Image
                                          source={require('../assets/images/smartphone.png')}
                                          style={{width:20,aspectRatio:0.9,alignSelf:'center',width:'10%',margin:5}}
                                 />
                                 <Text style={{fontFamily:'Montserrat-Bold',fontSize:12,color:'#000',width:'80%',marginTop:10,marginStart:10}}>00000000000000</Text>
                              </View>
                        </View>
                    </View>
                   }
                   <View style={{flexDirection:'row'}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="md-globe" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30,borderBottomColor:'#c1c1c1',borderBottomWidth:1,paddingBottom:4}}>
                        
                        <Text onPress = {() =>this.select('social')} style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Socials</Text>
                        
                        { 
                           this.state.select !== 'social' && 
                           <IonIcon name="ios-arrow-forward" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                        }
                        { 
                           this.state.select == 'social' && 
                           <IonIcon name="ios-arrow-down" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                        }
                        </View>
               
                   </View>
                   {
                      this.state.select == 'social' && 
                      <View> 
                        <View style={{flexDirection:'row'}}>
                              <View style={{width:'10%',marginTop:30}}>
                                 
                              </View>
                              <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                              <Text style={{fontFamily:'Montserrat-Regular',fontSize:15,width:'90%'}}>Follow us on</Text>
                              </View>
                     
                        </View>
                        <View style={{flexDirection:'row',marginTop:-10}}>
                              <View style={{width:'10%',marginTop:0}}>
                                 
                              </View>
                              <View style={{flexDirection:'row', width:'90%',marginTop:30,paddingBottom:4}}>
                              <Image
                                          source={require('../assets/images/twitter.png')}
                                          style={{width:40,aspectRatio:1.3,borderRadius:10,alignSelf:'center',width:'20%',marginRight:'10%'}}
                                 />
                                 <Image
                                          source={require('../assets/images/facebook.png')}
                                          style={{width:40,aspectRatio:1.3,borderRadius:10,alignSelf:'center',width:'20%',marginRight:'10%'}}
                                 />
                                 <Image
                                          source={require('../assets/images/instagram.png')}
                                          style={{width:40,aspectRatio:1.3,borderRadius:10,alignSelf:'center',width:'20%',margin:5}}
                                 />
                              </View>
                     
                        </View>
                    </View>
                   }
                   
                   
                   <View style={{flexDirection:'row',marginTop:50}}>
                        <View style={{width:'10%',marginTop:30}}>
                           <IonIcon name="md-log-out" size={20} color="#000000"></IonIcon>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',marginTop:30}}>
                        
                        <Text style={{fontFamily:'Montserrat-Bold',fontSize:12,width:'90%'}}>Log Out</Text>

                        </View>
                   </View>
                    
               </View>
           </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'#f3f6f8'
   }
});
const mapStateToProps = state => {
   return {
       data: state.Reducer
   };
};
export default connect(mapStateToProps)(ProfileScreen);
//export default ProfileScreen;