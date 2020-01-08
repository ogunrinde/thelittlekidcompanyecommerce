import React, { Component } from 'react';
import {View, Text, ScrollView,StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

class FilterScreen extends React.Component {
    constructor(props){
       super(props);
    };
    static navigationOptions = {
        header:null
    }
    render(){
        return(
            <ScrollView showsVerticalScrollIndicator = {false} style={styles.container}>
                <View>
                   <View style={{flexDirection:'row', marginTop:32}}>
                        <Text style={{fontFamily:'Montserrat-Bold',width:'85%',fontSize:20}}>Filter</Text>
                        <Text onPress = {()=>this.props.navigation.goBack()} style={{fontFamily:'Montserrat-Regular',width:'20%',fontSize:15,alignItems:'flex-end'}}>Cancel</Text>
                   </View>
                </View>
                <View style={{marginTop:31}}>
                    <Text style={{color:'#c1c1c1',fontSize:15,marginBottom:20}}>Price</Text>
                    <View style={{flexDirection:'row'}}>
                      <IonIcon name="md-radio-button-on" size={26} color="#ec5198"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>Low to high</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                      <IonIcon name="md-radio-button-off" size={26} color="#dadada"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>High to low</Text>
                    </View>
                </View>
                <View style={{marginTop:31}}>
                    <Text style={{color:'#c1c1c1',fontSize:15,marginBottom:20}}>Gender</Text>
                    <View style={{flexDirection:'row'}}>
                      <IonIcon name="md-radio-button-on" size={26} color="#ec5198"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>Male</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                      <IonIcon name="md-radio-button-off" size={26} color="#dadada"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>Female</Text>
                    </View>
                </View>
                <View style={{marginTop:31}}>
                    <Text style={{color:'#c1c1c1',fontSize:15,marginBottom:20}}>Age</Text>
                    <View style={{flexDirection:'row'}}>
                      <IonIcon name="md-radio-button-on" size={26} color="#ec5198"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>0 - 3 years</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                      <IonIcon name="md-radio-button-off" size={26} color="#dadada"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>4 - 6 years</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                      <IonIcon name="md-radio-button-off" size={26} color="#dadada"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>7 - 9 years</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:20}}>
                      <IonIcon name="md-radio-button-off" size={26} color="#dadada"></IonIcon>
                      <Text style={{color:'#000000',fontFamily:'Montserrat-Regular',fontSize:15,marginStart:20}}>10 - 12 years</Text>
                    </View>
                </View>
                
                <View style={{marginTop:20}}>
                <TouchableOpacity onPress = {() => {this.props.navigation.navigate('home')}} style={{backgroundColor:'#ec5198',padding:10,marginBottom:20, borderRadius:30}}>
                         <Text style={{fontSize:13,fontFamily:'Montserrat-SemiBold', color:'#000',alignSelf:'center',fontSize:15,color:'#fff'}}>Apply</Text>
                     </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'#fff'
    }
})
export default FilterScreen;