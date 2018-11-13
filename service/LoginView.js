import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Alert,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    NativeModules
} from 'react-native'

import ImagePicker from 'react-native-image-picker';
import userInfo from './UserInfo';

export default class LoginView extends Component {
    username = '';
    password = '';

    constructor (props) {
        super(props)

        this.onLogin = this.onLogin.bind(this);
        this.onRegister = this.onRegister.bind(this);

            AsyncStorage.getItem('userInfo', (err, uInfo) => {
                if(uInfo== null) {
                    return;
                }

                let newUserInfo = JSON.parse(uInfo);
                if (newUserInfo.userId == '')   
                    return;

                userInfo.userId = newUserInfo.userId;
                userInfo.userName = newUserInfo.userName;
                userInfo.age = newUserInfo.age;
                userInfo.address = newUserInfo.address;
                userInfo.idNumber = newUserInfo.idNumber;
                userInfo.phone = newUserInfo.phone;

                this.props.navigation.navigate('MyAppScreen')
            });
    }

    onLogin () {
            let body = 'username=' + this.username + '&password=' + this.password;

            fetch('http://100.84.166.146:8888/others/login',
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: body     
                })
                .then((response) => response.json())
                .then((responseData) => {
                    if(responseData.result.isError == 1) {
                        alert('出错啦');
                    }

                    userInfo.userId = responseData.result.userId;
                    userInfo.userName = responseData.result.userName;

                    userInfo.age = responseData.result.age;
                    userInfo.address = responseData.result.address;
                    userInfo.idNumber = responseData.result.idNumber;
                    userInfo.phone = responseData.result.phone;

                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo), () => this.props.navigation.navigate('MyAppScreen'));
                })
                .done();
    }

    onRegister () {
        //NativeModules.ExampleRNInterface.handleMessage('testMessage');
        this.props.navigation.navigate("RegisterScreen");
    }

    render () {
        return (
            <View>
                <Text />
                <Text />
                <Text />
                <Text />
                <TextInput placeholder="用户" style={textInputStyle} onChangeText={(text) => this.username=text} />
                <Text />
                <Text />
                <TextInput placeholder="密码" style={textInputStyle} secureTextEntry={true} onChangeText={(text) => this.password=text} />
                <Text />
                <Text />
                <TouchableHighlight                    
                    underlayColor='gray'
                    onPress={this.onLogin} >
                    <Text style={textStyle}>登录</Text >
                </TouchableHighlight >
                <Text />
                <Text />
                <Text />
                <Text />
                <TouchableHighlight                    
                    underlayColor='gray'
                    onPress={this.onRegister} >
                    <Text style={textStyle}>注册</Text >
                </TouchableHighlight >
            </View>
        )
    };
}

const textInputStyle = {
  width:200,
  height:30,
  borderColor:"black",
  borderWidth:1,
  marginLeft:5
};

const textStyle = {
  width:200,
  height:30,
  fontSize:25,
  backgroundColor:'#DAC',
  textAlign:'center'
};