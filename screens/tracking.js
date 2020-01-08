import React,{ Component } from 'react';

import {View, Text, ScrollView, Image,StyleSheet} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
class TrackingScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status:'Processing',
            date_shipped:'Unknown',
            date_delivered:'Unknown'
        }
    }

    static navigationOption = {
        header:null
    }
    componentDidMount(){
        this.wrapping();
    }
    wrapping = () => {
        for(let r = 0; r< this.props.data.orders.length; r++){
            if(this.props.data.orderdetails.order_id == this.props.data.orders[r].order_id){
                this.setState({status:this.props.data.orders[r].status});
                this.setState({date_shipped:this.props.data.orders[r].date_shipped});
                this.setState({date_delivered:this.props.data.orders[r].date_delivered});
                //console.error(this.props.data.orders[r]);
            }
        }
    }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={{backgroundColor:'#000000',padding:5}}>
                         <View style={{flexDirection:'row',padding:10,marginBottom:20}}>
                          <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#fff" style={{width:'6%'}}></IonIcon>
                          <Text style={{color:'#fff',width:'92%', fontSize:20,textAlign:'center',marginLeft:'-2%',fontFamily:'Montserrat-SemiBold'}}>Tracking</Text>
                         </View>
                    </View>
                    <View style={{marginTop:20}}>
                        <View style={{padding:10,flexDirection:'row',alignSelf:'center',width:'100%'}}>
                          <View style={{width:'10%',margin:0}}>
                          <IonIcon name="md-checkmark-circle" size={36} color="#EC5198" style={{width:'100%',alignSelf:'center', marginTop:12}}></IonIcon>
                          </View>
                          <View style={{width:'35%',margin:0}}>
                          <View style={{borderBottomColor:'#EC5198',marginStart:-5, borderBottomWidth:3,marginTop:30}}></View>
                          </View>
                          <View style={{width:'10%'}}>
                          {
                              this.state.status == 'Shipped' || this.state.status == 'Delivered' &&
                              <IonIcon name="md-checkmark-circle" size={36} color="#EC5198" style={{width:'100%',alignSelf:'center', marginTop:12}}></IonIcon>
                          }
                          {
                              this.state.status != 'Shipped' && this.state.status != 'Delivered' &&
                              <Octicons name="primitive-dot" size={56} color="#EC5198" style={{marginStart:-5, alignSelf:'center',marginTop:3}}></Octicons>

                          }    
                          </View>
                          <View style={{width:'35%'}}>
                          <View style={{borderBottomColor:'#EC5198', borderBottomWidth:3,marginTop:30,marginStart:-5}}></View>
                          </View>
                          <View style={{width:'10%'}}>
                              {
                                  this.state.status == 'Delivered' &&
                                  <IonIcon name="md-checkmark-circle" size={36} color="#EC5198" style={{width:'100%',alignSelf:'center', marginTop:12}}></IonIcon>

                              }
                              {
                                  this.state.status != 'Delivered' &&
                                  <Octicons name="primitive-dot" size={56} color="#EC5198" style={{marginStart:-5, alignSelf:'center',marginTop:3}}></Octicons>

                              }

                          </View>
                        </View>
                      
                   </View>
                   <View style={{marginTop:-15}}>
                        <View style={{padding:10,flexDirection:'row',alignSelf:'center',width:'100%'}}>
                          <View style={{width:'33.33%',margin:0}}>
                            <Text>Processing</Text>                          
                          </View>
                          <View style={{width:'33.33%',margin:0}}>
                            <Text style={{alignSelf:'center'}}>Shipped</Text>                          
                          </View>
                          <View style={{width:'33.33%'}}>
                          <Text style={{alignSelf:'flex-end'}}>Deliver</Text>                          
                          </View>
                          
                        </View>
                      
                   </View>
                    <View style={{marginTop:20}}>
                    <Card containerStyle={{backgroundColor:'#fff'}}>
                        <View>
                            <View>
                                <Text style={{fontSize:16,color:'#000000',width:'60%'}}>Tracking Number</Text>
                                <Text style={{marginRight:'auto',color:'#35A4F4',fontSize:14,marginTop:2}}>{this.props.data.orderdetails.order_id}</Text>
                            </View>
                            
                        </View>
                    </Card>
                </View>
                <View style={{marginTop:20,padding:15}}>
                        <View>
                            <View>
                                <Text style={{fontSize:16,color:'#000000',width:'60%'}}>{this.state.date_shipped}</Text>
                                <Text style={{marginRight:'auto',color:'#AFAFAF',fontSize:14,marginTop:2}}>Seller shipped your Order</Text>
                            </View>
                            
                        </View>
                    
                </View>
                <View style={{marginTop:10,padding:10}}>
                        <View>
                            <View>
                                <Text style={{fontSize:16,color:'#000000',width:'60%'}}>{this.state.date_delivered}</Text>
                                <Text style={{marginRight:'auto',color:'#AFAFAF',fontSize:14,marginTop:2}}>Seller shipped your Order</Text>
                            </View>
                            
                        </View>
                    
                </View>
                
                    
                    
                </View>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:0,
        backgroundColor:'#fff'
    }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(TrackingScreen);