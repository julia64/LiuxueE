'use strict';

import React from 'react'
import { DeviceEventEmitter, NativeModules } from "react-native";

let RNBridge = NativeModules.RNBridge;

class BaseServices {
    constructor(lister) {
        this.lister = lister;
    }

    uuid(action) {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        DeviceEventEmitter.emit(action, { key: uuid });

        return uuid;
    }

    sendMsg = (action: string, data: Object, callback: () => (data)) => {
        let key = this.uuid(action);
        data.key = key;
        data.lister = this.lister.listenerName;
        console.log(data);
        this.lister.registerCallback(key, callback);

        RNBridge.sendMsg(action, data);
    }
}

export default BaseServices;