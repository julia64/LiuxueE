import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
    Linking
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import {MORE_MENU} from '../common/MoreMenu'
import GlobalStyles from '../../res/styles/GlobalStyles'
import ViewUtils from '../utils/ViewUtils'

export default class MyPage extends Component{
    constructor(props){
        super(props);
        this.state={
            result:'',
        }
    }
    onClick(tab){
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case MORE_MENU.Feedback:
                let url='mailto://945159252@qq.com';
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text,{tintColor:'#2196F3'},null);
    }
    render(){
        let navigationBar =
            <NavigationBar
                title='我的'
                style={{
                    backgroundColor:'#2196F3'
                }}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />;
        return <View style={styles.container}>
            {navigationBar}
            <ScrollView>
                <TouchableHighlight>
                    <View style={[styles.item, {height: 90}]}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Image source={require('../../res/images/me.jpg')}
                                   style={[{width: 60, height: 60, marginRight: 10}]}/>
                            <View style={{flexDirection:'column',marginLeft:20}}>
                                <Text style={styles.title}>邹琪珺</Text>
                                <Text>华中科技大学  电信学院</Text>
                            </View>

                        </View>

                    </View>

                </TouchableHighlight>
                <View style={GlobalStyles.line}/>
                {/*关注管理*/}
                <Text style={styles.groupTitle}>我的关注</Text>
                {/*学校*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Language, require('../../res/images/ic_school.png'), '学校')}
                {/*专业*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Language, require('../../res/images/ic_subject.png'), '专业')}

                {/*自定义*/}
                <Text style={styles.groupTitle}>自定义</Text>
                {/*设置*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Key, require('../../res/images/ic_setup.png'), '设置')}
                {/*帮助中心*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Sort_Key, require('../../res/images/ic_help.png'), '帮助中心')}
                {/*建议反馈*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Feedback, require('../../res/images/ic_feedback.png'), '建议反馈')}
                {/*分享给好友*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Remove_Key, require('../../res/images/ic_share.png'), '分享给好友')}

                {/*关于*/}
                <Text style={styles.groupTitle}>关于</Text>
                {/*开发团队*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.Custom_Theme, require('../../res/images/ic_team.png'), '开发团队')}
                {/*关于我们*/}
                <View style={GlobalStyles.line}/>
                {this.getItem(MORE_MENU.About_Author, require('../../res/images/ic_us.png'), '关于我们')}
                <View style={[{marginBottom: 60}]}/>
            </ScrollView>
        </View>
    }
}

const styles=StyleSheet.create({
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
    item:{
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title:{
        fontSize:18,
    }
});