/**
 * Created by Rabbit 下午6:58
 */

import React, {Component} from 'react';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    DeviceEventEmitter
} from 'react-native';

const { width , height} = Dimensions.get('window');

import Routers from './Routers';

export default class App extends Component {
    state={
        badgeNumber:11
    }
    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('badge',(number)=>{
            this.setState({
                badgeNumber:number
            })
        });
    };

    componentWillUnmount(){
        this.subscription.remove();
    };
    render() {
        const { dispatch, nav } = this.props;

        return(
            <View style={{flex:1}}>
                <Routers/>                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});