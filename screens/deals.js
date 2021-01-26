import React, {Component} from 'react';
import {Text, View, SafeAreaView, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect } from 'react-redux';
import {details} from '../action/fetch';
import currencyFormatter from 'currency-formatter';

class DealScreen extends React.Component {
    static navigationOPtions = {
        header :null
    };
    constructor(props){
        super(props);
        this.state ={
            siteurl:'http://www.thelittlebigkidcompany.com.ng',
            deals:[],
            searchdeals:[]
        }
    };
    productdetails = (d) =>{
        this.props.dispatch(details(d));
       //console.error(this.props.data.productdetails)
       this.props.navigation.navigate('details');
   }
   componentDidMount(){
        this.setState({deals:this.props.data.deals,searchdeals:this.props.data.deals});
   }
   getText = (val) => {
    let searchdeal = [];
    for(let f  = 0; f < this.props.data.deals.length; f++){
        let index = this.props.data.deals[f].name.toLowerCase().search(val.toLowerCase());
        
        if(index > -1){
            searchdeal.push(this.props.data.deals[f]);
        }
    }
    if(val == ''){
        this.setState({deals:this.props.data.deals,searchdeals:this.props.data.deals});
    }else{
        this.setState({deals:searchdeal,searchdeals:searchdeal});
    }
    
  }

    render(){
        return (
           <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                <SafeAreaView>
                 <View style={{flexDirection:'row'}}>
                     <View style={{width:'10%'}}>
                       <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#000" style={{width:'40%'}}></IonIcon>
                     </View>
                     <View style={{width:'90%',jus:'center',marginStart:'20%'}}>
                       <Text style={{width:'50%',marginTop:2,fontFamily:'Montserrat-Bold',textAlign:'center',fontSize:15}}>Deals of the week</Text>
                     </View>
                 </View>
                 <View style={{flexDirection:'row',padding:10,paddingLeft:0}}>
                 <TextInput 
                      onChangeText = {(text)=> this.getText(text)}
                      placeholder="Search for Product"
                      style = {{backgroundColor:'#e2e2e2',borderRadius:60,paddingStart:10,width:'100%',padding:6,marginStart:5,marginEnd:5,marginTop:10}}
                     />
                 </View>
                 <View style={{marginTop:10,marginBottom:20}}>
                     <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            this.state.deals.map((deal) =>
                             
                            <View key = {deal.id} value = {deal.id} style={{backgroundColor:"#fff",width:'48%',padding:5,marginRight:3,marginTop:5}}>
                         
                            <View style={{width:30,height:30,borderRadius:15,position:'relative',alignSelf:'flex-end',marginRight:'10%',marginTop:'5%',backgroundColor:'#d71515',fontSize:8}}>
                               <Text style={{backgroundColor:'#d71515',fontSize:12,color:'#fff',alignSelf:'center',marginTop:6}}>{deal.discount}%</Text>
                            </View>  
                            <TouchableOpacity onPress = {() =>this.productdetails(deal)}>    
                            <Image
                              source={{uri: `${this.state.siteurl+'/public/images/'+deal.picture.split('|')[0]}`}}
                              style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                              />
                            <Text numberOfLines={1} style={{alignSelf:'center',color:'#666666',fontSize:13,marginTop:5,textTransform:'capitalize'}}>{deal.name}</Text>
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Text style={{ alignSelf:'center',color:'#d71515',fontSize:13, fontFamily:'Montserrat-Bold'}}>{currencyFormatter.format(deal.newprice, { code: 'NGN' })}
                            </Text>
                            <Text style={{marginStart:4,marginTop:1,width:'40%',textDecorationLine: 'line-through',fontFamily:'Montserrat-Regular', fontSize:10,marginTop:3}}>NGN {deal.price}</Text>

                            </View>
                            </TouchableOpacity>
                         </View>
                            
                            )
                        } 
                         
                        
                     </View>
                     
                 </View>
                 </SafeAreaView> 
           </ScrollView>
        );
    }
   
}

const styles = StyleSheet.create({
    container:{
        padding:15,
        flex:1,
        backgroundColor:'#f3f6f8'
    }
})
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(DealScreen);