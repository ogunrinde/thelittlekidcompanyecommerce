import React, {Component} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/home';
import CartScreen from '../screens/cart';
import FavoriteScreen from '../screens/favorite';
import CategoryScreen from '../screens/category';
import ProfileScreen from '../screens/profile';


const Tab = createBottomTabNavigator({
    home: {
      screen:HomeScreen,
      navigationOptions: {
        header:null,
        title:'Home'
      }
    },
    cart: {
      screen:CartScreen,
      navigationOptions: {
        header:null,
        title:'Cart'
      }
    },
    favorite:{
      screen:FavoriteScreen,
      navigationOptions: {
        header:null,
        title:'Favorite'
      }
    },
    profile:{
      screen:ProfileScreen,
      navigationOptions: {
        header:null,
        title:'Profile'
      }
    }
},
{
      defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        
        const { routeName } = navigation.state;
        let IconComponent = IonIcon;
        let iconName;
        if (routeName === 'home') {
          iconName = `md-home`; 
        }
        else if (routeName === 'cart') {
          iconName = `md-cart`; 
        } else if (routeName === 'favorite') {
          iconName = `md-heart-empty`;
        }
        else if (routeName === 'profile') {
          iconName = `md-person`;
        } 
        return <IconComponent name={iconName} size={25} color={tintColor} />;
        
      },
    }),
    tabBarOptions: {

      activeTintColor: '#EC5198',
      inactiveTintColor: '#c1c1c1',
      style:{
        backgroundColor:'#fff'
      },
    },
  },
  {
    headerMode: 'none'
  }
);
Tab.navigationOptions = {
  header: null,
};

export default createAppContainer(Tab);