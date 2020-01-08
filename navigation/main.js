import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import PaymentScreen from '../screens/payment';
import ShippingScreen from '../screens/shipping';
import FilterScreen from '../screens/filter';
import SearchScreen from '../screens/search';
import Tab from './index';
import WelcomeScreen from '../screens/welcome';
import OnboardoneScreen from '../screens/onboardone';
import OnboardtwoScreen from '../screens/onboardtwo';
import OnboardthreeScreen from '../screens/onboardthree';
import TipScreen from '../screens/tips';
import TrackingScreen from '../screens/tracking';
import DetailsScreen from '../screens/details';
import CardDetails from '../screens/carddetails';
import DealScreen from '../screens/deals';
import FeatureScreen from '../screens/featured';
import OrdersScreen from '../screens/orders';
import ViewsScreen from '../screens/view_orders';


const Main = createStackNavigator({
    welcome:{
        screen:WelcomeScreen,
        navigationOptions:{
            header:null
        }
    },
    details:{
        screen:DetailsScreen
    },
    orders:{
        screen:OrdersScreen,
        navigationOptions:{
            header:null
        }
    },
    view_orders:{
        screen:ViewsScreen,
        navigationOptions:{
            header:null
        }
    },
    tracking:{
        screen:TrackingScreen,
        navigationOptions:{
            header:null
        }
    },
    deals:{
        screen:DealScreen,
        navigationOptions: {
            header:null
        }
    },
    featured:{
        screen:FeatureScreen,
        navigationOptions: {
            header:null
        }
    },
    tab:{
        screen:Tab
    },
    carddetails:{
        screen:CardDetails,
        navigationOptions: {
            header:null
        }
    },
    tip:{
        screen:TipScreen,
        navigationOptions: {
            header:null
        }
    },
    filter:{
        screen:FilterScreen
    },
    search:{
        screen:SearchScreen,
        navigationOptions: {
            header:null
        }
    },
    payment:{
        screen:PaymentScreen
    },
    shipping:{
        screen:ShippingScreen
    },
    register:{
        screen:RegisterScreen
    },
    login:{
        screen:LoginScreen
    },
    tab:{
        screen:Tab,
        navigationOptions: {
            header:null
        }
    }
},
{
    headermode:'none'
}
);
export default createAppContainer(Main);