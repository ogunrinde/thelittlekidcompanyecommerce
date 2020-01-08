import React, {Component} from 'react';
import { View, ScrollView,Linking,ActivityIndicator,Image, Text, StyleSheet, TouchableOpacity,SafeAreaView, TouchableHighlight } from 'react-native';
import {Card} from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {fetchdata, products, cancel,search} from '../action/fetch';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import {login} from '../action/fetch';


class WelcomeScreen extends React.Component {
   constructor(props){
       super(props);
       this.state = {
           age:'',
           sex:'',
           age1:'#fff',
           age2:'#fff',
           age3:'#fff',
           age4:'#fff',
           sex1:'#fff',
           sex2:'#fff',
           sexcolor1:'#666666',
           sexcolor2:'#666666',
           sexcolor3:'#666666',
           sex3:'#fff',
           color1:'#666666',
           color2:'#666666',
           color3:'#666666',
           color4:'#666666',
           explore:'-1',
           modalVisible :false,
           siteurl:'http://www.thelittlebigkidcompany.com.ng',
           isFetching:false
       }
       this.getproducts = this.getproducts.bind(this);
   };
   static navigationOptions = {
       header :null
   }
   checkdata = async () =>{
        let data = await AsyncStorage.getItem('data');
        if(data != null){
        let d =  JSON.parse(data);   
        this.props.dispatch(login(d));
        } 
   }
   componentDidMount(){
       //alert(this.props.data.isFetching);
       this.checkdata();
   }
   
