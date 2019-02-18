'use strict';

import React from 'react'
import BaseServices from "../../base/BaseServices";

class SendMessageServices extends BaseServices {
    sendMessage = (options, grade, gpa, work, paper, YourSchool, YourSubject, TargetSchool, TargetSubject, callback: () => (data)) => {
        let obj = {
            options: options,
            grade: grade,
            gpa: gpa,
            work: work,
            paper: paper,
            YourSchool: YourSchool,
            YourSubject: YourSubject,
            TargetSchool: TargetSchool,
            TargetSubject: TargetSubject
        };

        console.log(obj);
        this.sendMsg('sendMessage', obj, callback);
    };
}

export default SendMessageServices;