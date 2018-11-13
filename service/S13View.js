import React, {
    Component
} from 'react'

import {
    View,
    Text,
    Image,
    ListView,
    StyleSheet,
    Alert,
    AsyncStorage,
    DeviceEventEmitter
} from 'react-native'

import NetUtil from './NetUtil';
import userInfo from './UserInfo';

export default class S13View extends Component {
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
        this.subscription = DeviceEventEmitter.addListener('S13View', () => this.fetchdata());

        //this.fetchdata();
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    fetchdata () {
        let url = 'http://47.105.109.237/index.php/shop/order/getOrderListByUser?uid=' + userInfo.userId+'&page=1';
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                    loaded: true
                })
            })
            .done()
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
                    renderRow={(order) =>
                        this.renderOrder(order)
                    }
                />
            </View >
        )
    }

    renderOrder (order) {
        let status = '未取货'
        if (order.status == 1) {
            status = '已取货'
        }

        return (
            <View >
                <View style={{flex: 1, flexDirection: 'row'}} >
                    <Text >订单编号：{order.oid}</Text >
                    <Text > </Text >
                    <Text >状态：{status}</Text >
                </View >
                <View style={{flex: 1, flexDirection: 'row'}} >
                    <Text > </Text >
                    <Text >{order.p_name}</Text >
                </View >
                <View style={{flex: 1, flexDirection: 'row'}} >
                    <Text > </Text >
                    <Text >价格：{order.price}元</Text >
                    <Text > </Text >
                    <Text >下单时间：{order.buy_time}</Text >
                </View >

                <ProxyInfo getProductsByUser={order.getProductsByUser} getProductsDate={order.getProductsDate} />

                <Text />
                <Text />
            </View >
        )
    }
}

class ProxyInfo extends Component {
    render () {
        if (this.props.gid == '') {
            return (
                <View />
            )
        } else {
            return (
                <View style={{flex: 1, flexDirection: 'row'}} >
                    <Text > </Text >
                    <Text >取货人：{this.props.gid}</Text >
                    <Text > </Text >
                    <Text >取货时间：{this.props.get_time}</Text >
                </View >
            )
        }
    }
}