import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { variableDeclaration } from '@babel/types';
import PokemonDetails from './pokemonDetails';

export default class PokemonList extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            dataSource: [],
            itemPressed: false,
            itemUrl: ''
        };
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.results
                })
            })
            .catch(error => alert('Unable to fetch data'))
    }

    pokemonDetails(url) {
        console.log(url);
        this.setState({ itemClicked: true, itemUrl: url });
        this.props.navigation.navigate('Details', {itemUrl: url});
    }

    backPressed = () => {
        this.setState({ itemClicked: false });
    }

    _renderItem = ({ item, index }) => (<View style={styles.container}>
        <TouchableOpacity onPress={() => this.pokemonDetails(item.url)}>
            <Text style={styles.details}>{item.name}</Text>
        </TouchableOpacity>
    </View>);

    render() {
        let { itemClicked, itemUrl } = this.state;

        // if (itemClicked) {
        //     return <PokemonDetails itemUrl={itemUrl} func={this.backPressed} />
        // }

        return (
            <FlatList
                data={this.state.dataSource}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    details: {
        margin: 10,
        fontWeight: "900"
    }
});