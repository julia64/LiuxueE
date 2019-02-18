import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Linking,
    Dimensions,
    TextInput,
    Platform
} from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import CheckBox from 'react-native-check-box'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from "../../utils/ViewUtils";
import {TextInputLayout} from 'rn-textinputlayout';

const {height, width} = Dimensions.get('window');

export default class Grades extends Component{
    constructor(props){
        super(props);
        this.state={
            text1:'',
            text2:'',
            work:{
                name:'是否有实习经历',
                checked:false
            },
            paper:{
                name:'是否发表相关论文',
                checked:false
            },
        }
    }
    onBackPress() {
        this.props.navigator.pop();
    }
    renderNavBar() {
        let backButton = ViewUtils.getLeftButton(()=>this.onBackPress());
        let navigationBar =
            <NavigationBar
                title='志愿'
                style={{backgroundColor:'#2196F3'}}
                statusBar={{backgroundColor:'#2196F3'}}
            />;
        return <View style={{
            backgroundColor: '#2196F3',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            {backButton}
            {navigationBar}
        </View>
    }
    _onClick(data){
        data.checked=!data.checked;
    }
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
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#2196F3'}]}/>
        }
        return <View style={styles.container}>
            {statusBar}
            {this.renderNavBar()}
            {/*语言成绩*/}
            <View>
                <Text style={styles.word}>语言成绩</Text>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <ModalDropdown
                        style={styles.dropDown}
                        options={['雅思', '托福']}
                        defaultValue={'请选择'}
                        textStyle={{fontSize:16,margin:10}}
                        onDropdownWillHide={(options)=>this.setState({options:options})}
                        dropdownStyle={{height:85,alignItems:'center',width:80}}
                        dropdownTextStyle={{fontSize:16}}
                    />
                    <Image source={require('../../../res/images/ic_arrow_down.png')} style={{width:16,height:16,position:'absolute',right:width/2+20}}/>
                    <TextInputLayout style={styles.inputLayout}>
                        <TextInput
                            style={styles.textInput}
                            keyboardType={'numeric'}
                            placeholder={'分数                                 '}
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
                        this.props.navigator.push({
                            component: Grades,
                            params: {
                                ...this.props,
                            },
                        });
                    }}
                    style={styles.submit}
                >提交</Text>
            </View>
        </View>
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F5FCFF',
    },
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
    checkbox:{
        flexDirection:'row',
        alignItems:'center',
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
        marginTop:20
    },
    button:{
        alignItems:'center'
    }
});