   sex = (val) =>{
       //alert(val);
       this.setState({sex:val});
       if(val == 'Male'){
        this.setState(
            {
                sex1:'#7dd148',
                sex2:'#fff',
                sex3:'#fff',
                sexcolor1:'#fff',
                sexcolor2:'#666666',
                sexcolor3:'#666666'
            }
        );
       }else if(val == 'Female'){
        this.setState(
            {
                sex1:'#fff',
                sex2:'#7dd148',
                sex3:'#fff',
                sexcolor1:'#666666',
                sexcolor2:'#ffffff',
                sexcolor3:'#666666'
            }
        );
       }else if (val == 'Both'){
        this.setState(
            {
                sex1:'#fff',
                sex2:'#fff',
                sex3:'#7dd148',
                sexcolor1:'#666666',
                sexcolor2:'#666666',
                sexcolor3:'#ffffff'
            }
        );
       }
   }
   age = (val) =>{
       this.setState({age:`${val}years`});
       if(val == '0-3') {
           this.setState(
               {
                   age1:'#7dd148',
                   age2:'#fff',
                   age3:'#fff',
                   age4:'#fff',
                   color1:'#fff',
                   color2:'#666666',
                   color3:'#666666',
                   color4:'#666666'
               }
           );
       }
       else if(val == '4-6') {
        this.setState(
            {
                age1:'#fff',
                age2:'#7dd148',
                age3:'#fff',
                age4:'#fff',
                color1:'#666666',
                color2:'#fff',
                color3:'#666666',
                color4:'#666666'
            }
        );
       }else if(val == '7-9'){
        this.setState(
            {
                age1:'#fff',
                age2:'#fff',
                age3:'#7dd148',
                age4:'#fff',
                color1:'#666666',
                color2:'#666666',
                color3:'#fff',
                color4:'#666666'
            }
        );
       }else if(val == '10-12'){
        this.setState(
            {
                age1:'#fff',
                age2:'#fff',
                age3:'#fff',
                age4:'#7dd148',
                color1:'#666666',
                color2:'#666666',
                color3:'#666666',
                color4:'#fff'
            }
        );
       }
   }
   modal = () =>{
    this.props.dispatch(cancel());   
    this.setState({modalVisible:!this.state.modalVisible});
   }
   call = (phoneNumber) => {
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${phoneNumber}`;
      }
      else {
        phoneNumber = `telprompt:${phoneNumber}`;
      }
      Linking.openURL(phoneNumber);
}
   getproducts = async () => {
    await fetch(`${this.props.data.siteurl}/api/auth/app_data`, {
        method:'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    }).then(data => data.json()).then(data => {
        //console.error(data);
          let stock = {
                      products:data.products,
                      deals:data.deals,
                      featured:data.featured,
                      suggested:data.suggested,
                      article:data.article
                    };
          this.props.dispatch(products(stock));
      }).catch(err => {
          console.error(err);
        alert(err.toString());
      });
  }
  explore = async (val) => {
    this.setState({explore:val,isFetching:true});
    //this.props.dispatch(fetchdata());
    //console.error(this.props.data.article);
    await this.getproducts();
    this.setState({explore:val,isFetching:false});
    this.props.navigation.navigate('home');
  }
   getData = async (val) =>{
    //console.error(this.props.data.searchdata);
        this.setState({explore:val});
        this.props.dispatch(fetchdata());
        if(this.state.age == '' && this.state.sex == ''){
        this.setState({modalVisible:!this.state.modalVisible});
        return false;
        }
        await this.getproducts();
        let param = {
            age:this.state.age,
            sex:this.state.sex
        };
        await this.props.dispatch(search(param));
        //console.error(this.props.data.searchdata);
        this.props.navigation.navigate('search');
   }
   render(){
       return (
         <ScrollView showsVerticalScrollIndicator = {false}  style={styles.container}>
             <SafeAreaView>
             <Modal isVisible={this.state.modalVisible}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                        <Image
                                source={require('../assets/images/info.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Alert</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Please select Age and Gender</Text>        
                        <View style={{padding:10,alignSelf:'center',marginTop:15}}>
                            <TouchableOpacity onPress = {this.modal}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>OKAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>    
             <View style={{marginTop:39}}>
                 <Text style={{color:'#000000', fontFamily:'Montserrat-Bold',fontSize:20}}>
                     Choose your shopping Interests
                 </Text>
                 <Text style={{marginTop:15,fontSize:15,color:'#000000',fontFamily:'Montserrat-Regular'}}>
                     This will help us to match the best products so you can shop quickly
                 </Text>
                 <View style={{marginTop:32}}>
                     <Text style={{fontSize:15,fontFamily:'Montserrat-Bold',marginBottom:10}}>Age</Text>
                     <View style={{flexDirection:'row'}}>
                     <TouchableHighlight style={{width:'25%'}} onPress = {() => this.age('0-3')}>    
                     <Card
                                
                                containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.age1,borderColor:this.state.age1,padding:15}}
                                style={{width:'98%',color:'#FFDCDC',borderRadius:30}}>
                                <Text onPress = {() => this.age('0-3')} style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.color1}}>0-3</Text>
                            
                            </Card>
                            </TouchableHighlight>
                            <TouchableHighlight style={{width:'25%'}} onPress = {() => this.age('4-6')}>
                            <Card
                                containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.age2,borderColor:this.state.age2,padding:15}}
                                style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                                <Text onPress = {() => this.age('4-6')} style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.color2}}>4-6</Text>
                            
                            </Card>
                            </TouchableHighlight>
                            <TouchableHighlight style={{width:'25%'}} onPress = {() => this.age('7-9')}>
                            <Card
                                containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.age3,borderColor:this.state.age3,padding:15}}
                                style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                                <Text onPress = {() => this.age('7-9')} style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.color3}}>7-9</Text>
                            
                            </Card>
                            </TouchableHighlight>
                            <TouchableHighlight style={{width:'25%'}} onPress = {() => this.age('10-12')}>
                            <Card
                                containerStyle={{borderRadius:3,width:'100%',margin:2,backgroundColor:this.state.age4,borderColor:this.state.age4,padding:15}}
                                style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                                <Text onPress = {() => this.age('10-12')} style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.color4}}>10-12</Text>
                            
                            </Card>
                            </TouchableHighlight>
                     </View>
                 </View>
                 <View style={{marginTop:32}}>
                     <Text style={{fontSize:15,fontFamily:'Montserrat-Bold',marginBottom:10}}>Gender</Text>
                     <View style={{flexDirection:'row'}}>
                     <TouchableHighlight style={{width:'33%'}} onPress = {() => this.sex('Both')}>
                     <Card
                                
                                containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.sex3,borderColor:this.state.sex3,padding:15}}
                                style={{width:'100%',color:'#FFDCDC',borderRadius:30}}>
                                <Text  style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.sexcolor3}}>Both</Text>
                            
                    </Card>
                    </TouchableHighlight>     
                     <TouchableHighlight style={{width:'33%'}} onPress = {() => this.sex('Male')}>
                     <Card
                                
                                containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.sex1,borderColor:this.state.sex1,padding:15}}
                                style={{width:'100%',color:'#FFDCDC',borderRadius:30}}>
                                <Text  style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.sexcolor1,}}>Male</Text>
                            
                    </Card>
                    </TouchableHighlight>   
                    <TouchableHighlight style={{width:'33%'}} onPress = {() => this.sex('Female')}>
                    <Card
                        containerStyle={{borderRadius:3,width:'98%',margin:2,backgroundColor:this.state.sex2,borderColor:this.state.sex2,padding:15}}
                        style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                        <Text style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:this.state.sexcolor2}}>Female</Text>
                    
                    </Card>
                    </TouchableHighlight>
                     </View>
                     
                 </View>
                 <View style = {{marginTop:29}}>
                    <TouchableOpacity onPress = {() => this.getData('0')} style={{width:'100%'}}> 
                    <Card
                        containerStyle={{borderRadius:3,width:'100%',margin:2,backgroundColor:'#fff',borderColor:'#fff',padding:15}}
                        style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                            {
                                this.props.data.isFetching == false && 
                                <Text style={{fontSize:13,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#7dd148'}}>Quick search</Text>

                            }
                            {
                                this.props.data.isFetching == true &&
                                <ActivityIndicator color = "#7dd148" size="small"/>
                            }
                    
                    </Card>
                    </TouchableOpacity>
                 </View>
                 <View style={{marginTop:53}}>
                     <Text style={{fontSize:13,fontFamily:'Montserrat-Regular', color:'#000000',textAlign:'center'}}>Or continue to the app to fully explore what we have</Text>
                 </View>
                 <View style={{marginTop:32,marginBottom:10}}>
                     <TouchableOpacity onPress = {()=>this.explore('1')} style={{backgroundColor:'#ec5198',padding:15,borderRadius:5}}>
                         {
                             this.state.isFetching == false &&
                             <Text style={{fontSize:13,fontFamily:'Montserrat-SemiBold', color:'#000',alignSelf:'center',fontSize:15,color:'#fff'}}>Explore the app</Text>

                         }
                         {
                                this.state.isFetching == true &&
                                <ActivityIndicator color = "#fff" size="small"/>
                            }
                     </TouchableOpacity>
                 </View>
                 <View style={{borderTopColor:'#c1c1c1',borderTopWidth:1,marginTop:2,marginBottom:10}}>
                     <Text style={{fontSize:13,marginBottom:30,marginTop:20,fontFamily:'Montserrat-Regular', color:'#000',alignSelf:'center',fontSize:15}}>Let's hear from you <Text onPress = {()=>this.call('090238267')} style={{fontSize:15,color:'#35a4f4', fontFamily:'Montserrat-Bold'}}>090238267</Text></Text>
                 </View>

             </View>
            </SafeAreaView>
         </ScrollView>
       );
   }
}


const styles =  StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'#f3f6f8'
    }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(WelcomeScreen);