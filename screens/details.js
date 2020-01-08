import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView,Image,Dimensions, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Carousel from 'react-native-carousel';
import ReactInterval from 'react-interval';
import {Card} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {itemcart} from '../action/fetch';
import currencyFormatter from 'currency-formatter';
import {details,whichpage,products,total_price} from '../action/fetch';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const productwidth = width * 0.5;
class DetailsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            images:['ride.png','flat.png','haven.png'],
            imgnow:'ride.png',
            modalVisible:false,
            suggested:[],
            siteurl:'http://www.thelittlebigkidcompany.com.ng',
            images:[],
            currentimage:'',
            login:false
        }
      }
    static navigationOptions = {
        header :null
    };
    componentDidMount(){
        let suggested = []
        for(let r  = 0; r < this.props.data.suggested.length;r++){
            suggested.push(this.props.data.suggested[r]);
            if(r == 1) break;
        }
        let images = [];
        if(Object.keys(this.props.data.productdetails).length > 0){
           let images = this.props.data.productdetails.picture.split('|');
           this.setState({images:images,currentimage:images[0]});
           //console.error(this.state.siteurl+'/public/images/'+images[0]);
           //console.error(images[0]);
        }
        
        this.setState({suggested:suggested});
    }
    changeview = () =>{
        let index = this.state.images.indexOf(this.state.currentimage);
        if(index == this.state.images.length - 1) this.setState({currentimage:this.state.images[0]});
        else {
            let s = index + 1;
            this.setState({currentimage:this.state.images[s]});
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
    addproduct = async () =>{
        let cart = [];
        cart = this.props.data.carts;
        //console.error(this.props.data.carts);
        //cart.push(this.props.data.productdetails);

        let cost = this.props.data.productdetails.deal == '1' ? this.props.data.productdetails.newprice : this.props.data.productdetails.price;
        //console.error(cost);
        cart.push({
            name: this.props.data.productdetails.name,
            price:this.props.data.productdetails.price,
            newprice:this.props.data.productdetails.newprice,
            discount:this.props.data.productdetails.discount,
            deal:this.props.data.productdetails.deal,
            cost:cost,
            quantity:1,
            id:this.props.data.productdetails.id,
            description:this.props.data.productdetails.description,
            image:this.props.data.productdetails.picture,
        })
        await this.props.dispatch(itemcart(cart));
        let price = parseFloat(this.props.data.total_price) + parseFloat(cost);
        let d = {price:price};
        this.props.dispatch(total_price(d));
        //console.error(this.props.data.carts);
        this.setState({modalVisible:true});
    }
    loginUser = async () => {
        let data = {page:'details'};
        this.setState({login:false});
        await this.props.dispatch(whichpage(data)); 
        this.props.navigation.navigate('login');
    }
    love = (product) => {
        if(Object.keys(this.props.data.userData).length == 0){
            this.setState({login:true});
            return false;
        }else {
            let allproducts = this.props.data.products;
            if(product.loved == undefined || product.loved == false){
                let index = allproducts.findIndex(x=>x.id == product.id);
                allproducts[index].loved = true;
                product.loved = true;
                this.props.dispatch(details(product));
                let stock = {
                    products:allproducts,
                    deals:this.props.data.deals,
                    featured:this.props.data.featured,
                    suggested:this.props.data.suggested,
                    article:this.props.data.article
                  };
                  this.props.dispatch(products(stock));
                //this.setState({featured:allfeatured,searchfeatured : allfeatured});
            }  
            else {
                let index = allproducts.findIndex(x=>x.id == product.id);
                allproducts[index].loved = false;
                product.loved = false;
                this.props.dispatch(details(product));
                let stock = {
                    products:allproducts,
                    deals:this.props.data.deals,
                    featured:this.props.data.featured,
                    suggested:this.props.data.suggested,
                    article:this.props.data.article
                  };
                  this.props.dispatch(products(stock));
                //this.setState({featured:allfeatured,searchfeatured : allfeatured});
            }

        }
    }
    goCart = async  () => {
        await this.setState({modalVisible:false});
        this.props.navigation.navigate('cart');
    }
    render (){
        return(
            <View style = {styles.container}>
              <View style={{flex:6}}>
              <ScrollView showsVerticalScrollIndicator = {false}>  
                <View>
                    <View>
                      <IonIcon onPress = {() => this.props.navigation.goBack()} name="ios-arrow-back" size={20} color="#000000" style={{width:'5%'}}></IonIcon>
                    </View>
                    <View>
                    <Modal isVisible={this.state.modalVisible}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                        <Image
                                source={require('../assets/images/checked.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Success</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>Product added successfully to cart</Text>        
                        <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                            <TouchableOpacity onPress = {() => this.props.navigation.goBack()}>
                                <Text onPress = {this.action} style={{color:'#ec5198',fontSize:13,borderWidth:2,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,fontFamily:'Montserrat-Bold'}}>Continue Shopping</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.goCart}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>Go to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Modal> 
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
                    <ReactInterval timeout={3000} enabled={true}
                    callback={this.changeview} />  
                        {
                            this.state.images.map((img) =>
                              this.state.currentimage == img &&
                              <Image
                              key={img} value = {img}
                              source={{uri: `${this.state.siteurl+'/public/images/'+img}`}}
                              style={{width:'70%', aspectRatio:1/1,alignSelf:'center'}}                      
                              />
                              
                            )
                        }
 
                    <View style={{flexDirection:'row', alignSelf:'center',marginTop:7}}>
                        {
                            this.state.images.map((img) =>
                            this.state.currentimage == img ?
                            
                            (<Octicons key={img+'1'} value = {img+'1'} name="primitive-dot" size={15} color="#EC5198" style={{width:'6%',marginTop:3,opacity:1}}></Octicons>):      
                            (<Octicons key={img+'1'} value = {img+'1'} name="primitive-dot" size={15} color="#EC5198" style={{width:'6%',marginTop:3,opacity:0.3}}></Octicons>)
                            )
                        }  
                      
                    </View>
                    <View style={{flexDirection:'row', marginTop:15,borderBottomWidth:1,borderBottomColor:'#c1c1c1',padding:15,paddingLeft:0,paddingRight:0}}>
                        <Text style={{marginStart:0,width:'90%', fontFamily:'Montserrat-Bold',fontSize:15,color:'#666666'}}>{this.props.data.productdetails.name}</Text>
                        {
                                (this.props.data.productdetails.loved == undefined || this.props.data.productdetails.loved == false)  &&
                               <IonIcon onPress = {() => this.love(this.props.data.productdetails)} name="ios-heart-empty" size={20} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                        }
                        {
                            this.props.data.productdetails.loved == true &&
                            <IonIcon onPress = {() => this.love(this.props.data.productdetails)} name="ios-heart" size={20} color="#ec5198" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                        }
                    </View>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#c1c1c1',paddingBottom:15}}>
                        <Text style={{color:'#35a4f4',marginTop:10,fontFamily:'Montserrat-Bold'}}>
                            DESCRIPTION
                        </Text>
                        <Text style={{fontSize:10,textAlign:'justify',fontFamily:'Montserrat-Regular',marginTop:10}}>{this.props.data.productdetails.description}</Text>
                    </View>
                    {/*
                    <View style={{borderBottomWidth:1,borderBottomColor:'#c1c1c1',paddingBottom:15}}>
                        <Text style={{color:'#35a4f4',marginTop:10,fontFamily:'Montserrat-Bold'}}>
                            REVIEWS
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{width:'80%',fontSize:11,fontFamily:'Montserrat-Bold', color:'#4f4f4f'}}>Peter</Text>
                            <Text style={{fontSize:11,fontFamily:'Montserrat-Regular', color:'#4f4f4f'}}>23/04/2002</Text>
                        </View>
                        <Text style={{fontSize:10,fontFamily:'Montserrat-Regular',marginTop:10}}>The description of the product</Text>
                    </View>
                    */}
                    <View style={{paddingBottom:15}}>
                        <Text style={{color:'#35a4f4',marginTop:10,fontFamily:'Montserrat-Bold'}}>
                            SUGGESTIONS
                        </Text>
                        <View style={{flexDirection:'row', marginTop:15}}>
                        {
                            this.props.data.suggested.map((suggest) =>
                                <View style={{width:'50%'}} key = {suggest.id} value={suggest.id}>   
                                <Image
                                    source={{uri: `${this.state.siteurl+'/public/images/'+suggest.picture.split('|')[0]}`}}
                                    style={{width:'70%',height:80, alignSelf:'center'}}                        
                                    />
                                <Text numberOfLines={1} style={{fontFamily:'Montserrat-Regular',color:'#666666', fontSize:13,alignSelf:'center'}}>{suggest.name}</Text>
                                </View>
                            )
                        }   
                       </View>
                    </View>
                   
                    
                        
                </View>
                
            </ScrollView>
              </View>  
              <View style={{flex:1}}>
                   <View>
                   
                    <View style={{width:'100%'}}>
                        <Card
                        containerStyle={{width:'100%',padding:4,borderRadius:10,marginStart:0,backgroundColor:'#EC5198',borderColor:'#EC5198'}}
                        >
                        <TouchableOpacity onPress = {this.addproduct} style={{flexDirection:'row',padding:4}}>
                          <Text style={{width:'auto',marginStart:'25%',marginRight:'10%',fontFamily:'Montserrat-Bold',marginTop:4,color:'#fff',alignSelf:'center',fontSize:14}}>Add to Cart
                          </Text>  
                          {
                              this.props.data.productdetails.deal == '1' &&
                              <Text style={{padding:7,backgroundColor:'background: rgba(196, 196, 196, 0.5),',color:'#fff',borderRadius:10,fontFamily:'Montserrat-Bold'}}> {currencyFormatter.format(this.props.data.productdetails.newprice, { code: 'NGN' })}</Text>

                          }
                          {
                              this.props.data.productdetails.deal != '1' &&
                              <Text style={{padding:7,backgroundColor:'background: rgba(196, 196, 196, 0.5),',color:'#fff',borderRadius:10,fontFamily:'Montserrat-Bold'}}> {currencyFormatter.format(this.props.data.productdetails.price, { code: 'NGN' })}</Text>

                          }
  
                        </TouchableOpacity>    
                        
                        </Card>
                    </View>
                   </View>
                   
              </View>
           </View>
        );
    }

}
const styles  = StyleSheet.create({
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
export default connect(mapStateToProps)(DetailsScreen);