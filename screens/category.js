import React, { Component } from 'react';
import {View, Text, ScrollView, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { CheckBox,Card } from 'react-native-elements'
import {search} from '../action/fetch';
import {connect } from 'react-redux';

class CategoryScreen extends React.Component {
    constructor(props){
       super(props);
    }
    static navigationOptions = {
        header:null
    };
    search = async (val) =>{
        let param = {
            sex:val,
            age:''
        };
        //this.props.dispatch(title());
        await this.props.dispatch(search(param));
        this.props.navigation.navigate('search');
    }
    age = async (val) => {
        let param = {
            age:val,
            sex:''
        };
        await this.props.dispatch(search(param));
        this.props.navigation.navigate('search');
    }
    render(){
        return(
           <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                <SafeAreaView>
                 <View style={{flex:1,alignSelf:'center'}}>
                     <Text style={{marginTop:20,fontFamily:'Montserrat-Bold',fontSize:15}}>Categories</Text>
                 </View>
                 <View>
                 <TextInput 
                      placeholder="Search for category"
                      style = {{backgroundColor:'#e2e2e2',marginTop:10,borderRadius:60,paddingStart:20,padding:5}}
                     />
                 </View>
                 <View>
                    <Text style={{fontSize:12,fontFamily:'Montserrat-Regular',marginTop:34,color:'#4f4f4f'}}>GENDER</Text>
                     <View style={{flexDirection:'row'}}>
                         
                         <TouchableOpacity style={{width:'50%'}} onPress={() =>this.search('Male')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#FFDCDC',borderColor:'#FFDCDC',padding:40,paddingLeft:0,paddingRight:0}}
                                style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                                <Text style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>Male</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                         <TouchableOpacity style={{width:'50%'}} onPress={() =>this.search('Female')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#FDbDF6',borderColor:'#FDbDF6',padding:40,paddingLeft:0,paddingRight:0}}
                                style={{width:'50%',color:'#FFDCDC',borderRadius:30}}>
                                <Text  style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>Female</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                     
                     </View>
                    
                     
                 </View>
                 <View>
                 <Text style={{fontSize:12,fontFamily:'Montserrat-Regular',marginTop:34,color:'#4f4f4f'}}>AGE</Text>
                 <View style={{flexDirection:'row'}}>
                         <TouchableOpacity style={{width:'50%'}} onPress={() => this.age('0-3years')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#C8fcb0',borderColor:'#C8fcb0',padding:40,paddingLeft:10,paddingRight:10}}
                                style={{width:'50%',color:'#c8fcb0',borderRadius:30}}>
                                <Text style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>0-3years</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                         <TouchableOpacity style={{width:'50%'}} onPress={() => this.age('4-6years')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#fcf5b4',borderColor:'#fcf5b4',padding:40,paddingLeft:10,paddingRight:10}}
                                style={{width:'50%',color:'#FCf584',borderRadius:30}}>
                                <Text onPress={() => this.age('4-6years')} style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>4-6years</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                     
                     </View>
                 <View style={{flexDirection:'row'}}>
                         <TouchableOpacity style={{width:'50%'}} onPress={() => this.age('7-9years')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#99f1fd',borderColor:'#99f1fd',padding:40,paddingLeft:10,paddingRight:10}}
                                style={{width:'50%',color:'#c8fcb0',borderRadius:30}}>
                                <Text onPress={() => this.age('7-9years')} style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>7-9years</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                         <TouchableOpacity style={{width:'50%'}} onPress={() => this.age('10-12years')}>
                            <Card
                                containerStyle={{marginStart:0,width:'98%',borderRadius:7,backgroundColor:'#ffd0a5',borderColor:'#ffd0a5',padding:40,paddingLeft:10,paddingRight:10}}
                                style={{width:'50%',color:'#FCf584',borderRadius:30}}>
                                <Text onPress={() => this.age('10-12years')} style={{alignSelf:'center',fontFamily:'Montserrat-SemiBold',color:'#4f4f4f'}}>10-12years</Text>
                            
                            </Card>
                           
                         </TouchableOpacity>
                     
                     </View>
                 </View>
                 </SafeAreaView> 
           </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
   container:{
       padding:10,
       flex:1,
       backgroundColor:'#fff'
   }
});
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(CategoryScreen);
//export default ;