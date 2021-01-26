import React,{ Component } from 'react';

import {View, Text, ScrollView, Image,StyleSheet, TouchableOpacity} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import cart from './cart';
import currencyFormatter from 'currency-formatter';
import {details} from '../action/fetch';
import SafeAreaView from 'react-native-safe-area-view';

class TermsScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            suggested:[],
            //siteurl:'http://www..com'
        }
    }

    static navigationOption = {
        header:null
    }
    componentDidMount(){
        
    }
    productdetails = (d) =>{
        this.props.dispatch(details(d));
       //console.error(this.props.data.productdetails)
       this.props.navigation.navigate('details');
   }

    render(){
        return (
            <ScrollView style={styles.container}>
                <SafeAreaView>
                <View>
                    <View style={{backgroundColor:'#BA1717',padding:15}}>
                         <View style={{flexDirection:'row',padding:10,marginBottom:20}}>
                          <IonIcon onPress={() => this.props.navigation.goBack()} name="ios-arrow-back" size={26} color="#fff" style={{width:'6%'}}></IonIcon>
                          <Text style={{color:'#fff',width:'92%', fontSize:20,textAlign:'center',marginLeft:'-2%',fontFamily:'Montserrat-SemiBold'}}>Terms and Conditions</Text>
                         </View>
                         <Text style={{color:'#fff', fontSize:15,textAlign:'center',fontFamily:'Montserrat-Bold'}}></Text>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                            Welcome to our website. If you continue to browse and use this website, you are agreeing to comply
                            with and be bound by the following terms and conditions of use, which together with our privacy
                            policy govern The Little Big Kid Company’s relationship with you in relation to this website. If you
                            disagree with any part of these terms and conditions, please do not use our website.
                            The term 'The Little Big Kid Company.' or 'us' or 'we'’ refers to the owner of the website. The term
                            'you' refers to the user or viewer of our website.
                        </Text>
                        
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            1. Use of the Site
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                            You are either at least 18 years of age or are accessing the Site under the supervision of a parent
                            or legal guardian. We grant you a non-transferable and revocable license to use the Site, under
                            the Terms and Conditions described, for the purpose of shopping for personal items sold on the
                            Site. Commercial use or use on behalf of any third party is prohibited, except as explicitly
                            permitted by us in advance. Any breach of these Terms and Conditions shall result in the
                            immediate revocation of the license granted in this paragraph without notice to you. Content
                            provided on this site is solely for informational purposes. Product representations expressed on
                            this Site are those of the vendor and are not made by us. Submissions or opinions expressed on
                            this Site are those of the individual posting such content and may not reflect our opinions.
                            Certain services and related features that may be made available on the Site may require
                            registration or subscription. Should you choose to register or subscribe for any such services or
                            related features, you agree to provide accurate and current information about yourself, and to
                            promptly update such information if there are any changes. Every user of the Site is solely
                            responsible for keeping passwords and other account identifiers safe and secure.
                            The account owner is entirely responsible for all activities that occur under such password or
                            account. Furthermore, you must notify us of any unauthorized use of your password or account.
                            The Site shall not be responsible or liable, directly or indirectly, in any way for any loss or
                            damage of any kind incurred as a result of, or in connection with, your failure to comply with
                            this section. During the registration process you agree to receive promotional emails from the
                            Site. You can subsequently opt out of receiving such promotional e-mails by clicking on the link
                            at the bottom of any promotional email.
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            2. User Submissions
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                            Anything that you submit to the Site and/or provide to us, including but not limited to, questions,
                            reviews, comments, and suggestions (collectively, "Submissions") will become our sole and exclusive
                            property and shall not be returned to you.
                            In addition to the rights applicable to any Submission, when you post comments or reviews to the
                            Site, you also grant us the right to use the name that you submit, in connection with such review,
                            comment, or other content.
                            You shall not use a false e-mail address, pretend to be someone other than yourself or otherwise
                            mislead us or third parties as to the origin of any Submissions. We may, but shall not be obligated to,
                            remove or edit any Submissions.
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            3. Order acceptance and Pricing
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                                Please note that there are cases when an order cannot be processed for various reasons. The Site
                                reserves the right to refuse or cancel any order for any reason at any given time. You may be asked to
                                provide additional verifications or information, including but not limited to phone number and
                                address, before we accept the order.
                                We are determined to provide the most accurate pricing information on the Site to our users;
                                however, errors may still occur, such as cases when the price of an item is not displayed correctly on
                                the website. As such, we reserve the right to refuse or cancel any order. In the event that an item is

                                mispriced, we may, at our own discretion, either contact you for instructions or cancel your order
                                and notify you of such cancellation.
                                We shall have the right to refuse or cancel any such orders whether or not the order has been
                                confirmed and your credit card charged.
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            4. Trademarks and Copyrights
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                                All intellectual property rights, whether registered or unregistered, in the Site, information content on
                                the Site and all the website design, including, but not limited to, text, graphics, software, photos,
                                video, music, sound, and their selection and arrangement, and all software compilations, underlying
                                source code and software shall remain our property.
                                The entire contents of the Site also are protected by copyright as a collective work under Nigeria
                                copyright laws and international conventions. All rights are reserved.
                        </Text>
                        
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            5. Applicable Law and Jurisdiction
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                            These Terms and Conditions shall be interpreted and governed by the laws in force in the Federal
                            Republic of Nigeria. Subject to the Arbitration section below, each party hereby agrees to submit to
                            the jurisdiction of the courts of Nigeria and to waive any objections based upon venue.
                        </Text>
                        
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                            6. Arbitration
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                            Any controversy, claim or dispute arising out of or relating to these Terms and Conditions will be
                            referred to and finally settled by private and confidential binding arbitration before a single arbitrator
                            held in Nigeria in English and governed by Nigeria law, as amended, replaced or re-enacted from
                            time to time.
                            The arbitrator shall be a person who is legally trained and who has experience in the information
                            technology field in Nigeria and is independent of either party. Notwithstanding the foregoing, the
                            Site reserves the right to pursue the protection of intellectual property rights and confidential
                            information through injunctive or other equitable relief through the courts.
                        </Text>
                        
                        
                        <Text style={{textAlign:'justify',marginTop:30,lineHeight:25, color:'#000', fontSize:15,alignSelf:'center',fontFamily:'Montserrat-Bold'}}>
                                9. Termination
                        </Text>
                        <Text style={{textAlign:'justify',marginTop:20,lineHeight:25, color:'#000', fontSize:13,alignSelf:'center',fontFamily:'Montserrat-Regular'}}>
                                In addition to any other legal or equitable remedies, we may, without prior notice to you,
                                immediately terminate the Terms and Conditions or revoke any or all of your rights granted under
                                the Terms and Conditions.
                                Upon any termination of this Agreement, you shall immediately cease all access to and use of the Site
                                and we shall, in addition to any other legal or equitable remedies, immediately revoke all password(s)
                                and account identification issued to you and deny your access to and use of this Site in whole or in
                                part.
                                Any termination of this agreement shall not affect the respective rights and obligations (including
                                without limitation, payment obligations) of the parties arising before the date of termination. You
                                furthermore agree that the Site shall not be liable to you or to any other person as a result of any
                                such suspension or termination.
                                If you are dissatisfied with the Site or with any terms, conditions, rules, policies, guidelines, or
                                practices of The Little Big Kid Company. in operating the Site, your sole and exclusive remedy is to
                                discontinue using the Site.
                        </Text>
                        
                        
                        
                        
                        
                        
                        
                        
                    </View>
                    
                    
                </View>
                </SafeAreaView>    
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
export default connect(mapStateToProps)(TermsScreen);
//export default TipScreen;