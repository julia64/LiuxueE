import React,{Component} from 'react';
import {
    View,
    Dimensions,
    TextInput,
    Platform
} from 'react-native'
import NavigationBar from '../common/NavigationBar'
import Ambition from './choice/Ambition'
import Grades from './choice/Grades'

const {height, width} = Dimensions.get('window');

export default class MyPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let navigationBar =
            <NavigationBar
                title='志愿'
                style={{backgroundColor:'#2196F3'}}
                statusBar={{backgroundColor:'#2196F3'}}
            />;
        return <View>
            {navigationBar}
            <Ambition {...this.props}/>
            {/*<Grades/>*/}
        </View>
    }
}
