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
    DeviceEventEmitter,
    TextInput,
    NativeModules,
    NativeEventEmitter,
} from 'react-native'
import YourSubject from '../choice/YourSubject'
import NewSchool from './NewSchool'
import PickerText from '../../common/PickerText'
import OldSchool from './OldSchool'
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-check-box'
import {TextInputLayout} from 'rn-textinputlayout';
import SchoolMatch from '../../../res/data/SchoolMatch.json'

const {height, width} = Dimensions.get('window');

export default class Ambition extends Component{
    constructor(props){
        super(props);
        this.state={
            YourSchool:'',
            YourSubject:'',
            TargetSchool:'',
            TargetSubject:'',
            grade:'',
            gpa:'',
            work:{
                name:'是否有实习经历',
                checked:false
            },
            paper:{
                name:'是否发表相关论文',
                checked:false
            },
            options:'',
        };
    }
    componentWillMount(){
        DeviceEventEmitter.addListener('PickerText', (data) => {
            this.setState({
                TargetSchool: data.data
            })
        });
        DeviceEventEmitter.addListener('OldSchool', (data) => {
            this.setState({
                YourSchool: data.data
            })
        });
    }
    static _onClick(data){
        data.checked=!data.checked;
    }

    sendMessage = (options, grade, gpa, work, paper, YourSchool, YourSubject, TargetSchool, TargetSubject, callback: () => (data)) => {
        let major = (YourSubject === TargetSubject) ? 1 : 0;

        let key = 0;
        SchoolMatch.forEach(function (v,i) {
            if (v.school === YourSchool) {
                key = v.key;
            }
        });

        fetch('http://just-go.cn:8002/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Background: key,
                IELTS: options,
                GPA: gpa,
                EXP_WORK: (work === true) ? 1 : 0,
                EXP_EXCHANGE: (paper === true) ? 1 : 0,
                TARGET: TargetSchool,
                TOFEL: !options,
                MAJOR: major,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                console.log(responseJson)

            })
            .catch((error) =>{
                console.error(error);
            });
    };

    renderCheckBox(data){
        let leftText=data.name;
        return (
            <CheckBox
                style={{flex:1,padding:10}}
                onClick={()=>this._onClick(data)}
                leftText={leftText}
                leftTextStyle={{fontSize:18}}
                isChecked={data.checked}
                checkedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../../res/images/ic_check_box.png')}/>}
                unCheckedImage={<Image
                    style={{tintColor:'#6495ED'}}
                    source={require('../../../res/images/ic_check_box_outline_blank.png')}/>}
            />
        )
    }

    render(){
        let YourSubjectWord = this.state.YourSubject?this.state.YourSubject:'请选择';
        let TargetSubject = this.state.TargetSubject?this.state.TargetSubject:'请选择';
        return (
            <ScrollView style={styles.container}>
                {/*选择在读院校*/}
                <View>
                    <OldSchool/>
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
                    <Text style={styles.word}>选择你的目标院校</Text>
                    <TouchableHighlight
                        onPress={()=>{
                            this.props.navigator.push({
                                component: NewSchool,
                                params: {
                                    ...this.props,
                                    onCallBack:(word)=>{
                                        this.setState({
                                            TargetSchool:word
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

                <View>
                    <Text style={styles.word}>语言成绩</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <ModalDropdown
                            style={styles.dropDown}
                            options={['托福', '雅思']}
                            defaultValue={'请选择'}
                            textStyle={{fontSize:16,margin:10}}
                            dropdownStyle={{height:85,alignItems:'center',width:80}}
                            dropdownTextStyle={{fontSize:16}}
                            onSelect={(idx, value) => {
                                this.setState({options: idx});
                            }}
                        />
                        <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:width/2+20}}/>
                        <TextInputLayout style={styles.inputLayout}>
                            <TextInput
                                style={styles.textInput}
                                keyboardType={'numeric'}
                                placeholder={'分数                                 '}
                                onChangeText={(text) => this.setState({grade: text})}
                            />
                        </TextInputLayout>
                    </View>
                </View>

                {/*GAP*/}
                <View>
                    <TextInputLayout style={styles.inputLayoutGPA}>
                        <TextInput
                            keyboardType={'numeric'}
                            style={styles.textInput}
                            placeholder={'GPA'}
                            onChangeText={(text) => this.setState({gpa: text})}
                        />
                    </TextInputLayout>
                </View>

                {/*实习经历*/}
                <View style={styles.checkbox}>
                    {this.renderCheckBox(this.state.work)}
                </View>

                {/*论文发表*/}
                <View style={styles.checkbox}>
                    {this.renderCheckBox(this.state.paper)}
                </View>

                <View style={styles.button}>
                    <Text
                        onPress={()=>{
                            console.log(this.state);
                            let params = this.state;
                            this.sendMessage(
                                params.options, params.grade, params.gpa, params.work.checked,
                                params.paper.checked, params.YourSchool, params.YourSubject,
                                params.TargetSchool, params.TargetSubject,
                            );
                        }}
                        style={styles.submit}
                    >提交</Text>
                </View>
            </ScrollView>
        )
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
    textInput: {
        fontSize: 16,
        height: 38,
    },
    inputLayout:{
        marginLeft:10,
        marginTop:-14
    },
    inputLayoutGPA:{
        marginLeft:10,
        marginRight:45
    },
    submit:{
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
        marginTop:20,
        textAlign: 'center',
    },
    container: {
        marginBottom: 60
    },
});