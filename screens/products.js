import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, ScrollView, TextInput,TouchableOpacity, Alert} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {details} from '../action/fetch';
import currencyFormatter from 'currency-formatter';
import Modal from 'react-native-modal';
import {whichpage,products} from '../action/fetch';

class ProductScreen extends React.Component {
    static navigationOPtions = {
        header :null
    };
    constructor(props){
        super(props);
        this.state ={
            siteurl:'http://www.thelittlebigkidcompany.com.ng',
            products:[],
            searchfeatured:[],
            login:false
        }
    };
    productdetails = (d) =>{
        this.props.dispatch(details(d));
       //console.error(this.props.data.productdetails)
       this.props.navigation.navigate('details');
    }
    componentDidMount(){
        this.setState({products:this.props.data.featured,searchfeatures:this.props.data.featured});
       // console.error(this.props.data.products.length);
   }
    getText = (val) => {
        let searchfeatured = [];
        //Alert.alert('ss');
        for(let f  = 0; f < this.props.data.products.length; f++){
            let index = this.props.data.products[f].name.toLowerCase().search(val.toLowerCase());
            
            if(index > -1){
                searchfeatured.push(this.props.data.products[f]);
            }
        }
        if(val == ''){
            this.setState({products:this.props.data.products,searchfeatured:this.props.data.products});
        }else{
            this.setState({products:searchfeatured,searchfeatured:searchfeatured});
        }
        
    }
    loginUser = async () => {
        let data = {page:'featured'};
        this.setState({login:false});
        await this.props.dispatch(whichpage(data)); 
        this.props.navigation.navigate('login');
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
    love = (product) => {
        if(Object.keys(this.props.data.userData).length == 0){
            this.setState({login:true});
            return false;
        }else {
            let allfeatured = this.state.featured;
            if(product.loved == undefined || product.loved == false){
                let index = allfeatured.findIndex(x=>x.id == product.id);
                allfeatured[index].loved = true;
                this.setState({featured:allfeatured,searchfeatured : allfeatured});
                this.addfavorite(product);
            }  
            else {
                let index = allfeatured.findIndex(x=>x.id == product.id);
                allfeatured[index].loved = false;
                this.setState({featured:allfeatured,searchfeatured : allfeatured});
            }

        }
    }

    render(){
        return (
           <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                 <View style={{flexDirection:'row'}}>
                     <View style={{width:'10%'}}>
                       <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#000" style={{width:'40%'}}></IonIcon>
                     </View>
                     <View style={{width:'90%',jus:'center',marginStart:'20%'}}>
                       <Text style={{width:'50%',marginTop:2,fontFamily:'Montserrat-Bold',textAlign:'center',fontSize:15}}>Search Product</Text>
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
                             this.state.products.map((featured)=>
                             <View key = {featured.id} value={featured.id} style={{backgroundColor:"#fff",width:'48%',padding:5,marginRight:3,marginTop:5}}>
                            
                             <TouchableOpacity onPress = {() =>this.productdetails(featured)}>    
                             <Image
                              source={{uri: `${this.state.siteurl+'/public/images/'+featured.picture.split('|')[0]}`}}
                              style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                              />
                              <Text style={{alignSelf:'center',color:'#666666',fontSize:13,textTransform:'capitalize'}}>{featured.name}</Text>
                              <View style={{flexDirection:'row',alignSelf:'center'}}>
                              <Text style={{ alignSelf:'center',color:'#d71515',fontSize:13, fontFamily:'Montserrat-Bold'}}>{currencyFormatter.format(featured.price, { code: 'NGN' })}
                              </Text>
  
                              </View>
                              </TouchableOpacity>
                             </View>
                             )
                         }
                         
                        
                     </View>
                     
                 </View>
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
export default connect(mapStateToProps)(ProductScreen);