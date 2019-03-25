import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    DeviceEventEmitter
} from 'react-native';

import Picker from 'react-native-picker';
import school from '../../../res/data/CNschool.json';

    export default class OldSchool extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            pickedValue:'请选择'
        }
    }

    _createAreaData() {
        let data = [];
        let len = school.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=school[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[school[i]['city'][j]['name']] = school[i]['city'][j]['school'];
                city.push(_city);
            }

            let _data = {};
            _data[school[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    _showAreaPicker() {
        Picker.init({
            pickerTitleText:'请选择你的就读学校',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            pickerData: this._createAreaData(),
            selectedValue: ['北京', '北京', '北京大学'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    pickedValue:pickedValue
                });
                DeviceEventEmitter.emit('OldSchool',{data: pickedValue})
            },
            onPickerCancel: pickedValue => {
                this.setState({
                    pickedValue:'请选择'
                })

            },
            onPickerSelect: pickedValue => {
            }
        });
        Picker.show();
    }
    render() {
        return (
            <View style={{height:80}}>
                <Text style={{fontSize:16,margin:10}}>选择你的就读院校</Text>
                <TouchableOpacity onPress={()=>this._showAreaPicker()}>
                    <View style={{borderWidth:1, borderColor:'gray', borderRadius: 3, marginLeft:10,
                        marginRight:10, opacity:0.7, flexDirection:'row', height:40, alignItems:'center',}}>
                        <Text style={{color:'black',fontSize:16,marginLeft:10}}>{this.state.pickedValue}</Text>
                        <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:10}}/>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
};