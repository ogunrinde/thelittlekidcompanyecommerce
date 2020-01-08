import React,{ Component } from 'react';

import {View, Text, ScrollView, Image,StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import cart from './cart';
import currencyFormatter from 'currency-formatter';
import {details} from '../action/fetch';

class TipScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            suggested:[],
            siteurl:'http://www.thelittlebigkidcompany.com.ng'
        }
    }

    static navigationOption = {
        header:null
    }
    componentDidMount(){
        let suggested = [];
        for(let r  = 0; r < this.props.data.suggested.length;r++){
            suggested.push(this.props.data.suggested[r]);
            if(r == 1) break;
        }
        this.setState({suggested:suggested});
    }
    productdetails = (d) =>{
        this.props.dispatch(details(d));
       //console.error(this.props.data.productdetails)
       this.props.navigation.navigate('details');
   }

    render(){
        return (
            <ScrollView style={styles.container}>
                <View>
                    <View style={{backgroundColor:'#7dd148',padding:15}}>
                         <View style={{flexDirection:'row',padding:10,marginBottom:20}}>
                          <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#fff" style={{width:'6%'}}></IonIcon>
                          <Text style={{color:'#fff',width:'92%', fontSize:20,textAlign:'center',marginLeft:'-2%',fontFamily:'Montserrat-SemiBold'}}>Tips</Text>
                         </View>
                         <Text style={{color:'#fff', fontSize:15,textAlign:'center',fontFamily:'Montserrat-Bold'}}>{this.props.data.article[this.props.data.article.length - 1].topic}</Text>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                        {this.props.data.article[this.props.data.article.length - 1].body}
                        </Text>
                    </View>
                    <View style={{marginTop:10,padding:10}}>
                        <Text style={{fontFamily:'Montserrat-Bold', fontSize:13,color:'#000',marginBottom:10}}>OUR SUGGESTION</Text>
                        <View style={{flexDirection:'row', marginTop:15}}>
                        {
                            this.props.data.suggested.map((suggest) =>
                                <View key={suggest.id} value = {suggest.id} style={{width:'50%',backgroundColor:"#f4f0ed",padding:5,marginRight:3}}> 
                                <TouchableOpacity onPress = {() =>this.productdetails(suggest)}>  
                                <Image
                                    source={{uri: `${this.state.siteurl+'/public/images/'+suggest.picture.split('|')[0]}`}}
                                    style={{width:'70%',aspectRatio:1, alignSelf:'center'}}                        
                                    />
                                <Text numberOfLines={1} style={{alignSelf:'center',color:'#666666',fontSize:13,marginTop:10}}>{suggest.name}</Text>
                                <Text style={{alignSelf:'center',color:'#1d1e1e',fontSize:13, fontFamily:'Montserrat-Bold'}}>{currencyFormatter.format(suggest.price, { code: 'NGN' })}</Text>                              
                                </TouchableOpacity>
                                </View>
                            )
                        }   
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
export default connect(mapStateToProps)(TipScreen);
//export default TipScreen;