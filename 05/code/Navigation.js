
import { createStackNavigator, createAppContainer } from 'react-navigation';
import App  from './screens/App';   
import Home from './screens/Home';
import Comic from './screens/Comic';
import Character from './screens/Character';

const AppNavigator = createStackNavigator({
    App: {
      //  screen: App
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

  export default createAppContainer(AppNavigator);
  