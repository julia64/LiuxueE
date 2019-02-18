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
import area from '../../res/data/area.json';

    export default class PickerText extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            pickedValue:'请选择'
        }
    }

    _createAreaData() {
        let data = [];
        let len = area.length;
        for(let i=0;i<len;i++){
            let city = [];
            for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    _showAreaPicker() {
        Picker.init({
            pickerTitleText:'请选择你的目标学校',
            pickerCancelBtnText:'取消',
            pickerConfirmBtnText:'确定',
            pickerData: this._createAreaData(),
            selectedValue: ['河北', '唐山', '古冶区'],
            onPickerConfirm: pickedValue => {
                this.setState({
                    pickedValue:pickedValue
                });
                DeviceEventEmitter.emit('PickerText',{data: pickedValue})
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
                <Text style={{fontSize:16,margin:10}}>选择你的目标院校</Text>
                <TouchableOpacity onPress={()=>this._showAreaPicker()}>
                    <View style={{borderWidth:1, borderColor:'gray', borderRadius: 3, marginLeft:10,
                        marginRight:10, opacity:0.7, flexDirection:'row', height:40, alignItems:'center',}}>
                        <Text style={{color:'black',fontSize:16,marginLeft:10}}>{this.state.pickedValue}</Text>
                        <Image source={require('../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:10}}/>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
};