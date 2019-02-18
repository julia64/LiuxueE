import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableHighlight,
    Image,
    Dimensions,
    Platform,
    Button,
} from 'react-native'
import YourSchool from '../choice/YourSchool'
import YourSubject from '../choice/YourSubject'
import PickerText from '../../common/PickerText'
import Grades from './Grades'

const {height, width} = Dimensions.get('window');

export default class Ambition extends Component{
    constructor(props){
        super(props);
        this.state={
            YourSchool:'',
            YourSubject:'',
            TargetSubject:'',
        }
    }
    render(){
        let YourSchoolWord = this.state.YourSchool?this.state.YourSchool:'正在定位...';
        let YourSubjectWord = this.state.YourSubject?this.state.YourSubject:'请选择';
        let TargetSubject = this.state.TargetSubject?this.state.TargetSubject:'请选择';
        return <View style={styles.container}>
            {/*选择在读院校*/}
            <View>
                <Text style={styles.word}>选择你的在读院校</Text>
                <TouchableHighlight
                    onPress={()=>{
                        this.props.navigator.push({
                            component: YourSchool,
                            params: {
                                ...this.props,
                                onCallBack:(word)=>{
                                    this.setState({
                                        YourSchool:word
                                    })
                                }
                            },
                        });
                    }}
                >
                    <View style={styles.box1}>
                        <Image source={require('../../../res/images/ic_gps.png')} style={{width:25,height:25,margin:8}}/>
                        <Text style={{color:'black',fontSize:16,}}>{YourSchoolWord}</Text>
                        <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:10}}/>
                    </View>
                </TouchableHighlight>
            </View>

            {/*选择在读专业*/}
            <View>
                <Text style={styles.word}>选择你的在读专业</Text>
                <TouchableHighlight
                    onPress={()=>{
                        this.props.navigator.push({
                            component: YourSubject,
                            params: {
                                ...this.props,
                                onCallBack:(word)=>{
                                    this.setState({
                                        YourSubject:word
                                    })
                                }
                            },
                        });
                    }}
                >
                    <View style={styles.box1}>
                        <Text style={{color:'black',fontSize:16,marginLeft:10}}>{YourSubjectWord}</Text>
                        <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:10}}/>
                    </View>
                </TouchableHighlight>
            </View>

            {/*选择目标院校*/}
            <View>
                <PickerText/>
            </View>

            {/*选择目标专业*/}
            <View>
                <Text style={styles.word}>选择你的目标专业</Text>
                <TouchableHighlight
                    onPress={()=>{
                        this.props.navigator.push({
                            component: YourSubject,
                            params: {
                                ...this.props,
                                onCallBack:(word)=>{
                                    this.setState({
                                        TargetSubject:word
                                    })
                                }
                            },
                        });
                    }}
                >
                    <View style={styles.box1}>
                        <Text style={{color:'black',fontSize:16,marginLeft:10}}>{TargetSubject}</Text>
                        <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:10}}/>
                    </View>
                </TouchableHighlight>
            </View>
            <View style={styles.button}>
                <Text
                    onPress={()=>{
                        console.log(this.state);
                        this.props.navigator.push({
                            component: Grades,
                            params: {
                                ...this.props,
                            },
                        });

                    }}
                    style={styles.continue}
                >继续</Text>
            </View>
        </View>
    }
}

const styles=StyleSheet.create({
    word:{
        margin:10,
        color:'gray',
        fontSize:16,
    },
    box1:{
        borderWidth:1,
        borderColor:'gray',
        borderRadius: 3,
        marginLeft:10,
        marginRight:10,
        opacity:0.7,
        flexDirection:'row',
        height:40,
        alignItems:'center',
        // justifyContent:'space-between',
    },
    dropDown:{
        marginLeft:10,
        borderWidth:1,
        borderColor:'gray',
        borderRadius: 3,
        width:width/2-20,
    },
    checkbox:{
        flexDirection:'row',
        alignItems:'center',
    },
    continue:{
        fontSize:16,
        color:'white',
        fontWeight:'800',
        borderWidth:1,
        borderColor:'#2196F3',
        borderRadius: 3,
        marginLeft:10,
        marginRight:10,
        opacity:0.7,
        flexDirection:'row',
        height:40,
        backgroundColor:'#2196F3',
        padding:10,
        marginTop:20
    },
    button:{
        alignItems:'center'
    }
});