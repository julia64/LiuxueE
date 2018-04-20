import React,{Component} from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native'

export default class ViewUtils{
    /**
     * 获取设置页的Item
     * @param callBack 单击item的回调
     * @param icon 左侧图标
     * @param text 显示的文本
     * @param tintStyle 图标着色
     * @param expandableIco 右侧图标
     * @return {XML}
     */
    static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
        return (
            <TouchableHighlight
                onPress={callBack}>
                <View style={[styles.setting_item_container]}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        {icon ?
                            <Image source={icon} resizeMode='stretch'
                                   style={[{opacity: 1, width: 16, height: 16, marginRight: 10,}, tintStyle]}/> :
                            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
                        }
                        <Text style={{fontSize:16,color:'#515151'}}>{text}</Text>
                    </View>
                    <Image source={expandableIco ? expandableIco : require('../../res/images/ic_arrow_right.png')}
                           style={[{
                               marginRight: 10,
                               height: 16,
                               width: 16,
                               alignSelf: 'center',
                               opacity: 1
                           }, tintStyle]}/>
                </View>
            </TouchableHighlight>
        )
    }

    static getLeftButton(callBack){
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}
        >
            <Image
                style={{width:20,height:20,tintColor:'white'}}
                source={require('../../res/images/ic_arrow_left.png')}
            />
        </TouchableOpacity>
    }
    static getGrayLeftButton(callBack){
        return <TouchableOpacity
            style={{padding:8}}
            onPress={callBack}
        >
            <Image
                style={{width:20,height:20,tintColor:'gray'}}
                source={require('../../res/images/ic_arrow_left.png')}
            />
        </TouchableOpacity>
    }
    static getRightButton(title,callBack){
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <View style={{marginRight:10}}>
                <Text style={{fontSize: 20,color: '#FFFFFF',}}>{title}</Text>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
});