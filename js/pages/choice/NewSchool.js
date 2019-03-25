import React, {Component} from "react";
import {StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    ListView,
    ActivityIndicator,
    TouchableHighlight
} from "react-native";
import ViewUtils from '../../utils/ViewUtils'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import school from '../../../res/data/school'
import RepositoryCell from '../../common/RepositoryCell'

export default class NewSchool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'',
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2,
            }),
            array:[]
        }
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
            this.setState({
                dataSource:this.getDataSource(school)
            });
    }
    getDataSource(items){
        return this.state.dataSource.cloneWithRows(items);
    }
    onBackPress() {
        this.props.navigator.pop();
    }
    renderNavBar() {
        let backButton = ViewUtils.getGrayLeftButton(()=>this.onBackPress());
        let inputView = <TextInput
            ref="input"
            onChangeText={text=>this.setState({text:text})}
            placeholder="请输入学校名称查找"
            style={styles.textInput}
        >
        </TextInput>;
        return <View style={{
            backgroundColor: '#f3f3f4',
            flexDirection: 'row',
            alignItems: 'center',
            height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
        }}>
            {backButton}
            {inputView}
            <View style={styles.line}/>
        </View>
    }
    onSelectRepository(item){
        this.props.onCallBack(item.name);
        this.props.navigator.pop();
    }
    _renderRow(rowData, sectionId, rowId) {
        return <RepositoryCell
            key={rowId}
            item={rowData}
            onSelect={()=>this.onSelectRepository(rowData)}
        >
        </RepositoryCell>
    }
    render(){
        let statusBar = null;
        if (Platform.OS === 'ios') {
            statusBar = <View style={[styles.statusBar, {backgroundColor: '#2196F3'}]}/>
        }
        return(
            <View style={GlobalStyles.root_container}>
                {statusBar}
                {this.renderNavBar()}

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId,rowId)=>{return this._renderRow(rowData,sectionId,rowId)}}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    initialListSize={10}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    statusBar: {
        height: 20,
    },
    search:{
        fontSize:16,
        color:'#2196F3',
        margin:12,
        marginLeft:5
    },
    textInput: {
        flex: 1,
        height: (Platform.OS === 'ios') ? 30 : 40,
        borderWidth: (Platform.OS === 'ios') ? 1 : 0,
        borderColor: "white",
        alignSelf: 'center',
        paddingLeft: 5,
        marginRight: 10,
        marginLeft: 5,
        borderRadius: 3,
        opacity: 0.7,
        color: 'white'
    },
    title: {
        fontSize: 18,
        color: "white",
        fontWeight: '500'
    },
    centering:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    bottomButton:{
        alignItems:'center',
        justifyContent:'center',
        opacity:0.9,
        height:40,
        position:'absolute',
        left:10,
        top:GlobalStyles.window_height-70,
        right:10,
        borderRadius:3
    },


});
