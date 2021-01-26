import React, {Component} from 'react';
import {Text, SafeAreaView, View, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect}  from 'react-redux';
import {details} from '../action/fetch';
import currencyFormatter from 'currency-formatter';
import {whichpage,products} from '../action/fetch';
import Modal from 'react-native-modal';

class SearchScreen extends React.Component {
    static navigationOPtions = {
        header :null
    };
    constructor(props){
        super(props);
        this.state ={
            siteurl:'http://www.thelittlebigkidcompany.com.ng',
            products:[],
            searchproducts:[],
            login:false
        }
    };
    productdetails = (d) =>{
        this.props.dispatch(details(d));
       //console.error(this.props.data.productdetails)
       this.props.navigation.navigate('details');
   }
   componentDidMount(){
    this.setState({products:this.props.data.products,searchproducts:this.props.data.products});
    //console.error(this.props.data.products);    
}
    getText = (val) => {
    let search = [];
    for(let f  = 0; f < this.props.data.products.length; f++){
        let index = this.props.data.products[f].name.toLowerCase().search(val.toLowerCase());
        
        if(index > -1){
            search.push(this.props.data.products[f]);
        }
    }
    if(val == ''){
        this.setState({products:this.props.data.products,searchproducts:this.props.data.products});
    }else{
        this.setState({products:search,searchproducts:search});
    }

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
    loginUser = async () => {
        let data = {page:'search'};
        this.setState({login:false});
        await this.props.dispatch(whichpage(data)); 
        this.props.navigation.navigate('login');
    }
    love = (product) => {
        if(Object.keys(this.props.data.userData).length == 0){
            this.setState({login:true});
            return false;
        }else {
            let allproducts = this.state.products;
            if(product.loved == undefined || product.loved == false){
                let index = allproducts.findIndex(x=>x.id == product.id);
                allproducts[index].loved = true;
                this.addfavorite(product);
                this.setState({products:allproducts,searchproducts : allproducts});
            }  
            else {
                let index = allproducts.findIndex(x=>x.id == product.id);
                allproducts[index].loved = false;
                this.setState({products:allproducts,searchproducts : allproducts});
            }

        }
    }

    render(){
        return (
           <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                <SafeAreaView>
                 <View style={{flex:1,alignSelf:'center'}}>
                     
                     {
                         this.props.data.searchdata.category != '' && this.props.data.searchdata.age == '' &&
                         <Text style={{marginTop:20,fontFamily:'Montserrat-Regular',textAlign:'center',fontSize:20,textTransform:'capitalize'}}>{this.props.data.searchdata.category}</Text>
                     }
                     {
                         this.props.data.searchdata.category == '' && this.props.data.searchdata.age != '' &&
                         <Text style={{marginTop:20,fontFamily:'Montserrat-Bold',textAlign:'center',fontSize:20}}>{this.props.data.searchdata.age}</Text>
                     }
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
                 <View style={{flexDirection:'row',padding:10,paddingLeft:0,marginTop:0}}>
                 <IonIcon onPress={() => this.props.navigation.navigate('home')} name="ios-arrow-back" size={26} color="#000" style={{width:'6%',marginTop:10}}></IonIcon>
                 
                 <TextInput 
                      onChangeText = {(text)=> this.getText(text)}
                      placeholder="Search for Product"
                      style = {{backgroundColor:'#e2e2e2',borderRadius:60,paddingStart:10,width:'88%',padding:6,marginStart:5,marginEnd:5}}
                     />
                     
                    <IonIcon onPress={() => this.props.navigation.navigate('cart')} name="md-cart" size={26} color="#000" style={{width:'6%',marginTop:10,justifyContent:'center'}}></IonIcon>    
                 </View>
                 <View style={{marginTop:10,marginBottom:20}}>
                     <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                         {
                             this.state.products.map((product) =>
                             (this.props.data.searchdata.age == product.age || (product.category != null && this.props.data.searchdata.category.toLowerCase() === product.category.toLowerCase())) &&
                             <View style={{backgroundColor:"#fff",width:'48%',padding:5,marginRight:3,marginTop:5}} key = {product.id} value = {product.id}>
                            {
                                (product.loved == undefined || product.loved == false) &&
                               <IonIcon onPress = {() => this.love(product)} name="ios-heart-empty" size={20} color="#000" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                            }
                            {
                                product.loved == true &&
                               <IonIcon onPress = {() => this.love(product)} name="ios-heart" size={20} color="#ec5198" style={{position:'relative',textAlign:'right',marginRight:8}}></IonIcon>      
                            }
                            
                            <TouchableOpacity onPress = {() =>this.productdetails(product)}>
                            <Image
                              source={{uri: `${this.state.siteurl+'/public/images/'+product.picture.split('|')[0]}`}}
                              style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                              />
                            
                                <Text numberOfLines= {1} style={{alignSelf:'center',color:'#666666',fontSize:13,textTransform:'capitalize'}}>{product.name}</Text>
                                <Text style={{alignSelf:'center',color:'#1d1e1e',fontSize:13, fontFamily:'Montserrat-Bold'}}>{currencyFormatter.format(product.price, { code: 'NGN' })}</Text>
                            </TouchableOpacity>
                            </View>
                             )}
                         
                         
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
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(SearchScreen);