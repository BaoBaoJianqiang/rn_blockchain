import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Alert,
    Image,
    Text,
    ScrollView,
    TextInput,
    TouchableHighlight,
    AsyncStorage,
    NativeModules
} from 'react-native'

import ImagePicker from 'react-native-image-picker';
import userInfo from './UserInfo';
import NetUtil from './NetUtil';

export default class RegisterView extends Component {
    userName = '';
    age = '';
    address = '';
    idNumber = '';
    phone = '';

    constructor (props) {
        super(props)

        this.netUtil = new NetUtil();

        this.state = {
            uri: '',
            data: null
        };
    }

    onTakePhoto () {
        let options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'相册图片',
            customButtons: [
                {name: 'test', title: 'test'},
            ],
            maxWidth: 480,
            maxHeight: 800,
            quality:0.1,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.launchCamera(options, (response)=>{
            if(response.didCancel)
                return; 

            console.log('101', 'response.data');     
            console.log('101', 'response.data');     
            console.log('101', 'response.data');     
            console.log('101', 'response.data');     
            console.log('101', 'response.data');     
            console.log('101', response.data);     

            this.setState({ 
                uri: response.uri,
                data: response.data
            });
        });
    }

    onRegister () {
        let body = '';
        if(this.age == '') {
            this.age = '20';
        }

        if(this.address == '') {
            this.address = '香港';
        }

        if(this.idNumber == '') {
            this.idNumber = '120107802';
        }

        if(this.phone == '') {
            this.phone = '18600875912';
        }

        body += 'UserName=' + this.userName +'&Password=123456&Age='+ this.age +'&Address='+ this.address +'&IDNumber='+ this.idNumber +'&Phone='+ this.phone +'&';
        body += 'TemplateImage=' + this.state.data;

        this.netUtil.postUpload('http://100.84.166.146:9988/others/register', body, (responseData)=>{
            if(responseData.isError != 0) {
                Alert.alert('注册失败',"注册失败,请重新扫描");
                return;
            } 

            this.props.navigation.navigate('AuthScreen');           
        });
    }

    render () {
        return (
            <ScrollView>
                <Text />
                <Text />
                <Text />
                <Text />
                <TextInput placeholder="姓名" onChangeText={(text) => this.userName=text} />
                <Text />
                <Text />
                <TextInput placeholder="年龄" onChangeText={(text) => this.age=text} />
                <Text />
                <Text />
                <TextInput placeholder="地址" onChangeText={(text) => this.address=text} />
                <Text />
                <Text />
                <TextInput placeholder="身份证号码" onChangeText={(text) => this.idNumber=text} />
                <Text />
                <Text />
                <TextInput placeholder="电话号码" onChangeText={(text) => this.phone=text} />
                <Text />
                <Text />
                <TouchableHighlight                    
                    underlayColor='gray'
                    onPress={this.onTakePhoto.bind(this)} >
                    <Text style={textStyle}>上传图片</Text >
                </TouchableHighlight >
                <Text />
                <Text />
                <Image source={{uri: this.state.uri}} style={{width: 40, height: 40}} />
                <Text />
                <Text />
                <TouchableHighlight                    
                    underlayColor='gray'
                    onPress={this.onRegister.bind(this)} >
                    <Text style={textStyle}>注册</Text >
                </TouchableHighlight >
            </ScrollView>
        )
    };
}

const textStyle = {
  width:200,
  height:30,
  fontSize:25,
  backgroundColor:'#DAC',
  textAlign:'center'
};