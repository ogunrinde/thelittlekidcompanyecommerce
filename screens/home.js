import React, { Component } from 'react';
import {View, Text, StyleSheet,ScrollView,Image,TouchableOpacity, TouchableHighlight} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Carousel from 'react-native-carousel';
import ReactInterval from 'react-interval';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import DealScreen from './deals';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {details,search} from '../action/fetch';
import currencyFormatter from 'currency-formatter';
import Modal from 'react-native-modal';
import {whichpage,products} from '../action/fetch';

class HomeScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
      super(props);
      this.state = {
          view : 1,
          opacityo:1,
          opacityt:0.3,
          opacityth:0.3,
          deals:[],
          featured:[],
          siteurl:'http://www.thelittlebigkidcompany.com.ng',
          login:false
      }
    }
    componentDidMount(){
        let deals = []
        let featured = [];
        for(let r  = 0; r < this.props.data.deals.length;r++){
            deals.push(this.props.data.deals[r]);
            if(r == 1) break;

        }
        for(let r  = 0; r < this.props.data.featured.length;r++){
            featured.push(this.props.data.featured[r]);
            if(r == 1) break;
        }
        this.setState({deals:deals,featured:featured});
    }
    changeview = () =>{
        if(this.state.view == 3) this.setState({view:1});
        else {
            let s = this.state.view + 1;
            this.setState({view:s});
        }
        if(this.state.view == 1){
            this.setState({opacityo:1});
            this.setState({opacityt:0.3});
            this.setState({opacityth:0.3});
        }else if(this.state.view == 2){
            this.setState({opacityo:0.3});
            this.setState({opacityt:1});
            this.setState({opacityth:0.3});   
        }else if(this.state.view == 3){
            this.setState({opacityo:0.3});
            this.setState({opacityt:0.3});
            this.setState({opacityth:1});   
        }
    }
    productdetails = (d) =>{
         this.props.dispatch(details(d));
        //console.error(this.props.data.productdetails)
        this.props.navigation.navigate('details');
    }
    addfavorite = (product) =>{
        let param = {data:product};
        fetch('http://www.thelittlebigkidcompany.com.ng/api/auth/addfavorite', {
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body : JSON.stringify(param)
        }).then(data => data.json()).then(data => {
            //console.error(data);
            if(data.status){
                let stock = {
                    favorites:data.favorites,
                    deals:this.props.data.deals,
                    featured:this.props.data.featured,
                    suggested:this.props.data.suggested,
                    article:this.props.data.article
                  };
                  this.props.dispatch(products(stock)); 
            }
               
            }).catch(err => {
                console.error(err);
            alert(err.toString());
            });
    }
    age = async (val) => {
        let param = {
            age:val,
            sex:''
        };
        await this.props.dispatch(search(param));
        this.props.navigation.navigate('search');
    }
    loginUser = async () => {
        let data = {page:'featured'};
        this.setState({login:false});
        await this.props.dispatch(whichpage(data)); 
        this.props.navigation.navigate('login');
    }
    love = (product) => {
        if(Object.keys(this.props.data.userData).length == 0){
            this.setState({login:true});
            return false;
        }else {
            let allfeatured = this.state.featured;
            if(product.loved == undefined || product.loved == false){
                let index = allfeatured.findIndex(x=>x.id == product.id);
                allfeatured[index].loved = true;
                this.addfavorite(product);
                this.setState({featured:allfeatured,searchfeatured : allfeatured});
            }  
            else {
                let index = allfeatured.findIndex(x=>x.id == product.id);
                allfeatured[index].loved = false;
                this.setState({featured:allfeatured,searchfeatured : allfeatured});
            }

        }
    }
    render(){
        return(
            <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                <View>
                   <View style={{flexDirection:'row',marginTop:20}}>
                       <Text style={{color:'#000000',fontFamily:'Montserrat-Bold',fontSize:15,width:'85%',textAlign:'center'}}>Home</Text>
                       <View style={{flexDirection:'row'}}>
                         <IonIcon onPress = {() => this.props.navigation.navigate('search')} name="md-search" size={25} color="#000" style={{position:'relative',textAlign:'right',marginRight:10}}></IonIcon>
                         <IonIcon onPress = {() => this.props.navigation.navigate('profile')} name="ios-notifications-outline" size={25} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                       </View>
                   </View>
                   <Modal isVisible={this.state.login}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                        <Image
                                source={require('../assets/images/info.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Alert</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Kindly login to  Add Favorites</Text>        
                        <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                            <TouchableOpacity onPress = {this.loginUser}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',backgroundColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>SIGN IN</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {()=>this.setState({login:false})}>
                                <Text style={{color:'#ec5198',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#fff',fontFamily:'Montserrat-Bold'}}>NO THANKS</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                   <View style={{flexDirection:'row', marginTop:35}}>
                           <Text style={{fontFamily:'Montserrat-Bold',width:'100%', fontSize:14}}>Shopping Tips</Text>
                   </View>
                   {
                       this.props.data.article.length > 0 &&
                       <View style={{backgroundColor:'#7dd148',marginTop:10,height:250,padding:15,paddingTop:20}}>
                       <Image
                                source={require('../assets/images/lightbulb.png')}
                                style={{width:30,height:30,alignSelf:'center',marginTop:20}}
                        />
                        <View style={{flexShrink:1,marginTop:20}}>
                            <TouchableOpacity onPress={() =>this.props.navigation.navigate('tip')}>
                              <Text style={{fontSize:17,color:'#fff',marginTop:'10%',textAlign:'center',fontFamily:'Montserrat-Bold'}}>{this.props.data.article.length > 0 ? this.props.data.article[this.props.data.article.length - 1].topic: ''}</Text>
                              <Text style={{fontSize:13,color:'#fff',marginTop:'18%',alignSelf:'center', fontFamily:'Montserrat-Regular'}}>{this.props.data.article.length > 0 ? this.props.data.article[this.props.data.article.length - 1].date_created : ''} </Text>
                            </TouchableOpacity>
                        </View>
                        
                       </View>
                   }
                   
                   {/*
                   <ReactInterval timeout={5000} enabled={true}
                   callback={this.changeview} />
                   {
                       this.state.view == 1 && <View style={{backgroundColor:'#f8d9d9',marginTop:10,height:140,padding:10}}>
                       <Image
                                source={require('../assets/images/discount.png')}
                                style={{width:30,height:30,alignSelf:'center'}}
                        />
                        <View style={{flexShrink:1}}>
                            <Text style={{fontSize:14,marginTop:12,alignSelf:'center',fontFamily:'Montserrat-Regular',color:'#000000'}}>Up to 5% discount on goods bought</Text>
                            <Text style={{fontSize:13,marginTop:15,alignSelf:'center', fontFamily:'Montserrat-Regular',color:'#4f4f4f'}}>Free Gift Wrapping and Gift Certificate 
                            </Text>
                            
                        </View>
                        
                       </View>
                   }    
                   
                   {
                       this.state.view == 2 &&  <View style={{backgroundColor:'#e8f5e4',marginTop:10,height:140,flexDirection:'row',paddingRight:10}}>
                       <Image
                                source={require('../assets/images/haven.png')}
                                style={{width:116,height:127}}
                        />
                        <View style={{flexShrink:1}}>
                            <Text style={{fontSize:17,marginTop:4,fontFamily:'Montserrat-Regular',color:'#000000'}}>Meet the dolls</Text>
                            <Text style={{fontSize:13, fontFamily:'Montserrat-Regular',color:'#4f4f4f'}}>Let’s start discovering, playing and imagining today with any of the dolls 
                            </Text>
                            <TouchableOpacity style={{backgroundColor:'#ec5198',padding:10,width:108,borderRadius:5,marginTop:14}}>
                             <Text style={{fontSize:13,fontFamily:'Montserrat-SemiBold', color:'#000',alignSelf:'center',fontSize:13,color:'#fff',borderRadius:10}}>Shop Now</Text>
                            </TouchableOpacity>
                        </View>
                        
                       </View>
                   }
                   
                   {
                       this.state.view == 3 && 
                       <View style={{backgroundColor:'#e1e8ee',marginTop:10,height:140,flexDirection:'row',padding:10}}>
                   
                       <View style={{flexShrink:1}}>
                           <Text style={{fontSize:17,marginTop:2,fontFamily:'Montserrat-Regular',color:'#000000'}}>Classic Ride-Ons</Text>
                           <Text style={{fontSize:13, fontFamily:'Montserrat-Regular',color:'#4f4f4f'}}>Keep their happy little feet busy with plasma and pedal cars 
                           </Text>
                           <TouchableOpacity style={{backgroundColor:'#ec5198',padding:10,width:108,borderRadius:5,marginTop:14}}>
                            <Text style={{fontSize:13,fontFamily:'Montserrat-SemiBold', color:'#000',alignSelf:'center',fontSize:13,color:'#fff',borderRadius:10}}>Shop Now</Text>
                           </TouchableOpacity>
                       </View>
                       <Image
                               source={require('../assets/images/ride.png')}
                               style={{width:116,height:127}}
                       />
                       
                      </View>
                   }
                   
                   
                   <View style={{flexDirection:'row', alignSelf:'center',marginTop:7}}>
                      <Octicons name="primitive-dot" size={15} color="#EC5198" style={{width:'6%',marginTop:3,opacity:this.state.opacityo}}></Octicons>
                      <Octicons name="primitive-dot" size={15} color="#EC5198" style={{width:'6%',marginTop:3,opacity:this.state.opacityt}}></Octicons>
                      <Octicons name="primitive-dot" size={15} color="#EC5198" style={{width:'6%',marginTop:3,opacity:this.state.opacityth}}></Octicons>
                   </View>
                   */}
                   <View>
                       <View style={{flexDirection:'row', marginTop:35}}>
                           <Text style={{fontFamily:'Montserrat-Bold',width:'80%', fontSize:14}}>Deals of the week</Text>
                           <Text onPress = {()=>this.props.navigation.navigate('deals')} style={{textAlign:'right',fontFamily:'Montserrat-Regular',width:'20%', fontSize:12, color:'#35A4F4'}}>View all</Text>
                       </View>
                       <View style={{flexDirection:'row', marginTop:15,flexWrap:'wrap'}}>
                           {
                               this.state.deals.map((deal)=>
                               <View style={{width:'50%'}} key = {deal.id} value={deal.id}>
                                   
                                    <View style={{width:30,height:30,borderRadius:15,position:'relative',alignSelf:'flex-end',marginRight:'10%',backgroundColor:'#d71515',fontSize:8}}>
                                    <Text style={{backgroundColor:'#d71515',fontSize:12,color:'#fff',alignSelf:'center',marginTop:6}}>{deal.discount}%</Text>
                                    </View>   
                                    <TouchableOpacity onPress = {() =>this.productdetails(deal)}>
                                    <Image
                                    source={{uri: `${this.state.siteurl+'/public/images/'+deal.picture.split('|')[0]}`}}
                                    style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                                    />
                                    <Text style={{fontFamily:'Montserrat-Regular',color:'#666666', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>{deal.name}</Text>
                                    <Text style={{fontFamily:'Montserrat-Bold',color:'#d71515', fontSize:13,alignSelf:'center'}}>{currencyFormatter.format(deal.newprice, { code: 'NGN' })}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                           }
                           
                           
                       </View>
                       <View style={{marginTop:35}}>
                     <Text style={{fontSize:14,fontFamily:'Montserrat-Bold',marginBottom:10}}>Shop by Age</Text>
                     <View style={{flexDirection:'row'}}>
                         
                     <Card
                        containerStyle={{borderRadius:3,width:'24.5%',margin:2,backgroundColor:'#7dd148',borderColor:'#7dd148',padding:12}}
                        style={{width:'50%',color:'#fff',borderRadius:30}}>   
                        <Text onPress = {() => this.age('0-3years')} style={{fontSize:12,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>0-3years</Text>
                    </Card>
                   
                    
                    <Card
                        containerStyle={{borderRadius:3,width:'24.5%',margin:2,backgroundColor:'#Ec5198',borderColor:'#Ec5198',padding:12}}
                        style={{width:'50%',color:'#Ec5198',borderRadius:30}}>
                        <Text onPress = {() => this.age('4-6years')} style={{fontSize:12,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>4-6years</Text>
                    </Card>
                    
                    <Card
                        containerStyle={{borderRadius:3,width:'24%',margin:2,backgroundColor:'#f5bc62',borderColor:'#f5bc62',padding:12}}
                        style={{width:'50%',color:'#f5bc62',borderRadius:30}}>
                        <Text onPress = {() => this.age('7-9years')} style={{fontSize:12,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>7-9years</Text>
                    </Card>
                    
                    
                    <Card
                        containerStyle={{borderRadius:3,width:'25%',margin:2,backgroundColor:'#35a4f4',borderColor:'#35a4f4',padding:12}}
                        style={{width:'50%',color:'#f5bc62',borderRadius:30}}>  
                        <Text onPress = {() => this.age('9-12years')} style={{fontSize:12,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>9-12years</Text>
                    </Card>
                    
                     </View>
                 </View>
                 <View style={{flexDirection:'row', marginTop:35}}>
                           <Text style={{fontFamily:'Montserrat-Bold',width:'80%', fontSize:14}}>Featured Products</Text>
                           <Text onPress = {()=>this.props.navigation.navigate('featured')} style={{textAlign:'right',fontFamily:'Montserrat-Regular',width:'20%', fontSize:12, color:'#35A4F4'}}>View all</Text>
                       </View>
                 <View style={{flexDirection:'row', marginTop:15, marginBottom:30}}>
                        {
                           this.state.featured.map((featured)=>
                           <View style={{width:'50%'}} key = {featured.id} value={featured.id}>
                            {
                                (featured.loved == undefined || featured.loved == false)  &&
                               <IonIcon onPress = {() => this.love(featured)} name="ios-heart-empty" size={20} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                            }
                            {
                                featured.loved == true &&
                               <IonIcon onPress = {() => this.love(featured)} name="ios-heart" size={20} color="#ec5198" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                            }   
                            <TouchableOpacity onPress = {() =>this.productdetails(featured)}>
                            <Image
                              source={{uri: `${this.state.siteurl+'/public/images/'+featured.picture.split('|')[0]}`}}
                              style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                              />    
                            <Text style={{fontFamily:'Montserrat-Regular',color:'#666666', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>{featured.name}</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000', fontSize:13,alignSelf:'center'}}>{currencyFormatter.format(featured.price, { code: 'NGN' })}</Text>
                            </TouchableOpacity>
                           </View>
                        )}   
                            
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
        padding:15,
        backgroundColor:'#fff'
    }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(HomeScreen);