import React, {Component } from 'react';
import {Card} from 'react-native-elements';
import {View,SafeAreaView, ScrollView,Image, StyleSheet, Text, ActivityIndicator} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import currencyFormatter from 'currency-formatter';
import {orderdetails} from '../action/fetch';


class OrdersScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           orders:[],
           total_price:0,
           isFetching:false,
           allorders:[]
        }
    }
    componentDidMount() {
        this.setState({isFetching:true});
        this.getorders();
        //console.error(this.props.data.customer);
    }
     getorders = async () => {
        this.setState({isFetching:true});
        await fetch('http://www.thelittlebigkidcompany.com.ng/api/auth/orders', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body:{}
        }).then(data => data.json()).then(data => {
           //console.error(data);
           this.setState({isFetching:false});
           this.sortorder(data.orders);
          }).catch(err => {
              //console.error(err);
            alert(err.toString());
          });
      }
      sortorder = (orders) => {
          let sort = [];
          let total_price = 0;
          //console.error(orders);
          for(let r = 0; r < orders.length; r++){
              let index = sort.findIndex(x => x.order_id === orders[r].order_id);
              if(index < 0){
                  sort.push({
                      order_id: orders[r].order_id,
                      status: orders[r].status,
                      date_created: orders[r].date_created,
                      price:parseFloat(orders[r].price),
                      gift_certificate:orders[r].gift_certificate
                  });
                  total_price = total_price + parseFloat(orders[r].price);
              }else if(index > -1){
                  sort[index].price = parseFloat(sort[index].price) + parseFloat(orders[r].price);
                  
              }
          }
          //console.error(sort);
          this.setState({orders:sort,allorders:orders});

      }
      detailorders = async (order) =>{
         let items = {order:order,allorders:this.state.allorders};
         await this.props.dispatch(orderdetails(items)); 
         this.props.navigation.navigate('view_orders');
      }
    render(){
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
              <SafeAreaView>
              <View>
                <View style={{flexDirection:'row',marginTop:30}}>
                <IonIcon onPress={() => this.props.navigation.navigate(this.props.data.whichpage)} name="ios-arrow-back" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>
                <Text style={{width:'72%',color:'#000000',fontSize:20,fontFamily:'Montserrat-SemiBold',textAlign:'center'}}>My Orders</Text>
                <IonIcon onPress={() => this.props.navigation.navigate('cart')} name="md-cart" size={26} color="#000000" style={{width:'7.5%',textAlign:'center'}}></IonIcon>
                <IonIcon onPress={() => this.props.navigation.navigate('home')} name="md-home" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>
                </View>
                {
                    this.state.isFetching == true &&
                    <ActivityIndicator size="large" color ="#EC5198"/>
                }
                {
                    this.state.orders.map((order) =>
                <View>
                    <Card containerStyle={{backgroundColor:'#fff',borderRadius:10,marginStart:1,width:'99%'}}>
                       
                            <View style={{marginTop:7}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:16,color:'#222222',fontFamily:'Montserrat-Regular',width:'70%'}}>Order {order.order_id}</Text>
                                    <Text style={{marginRight:'auto',color:'#9b9b9b',fontFamily:'Montserrat-Regular',fontSize:14,marginTop:2}}>{order.date_created}</Text>
                                </View>
                                <Text style={{fontSize:16,color:'#9b9b9b',fontFamily:'Montserrat-Regular',fontSize:14,marginTop:12}}>Tracking Number :
                                <Text style={{fontSize:16,color:'#222222',fontFamily:'Montserrat-Regular',fontSize:14}}>{order.order_id}</Text>
                                </Text>
                                <Text style={{fontSize:16,color:'#9b9b9b',fontFamily:'Montserrat-Regular',fontSize:14,marginTop:5}}>Total Amount :
                                <Text style={{fontSize:16,color:'#222222',fontFamily:'Montserrat-Regular',fontSize:14}}>{currencyFormatter.format((parseFloat(order.price) - parseFloat(order.gift_certificate)), { code: 'NGN' })}</Text>
                                </Text>
                                <View style={{marginTop:12,flexDirection:'row'}}>
                                    <Text onPress = {() =>this.detailorders(order)} style={{width:'30%',fontFamily:'Montserrat-Regular',textAlign:'center',borderColor:'#222222',borderRadius:20,borderWidth:1,padding:5}}>Details</Text>
                                    <Text style={{width:'70%',fontFamily:'Montserrat-Regular',padding:5,textAlign:'right',fontSize:14,color:'#E57C29'}}>{order.status}</Text>
                                </View>
                            </View>
                         
                    </Card>
                </View>
                   )
                }
                {
                    this.props.data.orders.length == 0 && 
                    <View style={{backgroundColor:'#fff',padding:10,marginTop:5}}>
                         <Text style={{color:'#666666',fontSize:14,fontFamily:'Montserrat-Regular'}}>No Order Placed yet..</Text>
                    </View>
                }
                
              </View>
              </SafeAreaView>
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
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(OrdersScreen);