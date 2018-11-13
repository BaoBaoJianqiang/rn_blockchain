import React, {
    Component
} from 'react'

import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableHighlight,
    Alert,
    DeviceEventEmitter
} from 'react-native'

import ImagePicker from 'react-native-image-picker';
import NetUtil from './NetUtil';
import userInfo from './UserInfo';

export default class S17View extends Component {
    
    
    constructor (props) {
        super(props);

        this.netUtil = new NetUtil();
        //this._onPressButton = this._onPressButton.bind(this)
    }

    componentDidMount () {
    }

    _onPressButton() {
        let options = {
            title: '请选择图片来源',
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            maxWidth: 480,
            maxHeight: 800,
            chooseFromLibraryButtonTitle:'相册图片',
            customButtons: [
                {name: 'Test', title: 'Test'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.launchCamera(options, (response)=>{
            if(response.didCancel)
                return;            

            fetch('http://47.105.109.237/index.php/shop/order/getByImage',
                {
                    method: "post",
                    body: "image="+response.data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },      
                })
                .then((response) => response.json())
                .then((responseData) => { 
                    if(responseData.data == -1) {
                        Alert.alert('认证失败',"认证失败,请重新扫描");
                        return; 
                    }

                    let proxyUserId = responseData.data.UserId;
                    let proxyUserName = responseData.data.UserName + '('+ responseData.data.IdNumber +')';

                    let url = 'http://47.105.109.237:8090/state/invoke';
                    let body = `
                        {
                            "flag":"5144d268193db520",
                            "strArray":["accredit","${userInfo.userId}","${userInfo.userName}","${proxyUserId}","${proxyUserName}"],
                            "key":"QnDA0jym"
                        }
                    `;
                    
                    this.netUtil.postRestful(url, body, (responseData)=> {
                            DeviceEventEmitter.emit('S14View');
                            this.props.navigation.navigate('S14View');
                        }
                    );
                })
                .done();
        });
    }

    render () {
        return (
            <View >
              <TouchableHighlight onPress={this._onPressButton}>
                <Text style={textStyle}>人脸识别</Text>
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