import {
    StackNavigator,
    TabNavigator,
    SwitchNavigator,
    addNavigationHelpers    
} from 'react-navigation'

import React from 'react'

import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage,
    Alert,
    DeviceEventEmitter
} from 'react-native'

import S13View from './S13View.js'
import S14View from './S14View.js'
import S15View from './S15View.js'
import S16View from './S16View.js'
import S17View from './S17View.js'
import LoginView from './LoginView'
import RegisterView from './RegisterView'

const c1Icon = require('../resources/c1.png')
const c2Icon = require('../resources/c2.png')
const c3Icon = require('../resources/c3.png')
const c4Icon = require('../resources/c4.png')
const c5Icon = require('../resources/c5.png')
const c6Icon = require('../resources/c6.png')

const MyTab = TabNavigator({
    S13View: {
        screen: S13View,
        navigationOptions: ({navigation, screenProps}) => ({
            headerTitle: '订单列表', 
            tabBarLabel: '订单', 
            tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                navigation.navigate('S13View');
                DeviceEventEmitter.emit('S13View');
            },

            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={!focused ? c1Icon : c2Icon}
                        style={[{height: 35, width: 35}, {tintColor: tintColor}]}
                    />
                )
            })
        })
    },

    S14View: {
        screen: S14View,
        navigationOptions: ({navigation, screenProps}) => ({
            headerTitle: '授权列表', 
            tabBarLabel: '授权列表', 
            tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                navigation.navigate('S14View');
                DeviceEventEmitter.emit('S14View');
            },
            
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={!focused ? c3Icon : c4Icon}
                        style={[{height: 35, width: 35}, {tintColor: tintColor}]}
                    />
                )
            })
        })
    },

    S15View: {
        screen: S15View,
        navigationOptions: ({navigation, screenProps}) => ({
            headerTitle: '授权历史',
            tabBarLabel: '授权历史',
            tabBarOnPress: ({previousScene, scene, jumpToIndex}) => {
                navigation.navigate('S15View');
                DeviceEventEmitter.emit('S15View');
            },
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={!focused ? c5Icon : c6Icon}
                        style={[{height: 35, width: 35}, {tintColor: tintColor}]}
                    />
                )
            })
        })
    },

    S17View: {
        screen: S17View,
        navigationOptions: ({navigation, screenProps}) => ({
            headerTitle: '人脸授权', 
            tabBarLabel: '人脸授权', 
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={!focused ? c5Icon : c6Icon}
                        style={[{height: 35, width: 35}, {tintColor: tintColor}]}
                    />
                )
            })
        })
    },

    S16View: {
        screen: S16View,
        navigationOptions: ({navigation, screenProps}) => ({
            headerTitle: '个人信息', 
            tabBarLabel: '个人信息', 
            tabBarIcon: (({tintColor, focused}) => {
                return (
                    <Image
                        source={!focused ? c5Icon : c6Icon}
                        style={[{height: 35, width: 35}, {tintColor: tintColor}]}
                    />
                )
            })
        })
    }
})

// 初始化StackNavigator
const MyApp = StackNavigator({
        MyTabScreen: {screen: MyTab}
    }, {
        initialRouteName: 'MyTabScreen'
    }
)

const Auth = StackNavigator({
    LoginScreen: {screen: LoginView}
})

export default SwitchNavigator({
        MyAppScreen: MyApp,
        AuthScreen: Auth,
        RegisterScreen: RegisterView
    }, {
        initialRouteName: 'AuthScreen'
    }
)