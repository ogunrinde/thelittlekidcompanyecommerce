import React, {Component} from 'react';

import {View, Image,BackHandler,Platform, Text, TextInput, ScrollView,StyleSheet,TouchableOpacity, ActivityIndicator} from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import RNPaystack from 'react-native-paystack';
import {connect} from 'react-redux';
import {itemcart,total_price,whichpage} from '../action/fetch';

class CardDetails extends React.Component {
    static navigationOptions = {
        header:null
    }
    constructor(props){
       super(props);
       this.state = {
           modalVisible:false,
           cardNumber:'4123450131001381',
           expiryMonth:'10',
           expiryYear:'20',
           cvc:'883',
           isFetching:false
       }
    }
    handleAndroidBackButton = () => {
        BackHandler.addEventListener('hardwareBackPress', () => {

        });
      };
    componentDidMount(){
        if(Platform.OS === 'android') this.handleAndroidBackButton();
        //console.error(this.props.data.access_code);
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', () => {
            if(this.props.data.carts.length == 0) 
               this.props.navigation.navigate('home');
        });
     } 
    action = async () =>{
        let data = {page:'home'};
        this.props.dispatch(whichpage(data)); 
        await this.setState({modalVisible:false});
        this.props.navigation.navigate('orders');
    }
    verify = async (reference,orderid) => {
        let value = {reference:reference,orderid:orderid};
        //console.error(value);
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/verify`, {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: JSON.stringify(value)
        }).then(data => data.json()).then(data => {
           this.setState({isFetching:false});
           //console.error(data);
           if(data.status == 'success') {
            this.setState({modalVisible:true});
            let cart = [];
            this.props.dispatch(itemcart(cart));
            let d = {price:0};
            this.props.dispatch(total_price(d));
            }else {
                //Alert.alert("Payment Unsuccessful");
            }
          }).catch(err => {
            console.error(err.toString());
          });
    }
    paynow = () =>{
        //console.error(this.props.data.access_code);
        let price = parseFloat(this.props.data.total_price) * 100;
        this.setState({isFetching:true});
        RNPaystack.init({ publicKey: 'pk_test_e6081be0199b85660e2f466dab4dab608d43c828' });
        RNPaystack.chargeCardWithAccessCode({
            cardNumber: this.state.cardNumber, 
            expiryMonth: this.state.expiryMonth, 
            expiryYear: this.state.expiryYear, 
            cvc: this.state.cvc,
            order_id: this.props.data.orderid.orders_id,
            amountInKobo: price.toString(),
            accessCode: this.props.data.access_code
          })
          .then((response) => {
              //console.error(this.props.data.orderid);
            this.verify(response.reference,this.props.data.orderid.orders_id);
            
            //console.error(response); 
            //console.error(response); // do stuff with the token
          })
          .catch(error => {
            console.log(error); // error is a javascript Error object
            //Alert.alert(error.message);
          })   
          
    }
    render(){
        return(
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                <View>
                    <View style={{marginTop:15}}>
                    <View style={{flexDirection:'row',padding:10,paddingLeft:0}}>
                        <IonIcon onPress={() => this.props.navigation.navigate('home')} name="ios-arrow-back" size={26} color="#000" style={{width:'6%',marginTop:0}}></IonIcon>
                        <Text style={{width:'90%',color:'#000',textAlign:'center',fontSize:15, fontFamily:'Montserrat-Bold'}}>
                            Enter your card Details
                        </Text>
                    </View>
                    <Modal isVisible={this.state.modalVisible}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:340,marginRight:0,alignSelf:'center' }}>
                    <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Thank you for shopping with us!</Text>
                        <Image
                                source={require('../assets/images/check.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Success</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Your Order <Text style={{color:'#EC5198'}}>{this.props.data.orderid.orders_id}</Text> was placed successfully</Text>        
                        <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                            <TouchableOpacity>
                                <Text onPress = {() => this.props.navigation.navigate('home')} style={{color:'#ec5198',fontSize:13,borderWidth:2,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,fontFamily:'Montserrat-Bold'}}>Continue Shopping</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text onPress = {this.action} style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>View Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>
                        
                        <Image
                                    source={require('../assets/images/business.png')}
                                    style={{width:'100%',aspectRatio:1,alignSelf:'center',marginTop:20}}
                            />

                        <View style={{padding:20}}>
                           <Text style={{fontSize:10,fontFamily:'Montserrat-Regular',marginTop:10}}>
                               Card Number
                           </Text>
                           <TextInput placeholder='0000 0000 0000 0000' style={{marginTop:10,borderRadius:3,borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                           <View style={{flexDirection:'row',marginTop:10}}>
                               <View style={{width:'50%'}}>
                                <Text style={{fontSize:10,fontFamily:'Montserrat-Regular',marginTop:10}}>
                                Expiry Date
                                </Text>  
                                 <TextInput placeholder='MM/YY' style={{width:'90%', marginTop:10,borderRadius:3,borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                               </View>
                               <View style={{width:'50%'}}> 
                               <Text style={{fontSize:10,fontFamily:'Montserrat-Regular',marginTop:10}}>
                                CVC
                                </Text>
                                 <TextInput placeholder='CVV' style={{width:'100%', marginTop:10,borderRadius:3,borderColor:'#c1c1c1',borderWidth:1,color:'#3f3f3f',paddingStart:10}}/>
                               </View>
                               
                           </View>
                           {
                               this.state.isFetching == true &&
                               <TouchableOpacity style={{backgroundColor:'#ec5198',padding:10,marginTop:10,width:'100%',alignSelf:'center',borderRadius:2}}>

                               <ActivityIndicator  size='small' color='#fff'/>
                               </TouchableOpacity>
                           }
                           {
                               this.state.isFetching == false &&
                               <TouchableOpacity onPress ={this.paynow} style={{backgroundColor:'#ec5198',padding:10,marginTop:10,width:'100%',alignSelf:'center',borderRadius:2}}>
                                           <Text style={{color:'#fff',alignSelf:'center',fontFamily:'Montserrat-Bold',fontSize:14}}>Proceed</Text>
                                </TouchableOpacity>
                           }
                           
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
        padding:10,
        backgroundColor:'#fff'
    }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
 };
 export default connect(mapStateToProps)(CardDetails);