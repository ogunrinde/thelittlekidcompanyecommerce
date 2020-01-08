import React, { Component } from 'react';
import {View,BackHandler,Platform, Text,StyleSheet, TextInput, ScrollView,Image, TouchableNativeFeedback, ActivityIndicator,TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CheckBox,Card } from 'react-native-elements';
import Modal from "react-native-modal";
import {connect} from 'react-redux';
import currencyFormatter from 'currency-formatter';
import {orderID} from '../action/fetch';
import AsyncStorage from '@react-native-community/async-storage';
import {itemcart,paymentinfo,login} from '../action/fetch';

class PaymentScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
    constructor(props){
       super(props);
       this.state = {
           modalVisible:false,
           card:'#fff',
           cardcolor:'#000000',
           bank:'#fff',
           bankcolor:'#000000',
           isbank:false,
           paycard:false,
           paybank:false,
           total_price:0,
           isFetching:false,
           cardNumber:0,
           expiryMonth:'',
           expiryYear:'',
           cvc:''
       }
    }
    card = () =>{
       this.setState({paycard:true,paybank:false,isbank:false,card:'#7dd148',cardcolor:'#fff',bank:'#fff',bankcolor:'#000000'})
    }
    bank = () =>{
        this.setState({paycard:false,paybank:true,isbank:true,bank:'#7dd148',bankcolor:'#fff',card:'#fff',cardcolor:'#000000'})
     }
    paynow = () =>{
        this.setState({isFetching:true});
        this.saveOrders();
        
    }
    totalprice = () =>{
        let price = 0;
        for(let r = 0; r< this.props.data.carts.length; r++){
            if(this.props.data.carts[r].deal == '1') price = price + (parseFloat(this.props.data.carts[r].newprice) * parseFloat(this.props.data.carts[r].quantity));
            else price = price + (parseFloat(this.props.data.carts[r].price) * parseFloat(this.props.data.carts[r].quantity));
        }
        this.setState({total_price:price});
    }
   
    saveOrders = async () => {
        this.totalprice();
        let price = (parseFloat(this.props.data.total_price) - parseFloat(this.props.data.gifts.certificate)) * 100;
        let cert = this.props.data.customer.length > 0 ? this.props.data.customer[0].customer_certificate_left : 0;
        let wrap = this.props.data.customer.length > 0 ? this.props.data.customer[0].customer_wrapping_left : 0;
        let data = {
            orders:this.props.data.carts, 
            shipping: this.props.data.newshippingaddress,
            amount:price.toString(),
            wrappings:this.props.data.gifts.wrappings,
            certificate:this.props.data.gifts.certificate,
            cust_cert:cert,
            cust_wrap:wrap
         };
        await fetch('http://www.thelittlebigkidcompany.com.ng/api/auth/saveorders', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body:JSON.stringify(data)
        }).then(data => data.json()).then(data => {
            this.setState({isFetching:false});
             this.props.dispatch(orderID(data));
             this.savedetails(data);
             this.props.dispatch(paymentinfo(data));
             this.props.navigation.navigate('carddetails');
          }).catch(err => {
              console.error(err);
              //alert(err.toString());
          });
      }
    action =() =>{
        this.setState({modalVisible:false});
        this.props.navigation.navigate('search');
    }
    handleAndroidBackButton = () => {
        BackHandler.addEventListener('hardwareBackPress', () => {

        });
      };
    savedetails = async (data) =>{
        let details = {
              user:this.props.data.userData,
              favorites:this.props.data.favorites,
              orders:this.props.data.orders,
              shipping:this.props.data.shipping,
              customer:data.customer,
              access_token:this.props.data.access_token
        }
        this.props.dispatch(login(details));
        await AsyncStorage.setItem('data',JSON.stringify(details));
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', () => {
            if(this.props.data.carts.length == 0) 
               this.props.navigation.navigate('home');
        });
     } 
    componentDidMount(){
        this.totalprice();
        if(Platform.OS === 'android') this.handleAndroidBackButton();
    }
    render(){
        return(
           <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
               <View style={{flexDirection:'row',marginTop:30}}>
               <IonIcon onPress = {()=>this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#000000" style={{width:'35%'}}></IonIcon>
               <Text style={{width:'65%',color:'#000000',fontSize:15,fontFamily:'Montserrat-SemiBold'}}>Payment</Text>
               </View>
               <Modal isVisible={this.state.modalVisible}>
                <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                    <Image
                            source={require('../assets/images/check.png')}
                            style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                            />
                    <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Success</Text> 
                    <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Thank you for shopping with us!</Text>        
                    <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                        <TouchableOpacity>
                            <Text onPress = {this.action} style={{color:'#ec5198',fontSize:13,borderWidth:2,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,fontFamily:'Montserrat-Bold'}}>Continue Shopping</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text onPress = {this.action} style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>View Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </Modal>
               <View style={{marginTop:16}}>
                   <Text style={{fontFamily:'Montserrat-Regular',marginBottom:7}}>
                       Summary
                   </Text>
                   <View style={{borderColor:'#7DD148',borderWidth:1,padding:15,borderRadius:10}}>
                            <View style={{flexDirection:'row'}}>
                              <Text style={{width:'78%', fontFamily:'Montserrat-Regular'}}>Product Name</Text>
                              <Text style={{width:'22%',fontFamily:'Montserrat-Regular'}}>Quantity</Text>
                            </View>
                       {
                           this.props.data.carts.map((cart) =>
                           <View key ={cart.id} value = {cart.id} style={{flexDirection:'row',marginTop:10,padding:10, borderColor:'#C1C1C1',borderBottomWidth:0.8}}>
                           <Text style={{width:'78%', fontFamily:'Montserrat-SemiBold',color:'#666666',textTransform:'capitalize'}}>{cart.name}</Text>
                           <Text style={{width:'22%',fontFamily:'Montserrat-Regular',textAlign:'center'}}>{cart.quantity}</Text>
                         </View>
                           )
                       }
                        <View style={{flexDirection:'row',marginTop:10,padding:10}}>
                            <Text style={{width:'78%', fontFamily:'Montserrat-Regular',color:'#666666',fontSize:14}}>Gift wrappings</Text>
                            <Text style={{width:'22%',fontFamily:'Montserrat-Regular',textAlign:'center'}}>{Object.keys(this.props.data.gifts).length > 0 ? this.props.data.gifts.wrappings : 0}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:4,padding:10}}>
                            <Text style={{width:'78%', fontFamily:'Montserrat-Regular',color:'#666666',fontSize:14}}>Gift certificate</Text>
                            <Text style={{width:'22%',fontFamily:'Montserrat-Regular',textAlign:'center'}}>{Object.keys(this.props.data.gifts).length > 0 ? this.props.data.gifts.certificate : 0}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:20,padding:10,marginStart:10}}>
                            <Text style={{width:'50%', fontFamily:'Montserrat-Regular',color:'#666666',fontSize:14}}>Subtotal</Text>
                            <Text style={{width:'50%',fontFamily:'Montserrat-Regular',textAlign:'center'}}>{currencyFormatter.format((parseFloat(this.props.data.total_price) - parseFloat(this.props.data.gifts.certificate)), { code: 'NGN' })}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:5,padding:10,marginStart:10}}>
                            <Text style={{width:'50%', fontFamily:'Montserrat-Regular',color:'#666666',fontSize:14}}>Delivery Fee</Text>
                            <Text style={{width:'50%',fontFamily:'Montserrat-Regular',textAlign:'center',marginEnd:5,color:'#EC5198'}}>{currencyFormatter.format(0, { code: 'NGN' })}</Text>
                        </View>
                        <View style={{flexDirection:'row',marginTop:0,padding:10,marginStart:10}}>
                            <Text style={{width:'50%', fontFamily:'Montserrat-Bold',color:'#000000',fontSize:14}}>Total</Text>
                            <Text style={{width:'50%',fontFamily:'Montserrat-Bold',textAlign:'center',marginEnd:5,color:'#EC5198'}}>{currencyFormatter.format((parseFloat(this.props.data.total_price) - parseFloat(this.props.data.gifts.certificate)), { code: 'NGN' })}</Text>
                        </View>
                        
                        
                   </View>
                   {/*
                   <View style={{marginTop:10,padding:10}}>
                            <Text style={{fontFamily:'Montserrat-Regular',color:'#000000',fontSize:14,textAlign:'center',marginTop:43}}>Select your payment method</Text>
                   </View>
                   <TouchableNativeFeedback onPress = {this.card}>
                   <Card
                   containerStyle={{backgroundColor:this.state.card}}
                    style={{width:'100%'}}>
                    <View style={{flexDirection:'row'}}>
                        {
                            this.state.paycard == false &&
                            <IonIcon name="ios-square-outline" size={26} color={this.state.cardcolor} style={{width:'8%'}}></IonIcon>
                        }
                        {
                            this.state.paycard == true &&
                             <IonIcon name="ios-checkbox-outline" size={26} color={this.state.cardcolor} style={{width:'8%'}}></IonIcon>                       
                        }  
                        
                      <Text style={{marginTop:4,color:this.state.cardcolor,marginStart:10}}>Pay with Card</Text>
                    </View> 
                    
                    </Card>
                   </TouchableNativeFeedback>
                   */}

                            {

                                this.state.isFetching == false &&
                                <TouchableOpacity onPress ={this.paynow}  style={{marginTop:20,marginBottom:20,backgroundColor:'#EC5198',borderRadius:2,padding:13}}>
                                   <Text  style={{color:'#fff',alignSelf:'center', fontFamily:'Montserrat-SemiBold'}}>Pay Now</Text>
                                </TouchableOpacity>
                            }
                            {
                                this.state.isFetching == true &&
                                <TouchableOpacity  style={{marginTop:20,marginBottom:20,backgroundColor:'#EC5198',borderRadius:2,padding:13}}>
                                   <ActivityIndicator size="small" color="#fff"/>
                                </TouchableOpacity> 
                            }
               </View>
               <View>
                           
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
    }
})
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(PaymentScreen);