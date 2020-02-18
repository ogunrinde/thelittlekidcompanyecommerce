import React, { Component } from 'react';
import {View,BackHandler,Platform, Text,StyleSheet,TextInput,Picker,TouchableOpacity,Image} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import {connect} from 'react-redux';
import {newshippingaddress} from '../action/fetch';
import Modal from 'react-native-modal';

class ShippingScreen extends React.Component {
    static navigationOptions = {
        header:null
    };
    constructor(props){
       super(props);
       this.state = {
           checked:false,
           address:'',
           state:'',
           country:'',
           phone_number:'',
           email:'',
           modalVisible:false
       }
    }
    componentDidMount(){
        let address = this.props.data.shipping.length > 0 ? this.props.data.shipping[this.props.data.shipping.length-1].address :'';
        let state = this.props.data.shipping.length > 0 ? this.props.data.shipping[this.props.data.shipping.length-1].state :'';
        let country = this.props.data.shipping.length > 0 ? this.props.data.shipping[this.props.data.shipping.length-1].country :'';
        let phone_number = this.props.data.shipping.length > 0 ? this.props.data.shipping[this.props.data.shipping.length-1].phone_number :'';
        let email = this.props.data.shipping.length > 0 ? this.props.data.shipping[this.props.data.shipping.length-1].email :'';
        this.setState({address:address,state:state,country:country,phone_number:phone_number,email:email});
        if(Platform.OS === 'android') this.handleAndroidBackButton();
    }
    handleAndroidBackButton = () => {
        BackHandler.addEventListener('hardwareBackPress', () => {

        });
      };
     componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', () => {});
     } 
    checked =()=>{
        this.setState({checked:!this.state.checked});
    }
    shippingaddress = async () => {
        const {address, state, country, phone_number,email} = this.state;
        if(address == '' || state == '' || country == '' || phone_number == '' || email == '') {
            this.setState({modalVisible:!this.state.modalVisible});
            return false;
        }
        let data = {address:address,state:state,country:country,phone_number:phone_number,email:email};
        await this.props.dispatch(newshippingaddress(data));
        //console.error(this.props.data.newshippingaddress);
        this.props.navigation.navigate('payment');
    }
    closemodal = () =>{
        this.setState({modalVisible:!this.state.modalVisible});
    }
    render(){
        return(
           <View style={styles.container}>
               <View style={{flexDirection:'row',marginTop:30}}>
               <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>
               <Text style={{width:'80%',color:'#000000',fontSize:15,fontFamily:'Montserrat-SemiBold',textAlign:'center'}}>Shipping</Text>
               <IonIcon onPress={() => this.props.navigation.navigate('cart')} name="md-cart" size={26} color="#000000" style={{width:'10%',textAlign:'center'}}></IonIcon>
               </View>
               <Modal isVisible={this.state.modalVisible}>
                    <View style={{backgroundColor:'#fff',width:'98%',height:300,marginRight:0,alignSelf:'center' }}>
                        <Image
                                source={require('../assets/images/info.png')}
                                style={{width:80,height:80, alignSelf:'center',marginTop:40,marginBottom:15}}
                                />
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Bold',textAlign:'center'}}>Alert</Text> 
                        <Text style={{color:'#000',fontSize:15,fontFamily:'Montserrat-Regular',textAlign:'center',marginTop:20}}>All Input fields are required</Text>        
                        <View style={{flexDirection:'row',padding:10,alignSelf:'center',marginTop:15}}>
                    
                            <TouchableOpacity onPress = {this.closemodal}>
                                <Text style={{color:'#fff',fontSize:13,borderWidth:1,borderRadius:5,borderColor:'#ec5198',padding:12,marginRight:5,backgroundColor:'#ec5198',fontFamily:'Montserrat-Bold'}}>OKAY</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>  
               <View style={{marginTop:32}}>
                   <Text style={{alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                       Kindly supply your shipping details
                   </Text>
               </View>
               <View style={{marginTop:20}}>
                <TextInput
                     value = {this.state.address}
                     onChangeText = {(text) => this.setState({address:text})}
                     placeholder ="Address"
                     style ={styles.text}
                />
                <Picker
                style={{height: 50, width: '100%',color:'#4f4f4f'}}
                selectedValue = {this.state.state}
                onValueChange = {(itemValue) => this.setState({state:itemValue})}
                >
                <Picker.Item label="State" value =""  />
                <Picker.Item label="Lagos" value="Lagos" />
                <Picker.Item label="Abuja FCT" value="Abuja FCT" />
                <Picker.Item label="Abia" value="Abia" />
                <Picker.Item label="Adamawa" value="Adamawa" />
                <Picker.Item label="Anambra" value="Anambra" />
                <Picker.Item label="Bauchi" value="Bauchi" />
                <Picker.Item label="Bayelsa" value="Bayelsa" />
                <Picker.Item label="Benue" value="Benue" />
                <Picker.Item label="Borno" value="Borno" />
                <Picker.Item label="Cross River" value="Cross River" />
                <Picker.Item label="Delta" value="Delta" />
                <Picker.Item label="Edo" value="Edo" />
                <Picker.Item label="Enugu" value="Enugu" />
                <Picker.Item label="Gombe" value="Gombe" />
                <Picker.Item label="Imo" value="Imo" />
                <Picker.Item label="Jigawa" value="Jigawa" />
                <Picker.Item label="Kaduna" value="Kaduna" />
                <Picker.Item label="Kano" value="Kano" />
                <Picker.Item label="Katsina" value="Katsina" />
                <Picker.Item label="Kogi" value="Kogi" />
                <Picker.Item label="Kwara" value="Kwara" />
                <Picker.Item label="Nassarawa" value="Nassarawa" />
                <Picker.Item label="Ogun" value="Ogun" />
                <Picker.Item label="Ondo" value="Ondo" />
                <Picker.Item label="Osun" value="Osun" />
                <Picker.Item label="Oyo" value="Oyo" />
                <Picker.Item label="Plateau" value="Plateau" />
                <Picker.Item label="Rivers" value="Rivers" />
                <Picker.Item label="Sokoto" value="Sokoto" />
                <Picker.Item label="Taraba" value="Taraba" />
                <Picker.Item label="Yobe" value="Yobe" />
                <Picker.Item label="Zamfara" value="Zamfara" />
                </Picker>
                <Text style={{borderBottomWidth:1, position:'relative',top:-15,color:'#4f4f4f',fontSize:15,fontWeight:'normal',borderBottomColor:'#C1c1c1'}}></Text>
                <Picker
                style={{height: 50, width: '100%',color:'#4f4f4f'}}
                selectedValue = {this.state.country}
                onValueChange = {(itemValue) => this.setState({country:itemValue})}
                >
                <Picker.Item label="Country" value ="" />
                <Picker.Item label="Nigeria" value="Nigeria" />
                </Picker>
                <Text style={{borderBottomWidth:1, position:'relative',top:-19,color:'#4f4f4f',fontSize:15,fontWeight:'normal',borderBottomColor:'#C1c1c1'}}></Text>
                <TextInput
                     keyboardType={'numeric'}
                     onChangeText = {(text) => this.setState({phone_number:text})}
                     value = {this.state.phone_number}
                     placeholder ="Phone Number"
                     style ={styles.text}
                    />
                <TextInput
                     onChangeText = {(text) => this.setState({email:text})}
                     value = {this.state.email}
                     placeholder ="Email Address"
                     style ={styles.text}
                    />
                   
                     
                <TouchableOpacity onPress = {this.shippingaddress} style={{marginTop:20,backgroundColor:'#EC5198',borderRadius:4,padding:13}}>
                    <Text style={{color:'#fff',alignSelf:'center', fontFamily:'Montserrat-SemiBold'}}>Proceed to Payment</Text>
                </TouchableOpacity>           
               </View>
           </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
       backgroundColor:'#fff',
       padding:15
    },
    text:{
        color:'#4f4f4f',fontSize:15,fontWeight:'normal',borderBottomColor:'#C1c1c1',paddingStart:0,borderBottomWidth:1,marginBottom:10
       },
})
//export default ShippingScreen;
const mapStateToProps = state => {
    return {
        data: state.Reducer
    };
};
export default connect(mapStateToProps)(ShippingScreen);