import React, {Component } from 'react';
import {Card} from 'react-native-elements';
import {View, ScrollView,Image, StyleSheet, Text,TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { connect} from 'react-redux';
import currencyFormatter from 'currency-formatter';


class ViewsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
           total_price:0,
           certificate:0,
           wrapping:0
        }
    }
    componentDidMount(){
        let price = 0;
        let cert = 0;
        //console.error(this.props.data.orderdetails.order_id);
        for(let r = 0; r< this.props.data.orders.length; r++){
            if(this.props.data.orderdetails.order_id == this.props.data.orders[r].order_id){
                price = price + parseFloat(this.props.data.orders[r].price);
                cert = this.props.data.orders[r].gift_certificate;
                //alert(this.props.data.orders[r].price);
            }
        }
        price = price - parseFloat(cert);
        this.setState({total_price:price});
        this.wrapping();
    }
    wrapping = () => {
        for(let r = 0; r< this.props.data.orders.length; r++){
            if(this.props.data.orderdetails.order_id == this.props.data.orders[r].order_id){
                this.setState({wrapping:this.props.data.orders[r].gift_wrapping});
                this.setState({certificate:this.props.data.orders[r].gift_certificate});
            }
        }
    }
    render(){
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
              
              <View>
                <View style={{flexDirection:'row',marginTop:30}}>
                <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>
                <Text style={{width:'72%',color:'#000000',fontSize:20,fontFamily:'Montserrat-SemiBold',textAlign:'center'}}>View Orders</Text>
                <IonIcon onPress={() => this.props.navigation.navigate('cart')} name="md-cart" size={26} color="#000000" style={{width:'7.5%',textAlign:'center'}}></IonIcon>
                <IonIcon onPress={() => this.props.navigation.navigate('home')} name="md-home" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>

                </View>
                <View>
                    <Text style={{marginTop:15,fontSize:14,fontFamily:'Montserrat-Bold', color:'#4d4d4d'}}>Summary</Text>
                    <TouchableOpacity style={{backgroundColor:'#EC5198',padding:10,marginTop:20}}>
                        <Text style={{color:'#fff',fontSize:16}}>Order No: {this.props.data.orderdetails.order_id}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:20}}>
                    <Card containerStyle={{backgroundColor:'#fff',width:'100%', marginStart:0}}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:16,color:'#35A4F4',width:'80%'}}>Product Name</Text>
                                <Text style={{marginRight:'auto',color:'#35A4F4',fontSize:14,marginTop:2}}>Quantity</Text>
                            </View>
                            {
                            this.props.data.orders.map((order) =>
                            order.order_id == this.props.data.orderdetails.order_id &&
             
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <Text style={{fontSize:16,color:'#000000',width:'80%',textTransform:'capitalize',fontFamily:'Montserrat-Regular'}}>{order.item_name}</Text>
                                <Text style={{marginRight:'auto',color:'#000000',fontSize:14,marginTop:2}}>{order.quantity}</Text>
                            </View>
                            )}
                        </View>
                        
                    </Card>
                </View>
                <View style={{marginTop:20}}>
                    <Card containerStyle={{backgroundColor:'#fff',width:'100%', marginStart:0}}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14,color:'#AFAFAF',width:'50%',textAlign:'center',fontFamily:'Montserrat-Regular'}}>Gift Wrappings</Text>
                                <Text style={{color:'#AFAFAF',fontSize:14,width:'50%',marginTop:2,textAlign:'center',fontFamily:'Montserrat-Regular'}}>Gift Certificate</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <Text style={{fontSize:14,color:'#000000',width:'50%',textAlign:'center'}}>{this.state.wrapping}</Text>
                                <Text style={{marginRight:'auto',color:'#000000',width:'50%',fontSize:14,marginTop:2,textAlign:'center'}}>{this.state.certificate}</Text>
                            </View>
                            
                        </View>
                    </Card>
                </View>
                <View style={{marginTop:20}}>
                    <Card containerStyle={{backgroundColor:'#fff',width:'100%', marginStart:0}}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:14,color:'#4d4d4d',width:'60%',fontFamily:'Montserrat-Regular'}}>Subtotal</Text>
                                <Text style={{marginRight:'auto',color:'#4d4d4d',fontSize:14,marginTop:2,width:'40%',textAlign:'right',fontFamily:'Montserrat-Regular'}}>{currencyFormatter.format(this.state.total_price, { code: 'NGN' })}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:7,borderBottomColor:'#E6E6E6',borderBottomWidth:1,paddingBottom:11}}>
                                <Text style={{fontSize:14,color:'#4d4d4d',width:'60%',fontFamily:'Montserrat-Regular'}}>Delivery</Text>
                                <Text style={{marginRight:'auto',color:'#EC5198',width:'40%',textAlign:'right',fontSize:14,marginTop:2,fontFamily:'Montserrat-Regular'}}>NGN 0</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:7,borderBottomColor:'#E6E6E6',borderBottomWidth:1,paddingBottom:11}}>
                                <Text style={{fontSize:14,color:'#4d4d4d',width:'60%',fontFamily:'Montserrat-Regular'}}>Total</Text>
                                <Text style={{marginRight:'auto',color:'#EC5198',width:'40%',fontSize:14,marginTop:2,textAlign:'right',fontFamily:'Montserrat-Regular'}}>{currencyFormatter.format(this.state.total_price, { code: 'NGN' })}</Text>
                            </View>
                            
                        </View>
                    </Card>
                </View>
                <View style={{flexDirection:'row',marginBottom:20,marginTop:20}}>
                <View style={{width:'60%'}}>
                <Text style={{fontSize:16,color:'#9b9b9b',fontSize:14,marginTop:30,fontFamily:'Montserrat-Regular'}}>Tracking Number :
                <Text style={{fontSize:16,color:'#222222',fontSize:14}}>{this.props.data.orderdetails.order_id}</Text>
                </Text>
                </View>
                <View style={{width:'40%'}}>
                <TouchableOpacity  style={{backgroundColor:'#EC5198',padding:10,marginTop:20}}>
                        <Text onPress = {()=>this.props.navigation.navigate('tracking')} style={{color:'#fff',fontFamily:'Montserrat-Regular',fontSize:14,borderRadius:7,textAlign:'center'}}>Track</Text>
                </TouchableOpacity>
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
        backgroundColor:'#FAFAFA'
    }
})
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(ViewsScreen);