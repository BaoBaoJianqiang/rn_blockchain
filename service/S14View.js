import React, {
  Component
} from 'react';

import {
  View,
  Text,
  ListView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';

import NetUtil from './NetUtil';
import userInfo from './UserInfo';

export default class S14View extends Component {
  data1 = null;
  data2 = null;
  count1 = 2;

  constructor(props) {
    super(props);

    this.netUtil = new NetUtil();

    const ds1 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const ds2 = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource1: ds1,
      dataSource2: ds2,
      loaded: false,
    };

    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('S14View', () => this.fetchdata());
    this.fetchdata();
  }

  componentWillUnmount(){
    this.subscription.remove();
  }

  fetchdata () {
        // let url = 'http://47.105.109.237:8090/state/query';
        // let body = '{"flag":"5144d268193db520","strArray":["userValidList","'+userInfo.userId+'"],"key":"QnDA0jym"}';
        // //Alert.alert('url1', body);
        // this.netUtil.postRestful(url, body, (responseData)=>{
        //   data1 = responseData;
        //   this.count1=this.count1-1;
        //   if(this.count1 == 0) {
        //     this.setState({
        //       dataSource1: this.state.dataSource1.cloneWithRows(data1.data),
        //       dataSource2: this.state.dataSource2.cloneWithRows(data2.data),
        //       loaded: true,
        //     });
        //   }
        // });

        // let url2 = 'http://47.105.109.237:8090/state/query';
        // let body2 = '{"flag":"5144d268193db520","strArray":["proxyUserValidList","'+userInfo.userId+'"],"key":"QnDA0jym"}';
        // //Alert.alert('url2', body2);        
        // this.netUtil.postRestful(url2, body2, (responseData)=>{

        //   data2 = responseData;
        //   this.count1=this.count1-1;
        //   if(this.count1 == 0) {
        //     this.setState({
        //       dataSource1: this.state.dataSource1.cloneWithRows(data1.data),
        //       dataSource2: this.state.dataSource2.cloneWithRows(data2.data),
        //       loaded: true,
        //     });
        //   }
        // });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View>
          <Text>数据加载中......</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>我授权给以下人：</Text>
        <ListView
          dataSource={this.state.dataSource1}
          removeClippedSubviews={false}
          renderRow={(auth) =>
            this.renderAuth(auth)
          }
        />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>以下人授权给我：</Text>
        <ListView
          dataSource={this.state.dataSource2}
          removeClippedSubviews={false}
          renderRow={(auth) =>
            this.renderAuthBy(auth)
          }
        />
      </View>
    );
  }

  onPress(proxyUserId, proxyUserName) {
    const that = this;

    Alert.alert(
      '提示', '要删除该授权人吗？',
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确认', onPress: function () {
          let url = 'http://47.105.109.237:8090/state/invoke';
          let body = `
              {
                  "flag":"5144d268193db520",
                  "strArray":["recover","${userInfo.userId}","${userInfo.userName}","${proxyUserId}","${proxyUserName}"],
                  "key":"QnDA0jym"
              }
          `;

          that.netUtil.postRestful(url, body, (responseData)=>{
              if(responseData.code == 200) {
                let newData = data1.data.filter(i => i.proxyUserId !== proxyUserId)
                data1.data = newData;

                that.setState({
                  dataSource1: that.state.dataSource1.cloneWithRows(data1.data),
                  dataSource2: that.state.dataSource2.cloneWithRows(data2.data),
                  loaded: true,
                });
              }
          });
        }
      },
    ])
  }

  renderAuth(auth) {
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => this.onPress(auth.proxyUserId, auth.proxyUsername)}>
            <Text>{auth.proxyUsername}({auth.proxyUserId})</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  renderAuthBy(auth) {
    return (
      <View>
        <View>
          <Text>{auth.proxyUsername}({auth.proxyUserId})</Text>
        </View>
      </View>
    );
  }
}
