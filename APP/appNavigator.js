import {createStackNavigator, createAppContainer} from 'react-navigation';
import PokemonList from './pokemonList';
import PokemonDetails from './pokemonDetails';

const MainNavigator = createStackNavigator({
    Home: PokemonList,
    Details: PokemonDetails,
  });
  
  const AppNavigator = createAppContainer(MainNavigator);
  
  export default AppNavigator;
