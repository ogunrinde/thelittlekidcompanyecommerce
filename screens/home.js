import React, { Component } from 'react';
import {View,Dimensions, Text,ImageBackground, StyleSheet,ScrollView,Image,TouchableOpacity, TouchableHighlight, ActivityIndicator} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Carousel from 'react-native-carousel';
import ReactInterval from 'react-interval';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import DealScreen from './deals';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import {details,search,updatelogin,login} from '../action/fetch';
import currencyFormatter from 'currency-formatter';
import Modal from 'react-native-modal';
import {whichpage,products} from '../action/fetch';
import AsyncStorage from '@react-native-community/async-storage';

const heigth = Dimensions.get('window').height / 3;
const width = Dimensions.get('window').width;
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
          height:parseInt(heigth),
          width:parseInt(width),
          deals:[],
          featured:[],
          siteurl:'http://www.thelittlebigkidcompany.com.ng',
          login:false
      }
    }
    componentDidMount(){
        this.getproducts();
        this.getData();
    }
    getData = async () => {
       let data =  await AsyncStorage.getItem('data');
       //console.error(data);
       if(data !== null){
          let value = JSON.parse(data);
          this.props.dispatch(login(value));
       }
    }
    category = async (val) => {
        let param = {
            age:'',
            category:val
        };
        await this.props.dispatch(search(param));
        this.props.navigation.navigate('search');
    }
    setdata(){
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
    getproducts = async () => {
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/app_data`, {
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        }).then(async data => data.json()).then(data => {
              this.setState({isFetching:false});
              //console.error(data);
              //this.props.navigation.navigate('home');
              let stock = {
                          products:data.products,
                          deals:data.deals,
                          featured:data.featured,
                          suggested:data.suggested,
                          arrival:data.arrival,
                          article:data.article
                        };
                        
              this.props.dispatch(products(stock));
              this.setdata();
              //console.error(this.props.data.arrival);
          }).catch(err => {
              this.setState({isFetching:false});
              console.error(err);
            alert(err.toString());
          });
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
            sex:'',
            category:''
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
                { this.props.data.products.length > 0 &&
                <View>
                  <View style = {{padding:15}}>
                    <View style={{flexDirection:'row',marginTop:10,marginBottom:10}}>
                        <View style={{width:'85%'}}>
                        <Image
                                    source={require('../assets/images/logo.png')}
                                    style={{width:100,height:50,marginTop:-5,marginStart:-3}}
                                    />
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <IonIcon onPress = {() => this.props.navigation.navigate('products')} name="md-search" size={25} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                            <IonIcon onPress = {() => this.props.navigation.navigate('cart')} name="md-cart" size={25} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                        </View>
                    </View> 
                  </View>  
                   {
                       this.props.data.arrival.length > 0  &&
                       <View style={{padding:15,paddingTop:0}}>
                           
                        <ImageBackground source={{uri: this.props.data.siteurl+'/public/images/'+this.props.data.arrival[this.props.data.arrival.length-1].image}} style={{width: '100%',height:this.state.height+90}}>    
                            <View style={{flexShrink:1,marginTop:this.state.height-100}}>
                                <TouchableOpacity style={{padding:7,marginStart:10}}>
                                <Text style={{fontSize:30,padding:7,paddingBottom:0,color:'#fff',fontFamily:'Montserrat-Bold'}}>NEW</Text>
                                <Text style={{fontSize:30,padding:7,paddingTop:-10,color:'#fff',fontFamily:'Montserrat-Bold'}}>ARRIVALS</Text>
                                <Text onPress={() =>this.props.navigation.navigate('arrival')} style={{fontSize:17,borderRadius:20,width:'50%',padding:10,color:'#fff',backgroundColor:'#EC5198',textAlign:'center',fontFamily:'Montserrat-Bold'}}>Shop Now</Text>
                                </TouchableOpacity>
                            </View>
                            </ImageBackground>
                        </View>
                   }
                   
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
                <View style={{marginTop:45,padding:15}}>
                <View>
                           <Text style={{fontFamily:'Montserrat-Regular',width:'100%',textAlign:'center', fontSize:20}}>Deals of the week</Text>
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
                       <View style={{marginTop:10}}>
                                <View style={{flexDirection:'row', alignSelf:'center'}}>
                                    <Text onPress = {()=>this.props.navigation.navigate('deals')} style={{alignSelf:'center',width:'auto',padding:4,fontFamily:'Montserrat-Regular', fontSize:12, color:'#35A4F4',borderBottomWidth:1,borderBottomColor:'#35A4F4'}}>
                                        See all 
                                    </Text> 
                                    <IonIcon name="md-arrow-forward" size={16} color="#35A4F4" style={{marginTop:4,marginLeft:5}}></IonIcon>      
                                </View>
                        </View> 
                </View>
                <View style={{padding:15, marginTop:45}}>
                   <View style={{flexDirection:'row'}}>
                           <Text style={{fontFamily:'Montserrat-Regular',width:'100%', fontSize:20,textAlign:'center'}}>Shopping Tips</Text>
                   </View>
                   {
                       this.props.data.article.length > 0 &&
                       <View style={{backgroundColor:'#7dd148',marginTop:15,height:250,paddingTop:20}}>
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
                   <View style={{marginTop:20}}>
                       <View style={{flexDirection:'row', alignSelf:'center'}}>
                           <Text onPress = {()=>this.props.navigation.navigate('tip')} style={{alignSelf:'center',width:'auto',padding:4,fontFamily:'Montserrat-Regular', fontSize:12, color:'#35A4F4',borderBottomWidth:1,borderBottomColor:'#35A4F4'}}>
                               Read More Tips 
                           </Text> 
                           <IonIcon name="md-arrow-forward" size={16} color="#35A4F4" style={{marginTop:4,marginLeft:5}}></IonIcon>      

                       </View>
                            

                    </View> 
                </View>

                <View style={{marginTop:45,backgroundColor:'#FBF2F7',padding:15}}>
                    <View>
                           <Text style={{fontFamily:'Montserrat-Regular',width:'100%',textAlign:'center', fontSize:20}}>Category</Text>
                   </View>
                   <View style={{flexDirection:'row', marginTop:15,flexWrap:'wrap'}}>
                        <View style={{width:'33.33%'}}> 
                            <TouchableOpacity onPress = {() =>this.category('action figures')}>
                            <Image
                            source={require('../assets/images/action-figures.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Action Figures</Text>
                            </TouchableOpacity>
                        </View>   
                        <View style={{width:'33.33%'}}> 
                            <TouchableOpacity onPress = {() =>this.category('adult stuff')}>
                            <Image
                            source={require('../assets/images/adult-stuff.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Adult Stuff</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%'}}> 
                            <TouchableOpacity onPress={() => this.category('baby gifts')}>
                            <Image
                            source={require('../assets/images/baby-gifts.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Baby Gifts</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('baby play')}>
                            <Image
                            source={require('../assets/images/baby-play.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Baby Play</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('build')}>
                            <Image
                            source={require('../assets/images/building-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Build</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('cooking gardening')}>
                            <Image
                            source={require('../assets/images/cooking-gardening.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Cooking Gardening</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('create')}>
                            <Image
                            source={require('../assets/images/create.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Create</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('decorate')}>
                            <Image
                            source={require('../assets/images/decorate.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>decorate</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('dolls')}>
                            <Image
                            source={require('../assets/images/dolls.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Dolls</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('eat')}>
                            <Image
                            source={require('../assets/images/eat.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Eat</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('educational toys')}>
                            <Image
                            source={require('../assets/images/educational-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Educational Toys</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('electronic toys')}>
                            <Image
                            source={require('../assets/images/electronic-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Electronic Toys</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('girl accessories')}>
                            <Image
                            source={require('../assets/images/girl-accessories.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Girl Accessories</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('music')}>
                            <Image
                            source={require('../assets/images/music.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Music</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('Outdoors toys')}>
                            <Image
                            source={require('../assets/images/outdoor-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Outdoor Toys</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('plastic toys')}>
                            <Image
                            source={require('../assets/images/plastic-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Plastic Toys</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('pretend play')}>
                            <Image
                            source={require('../assets/images/pretend-play.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Pretend Play</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('Puzzles')}>
                            <Image
                            source={require('../assets/images/puzzles.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Puzzles</Text>
                            </TouchableOpacity>
                        </View>    
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('rain gear')}>
                            <Image
                            source={require('../assets/images/rain-gear.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Rain Gear</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('read')}>
                            <Image
                            source={require('../assets/images/read.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Read</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('ride-ons')}>
                            <Image
                            source={require('../assets/images/ride-ons.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Ride Ons</Text>
                            </TouchableOpacity>
                        </View> 
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('science projects')}>
                            <Image
                            source={require('../assets/images/science-projects.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Science Projects</Text>
                            </TouchableOpacity>
                        </View>  
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('soft toys')}>
                            <Image
                            source={require('../assets/images/soft-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Soft Toys</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('swim')}>
                            <Image
                            source={require('../assets/images/swim-items.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Swim</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('watches')}>
                            <Image
                            source={require('../assets/images/watches.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Watches</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width:'33.33%',marginTop:20}}> 
                            <TouchableOpacity onPress={() => this.category('wooden toys')}>
                            <Image
                            source={require('../assets/images/wooden-toys.png')}
                            style={{width:'65%',height:70, alignSelf:'center'}}                        
                            />
                            <Text style={{marginTop:15,fontFamily:'Montserrat-Regular',color:'#7C7C7C', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>Wooden Toys</Text>
                            </TouchableOpacity>
                        </View> 
                       </View>
                </View>
                   
                  
                   
                   <View>
                       <View>
                    <View style={{flexDirection:'row', marginTop:35,padding:15}}>
                            <Text style={{fontFamily:'Montserrat-Regular',textAlign:'center',width:'100%', fontSize:20}}>Featured Products</Text>
                            <Text onPress = {()=>this.props.navigation.navigate('featured')} style={{textAlign:'right',fontFamily:'Montserrat-Regular',width:'20%', fontSize:12, color:'#35A4F4'}}>View all</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:15,padding:15}}>
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
                            <Text style={{fontFamily:'Montserrat-Regular',marginTop:10,color:'#666666', fontSize:13,alignSelf:'center',textTransform:'capitalize'}}>{featured.name}</Text>
                            <Text style={{fontFamily:'Montserrat-Bold',color:'#000', fontSize:13,alignSelf:'center'}}>{currencyFormatter.format(featured.price, { code: 'NGN' })}</Text>
                            </TouchableOpacity>
                           </View>
                        )}   
                            
                    </View>
                    <View style={{marginTop:10}}>
                       <View style={{flexDirection:'row', alignSelf:'center'}}>
                           <Text onPress = {()=>this.props.navigation.navigate('featured')} style={{alignSelf:'center',width:'auto',padding:4,fontFamily:'Montserrat-Regular', fontSize:12, color:'#35A4F4',borderBottomWidth:1,borderBottomColor:'#35A4F4'}}>
                               See all 
                           </Text> 
                           <IonIcon name="md-arrow-forward" size={16} color="#35A4F4" style={{marginTop:4,marginLeft:5}}></IonIcon>      
                       </View>
                    </View> 
                    </View>
                       <View style={{marginTop:35,padding:15}}>
                        <Text style={{fontSize:20,textAlign:'center',fontFamily:'Montserrat-Regular',marginBottom:10}}>Shop by Age</Text>
                        <View style={{flexDirection:'row'}}>
                                
                            <Card
                                containerStyle={{borderRadius:3,width:'24.5%',margin:2,backgroundColor:'#7dd148',borderColor:'#7dd148',padding:12}}
                                style={{width:'50%',color:'#fff',borderRadius:30}}>   
                                <Text onPress = {() => this.age('0-3years')} style={{fontSize:11,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>0-3years</Text>
                            </Card>
                        
                            
                            <Card
                                containerStyle={{borderRadius:3,width:'24.5%',margin:2,backgroundColor:'#Ec5198',borderColor:'#Ec5198',padding:12}}
                                style={{width:'50%',color:'#Ec5198',borderRadius:30}}>
                                <Text onPress = {() => this.age('4-6years')} style={{fontSize:11,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>4-6years</Text>
                            </Card>
                            
                            <Card
                                containerStyle={{borderRadius:3,width:'24%',margin:2,backgroundColor:'#f5bc62',borderColor:'#f5bc62',padding:12}}
                                style={{width:'50%',color:'#f5bc62',borderRadius:30}}>
                                <Text onPress = {() => this.age('7-9years')} style={{fontSize:11,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>7-9years</Text>
                            </Card>
                            
                            
                            <Card
                                containerStyle={{borderRadius:3,width:'25%',margin:2,backgroundColor:'#35a4f4',borderColor:'#35a4f4',padding:12}}
                                style={{width:'50%',color:'#f5bc62',borderRadius:30}}>  
                                <Text onPress = {() => this.age('10-12years')} style={{fontSize:11,alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#fff'}}>10-12years</Text>
                            </Card>
                            
                            </View>
                        </View>
                   
                   </View>

                </View>
                }
                
                    
                    {
                        this.props.data.products.length == 0 && 
                         <View style={{marginTop:'45%'}}>
                         <ActivityIndicator size="large" color = "#EC5198"/>
                        </View>
                    }
                    
                
            </ScrollView>
           
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(HomeScreen);