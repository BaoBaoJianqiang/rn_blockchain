import React, {
    Component
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight
} from 'react-native'

import userInfo from './UserInfo';

export default class S16View extends Component {
    constructor (props) {
        super(props)
        this._onPressButton = this._onPressButton.bind(this)
    }

    _onPressButton() {
        userInfo.userId = '';
        userInfo.userName = '';
        userInfo.age = '';
        userInfo.address = '';
        userInfo.idNumber = '';
        userInfo.phone = '';
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo), 
            () => this.props.navigation.navigate('AuthScreen'));
    }

    componentDidMount () {
    }

    render () {
        return (
            <View >
              <Text style={textStyle}>{userInfo.userId}</Text>
                <Text />
                <Text />
              <Text style={textStyle}>{userInfo.userName}</Text>
                <Text />
                <Text />
              <Text style={textStyle}>{userInfo.age}</Text>
                <Text />
                <Text />
              <Text style={textStyle}>{userInfo.address}</Text>
                <Text />
                <Text />
              <Text style={textStyle}>{userInfo.idNumber}</Text>
                <Text />
                <Text />
              <Text style={textStyle}>{userInfo.phone}</Text>
                <Text />
                <Text />
              <TouchableHighlight onPress={this._onPressButton}>
                <Text style={textStyle}>注销用户</Text>
              </TouchableHighlight>
            </View >
        )
    }
}

const textStyle = {
  width:200,
  height:30,
  fontSize:25,
  backgroundColor:'#DAC',
  textAlign:'center'
};