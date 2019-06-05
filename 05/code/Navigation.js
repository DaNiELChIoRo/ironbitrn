
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation'; 
import App  from './screens/App';   
import Home from './screens/Home';
import Comic from './screens/Comic';
import Character from './screens/Character';
import VR from './screens/VR';

const AppNavigator = createStackNavigator({
    App: {
      //  screen: App,
      screen: Home,
    },
    PantallaPrincipal: {
      screen: Home,
    },
    Comic: {
      screen: Comic,
    },
    Character: {
      screen: Character,
    }
  }, {
    // initialRouteName: 'PantallaPrincipal',
  });

  const VRStack = createStackNavigator({
    App: {
       screen: VR,
      // screen: Home,
    },
    PantallaPrincipal: {
      screen: Home,
    },
    Comic: {
      screen: Comic,
    },
    Character: {
      screen: Character,
    }
  }, {
    // initialRouteName: 'PantallaPrincipal',
  });

  const TabNavigator = createBottomTabNavigator({
    Comics: AppNavigator,    
    AR: VRStack 
  });

  export default createAppContainer(TabNavigator);
  