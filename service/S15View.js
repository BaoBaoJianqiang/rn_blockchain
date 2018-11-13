import React, {
    Component
} from 'react'

import {
    View,
    Text,
    Alert,
    StyleSheet,
    ListView,
    ScrollView,
    Image,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native'

import NetUtil from './NetUtil';
import userInfo from './UserInfo';

export default class S15View extends Component {
    constructor (props) {
        super(props);

        this.netUtil = new NetUtil();

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds,
            loaded: false
        }
    }

    componentDidMount () {
        this.subscription = DeviceEventEmitter.addListener('S15View', () => this.fetchdata());
        //this.fetchdata();
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    fetchdata () {
            let url = 'http://47.105.109.237:8090/state/query';
            let body = '{"flag":"5144d268193db520","strArray":["userList","'+ userInfo.userId +'"],"key":"QnDA0jym"}';
            this.netUtil.postRestful(url, body, (responseData)=>{  
                let list = responseData.data.sort((a,b) => {return b.createTimestamp-a.createTimestamp;})

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(list),                
                    loaded: true,
                });
            });
    }

    render () {
        if (!this.state.loaded) {
            return (
                <View >
                    <Text>数据加载中......</Text >
                </View >
            )
        }

        return (
            <View >
                <ListView
                    dataSource={this.state.dataSource}
                    removeClippedSubviews={false}
                    renderRow={(history) =>
                        this.renderAuthHistory(history)
                    }
                />
            </View >
        )
    }

    renderAuthHistory(history) {
        let message = "";
        if(history.proxyState == 1) {
            message = '授权给' + history.proxyUsername;
        } else {
            message = '取消对' + history.proxyUsername + '的授权';
        }

        let curTime = new Date(history.createTimestamp/1000000);
        let year = curTime.getFullYear();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();

        let hour = curTime.getHours();
        if(hour<10) {
            hour = '0'+hour;
        }

        let minute = curTime.getMinutes();
        if(minute<10) {
            minute = '0'+minute;
        }

        let second = curTime.getSeconds();
        if(second<10) {
            second = '0'+second;
        }

        let showtime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

        return (
            <View >
                <View style={{flex: 1, flexDirection: 'row'}} >
                    <Text >{showtime}</Text >
                    <Text > </Text >
                    <Text >{message}</Text >
                </View >
                <Text />
                <Text />
            </View >
        )
    }
}