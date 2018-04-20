import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import FirstPage from './FirstPage'
import MyPage from "./MyPage";
import HopePage from "./HopePage";
import PlanPage from './PlanPage'

type Props = {};

export const FLAG_TAB={
    flag_popularTab:'tb_first',
    flag_trendingTab:'tb_hope',
    flag_favoriteTab:'tb_plan',
    flag_my:'tb_my'
};
export default class HomePage extends Component<Props> {

    constructor(props) {
        super(props);
        let selectedTab=this.props.selectedTab?this.props.selectedTab:'tb_hope';
        this.state = {
            selectedTab: selectedTab,
            theme:this.props.theme
        }
    }
    componentDidMount(){
    }
    _renderTab(Component,selectedTab,title,renderIcon){
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectedTab}
            selectedTitleStyle={{color:'#2196F3'}}
            title={title}
            renderIcon={() => <Image style={styles.image} source={renderIcon} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={renderIcon} />}
            onPress={() => this.setState({ selectedTab: selectedTab })}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }
    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    {this._renderTab(MyPage,'tb_first','首页',require('../../res/images/ic_firstpage.png'))}
                    {this._renderTab(HopePage,'tb_hope','志愿',require('../../res/images/ic_hope.png'))}
                    {this._renderTab(MyPage,'tb_plan','规划',require('../../res/images/ic_plan.png'))}
                    {this._renderTab(MyPage,'tb_my','我的',require('../../res/images/ic_my.png'))}
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5FCFF',
    },
    page1:{
        flex:1,
        backgroundColor:'red',
    },
    page2:{
        flex:1,
        backgroundColor:'yellow',
    },
    image: {
        height: 22,
        width: 22,
    }
});