import React from 'react';
import { View, Text, BackHandler, ActivityIndicator, StyleSheet } from 'react-native';

export default class PokemonDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemDetails: [],
            isLoading: true,
            itemUrl: this.props.navigation.getParam('itemUrl', 'NA')
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillMount() {
        fetch(this.state.itemUrl)
            .then(response => response.json())
            .then(responseJson => this.setState({ 
                itemDetails: responseJson, 
                isLoading: false 
            }))
            .catch(error => alert('Unable to fetch data'))
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Home');
        return true;
    }

    render() {
        let { itemDetails, isLoading } = this.state;
        return (
            <View>
                {
                    !isLoading ?
                        <View style={styles.container}>
                            <Text style={styles.details}>Name: {itemDetails.name}</Text>
                            <Text style={styles.details}>Height: {itemDetails.height}</Text>
                            <Text style={styles.details}>Weight: {itemDetails.weight}</Text>
                            <Text style={styles.details}>Base Experience: {itemDetails.base_experience}</Text>
                            
                        </View>
                        :
                        <ActivityIndicator />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        margin: 20
    },
    details: {
        margin: 10,
        fontWeight: "900"
    }
});