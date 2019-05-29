import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { createStore } from 'redux';

export default class PokemonList extends React.Component {
    constructor() {
        super();
        this.state = {
            pokemonItems : []
        }
    }

    reducer = function(state, action) {
        if(action.type === "GETITEMS") {
            return action.payload;
        }
        return state;
    }

    store = createStore(reducer, "Value from store");

    componentWillMount() {
        store.dispatch({type: 'GETITEMS', payload: this.getPokeItems()});

        store.subscribe(() => {
            console.log("Store is:", store.getState());
        })
    }

    getPokeItems = () => {
        var itemsFromAPI;
        console.log('API');

        fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(response => response.json())
        .then(responseJson => responseJson)
    }

    render() {
        //store.dispatch({type: 'DEFEND', payload: 'return from dispatch -- 2'})
        // pokemonDetails = () => {
        //     store.dispatch({type: "true", details: fetch('https://pokeapi.co/api/v2/version/1')})
        // }
        
      
      return (
            <View>
                <TouchableOpacity 
                    onPress = {() => this.pokemonDetails()}
                />
                <Text>Pokemon Items</Text>
            </View>
        );
    }
  }
  