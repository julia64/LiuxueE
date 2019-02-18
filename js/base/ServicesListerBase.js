'use strict';

import React from 'react'

import {NativeModules, NativeEventEmitter, DeviceEventEmitter,Alert} from 'react-native'

let RNBridge = NativeModules.RNBridge;
let EmailNativeEventEmitter = new NativeEventEmitter(RNBridge);


class ServicesLister {


    constructor(listenerName: string) {
        this.map = new Map();
        this.listenerName = listenerName;
    }

    _onReceiverNotifiaction = (data: Map) => {
        console.log('onReceiver');
        console.log(data);
        console.log('123');
        // json 取出key
        let key = data.operationId;
        let handler = this.map.get(key);

        // RNBridge.sendMsg("info", logData);

        // console.log(this.map);
        console.log(handler);

        if(handler || handler != undefined){
            console.log('789');
            // Alert.alert(key)
            handler(data)
        }


        this.unregisterCallback(key);
    };

    addListener = () => {
        console.log('Add Listener');
        this.listener = EmailNativeEventEmitter.addListener(this.listenerName, this._onReceiverNotifiaction)
    };

    removeListener = () => {
        console.log('Remove Listener');
        this.listener.remove()
    };


    registerCallback = (key: string, value: any) => {
        // if (key.length === 0 || !value) {
        //     return ;
        // }
        this.map.set(key, value)
    };

    unregisterCallback = (key: string) => {
        // if (key.length === 0) {
        //     return ;
        // }

        this.map.delete(key)
    };

    clear = () => {
        this.map.clear();
    }

}

export default ServicesLister