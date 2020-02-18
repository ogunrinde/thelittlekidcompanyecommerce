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
import ArrivalScreen from '../screens/arrival';
import TermsScreen from '../screens/terms';

const Onboard = createStackNavigator({
    onboardone:{
        screen:OnboardoneScreen
    },
    onboardtwo:{
        screen:OnboardtwoScreen
    },
    onboardthree:{
        screen:OnboardthreeScreen
    }
});

const Login = createStackNavigator({
    login:{
        screen:LoginScreen
    }
});

const Register = createStackNavigator({
    register:{
        screen:RegisterScreen
    }
});

const Carddetails = createStackNavigator({
    carddetails:{
        screen:CardDetails,
        navigationOptions: {
            header:null
        }
    },
});

const Payment = createStackNavigator({
    payment:{
        screen:PaymentScreen
    }
});

const Stack = createStackNavigator({
    tab:{
        screen:Tab,
        navigationOptions: {
            header:null
        }
    },
    terms:{
        screen:TermsScreen,
        navigationOptions:{
            header:null
        }
    },
    arrival:{
        screen:ArrivalScreen,
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
    shipping:{
        screen:ShippingScreen
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

const ecommerce = createSwitchNavigator({
    onboard:{
        screen:Onboard
    },
    stack:{
        screen:Stack
    },
    login:{
        screen:Login
    },
    register:{
        screen:Register
    },
    payment:{
        screen:Payment
    },
    carddetails:{
        screen:CardDetails
    }
    
    
})

export default createAppContainer(ecommerce);