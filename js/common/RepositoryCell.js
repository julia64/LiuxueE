import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

export default class RepositoryCell extends Component{
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
    }
    render(){
        let item = this.props.item;
        return <TouchableOpacity
            onPress={this.props.onSelect}
        >
            <View style={{flex:1}}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.line}/>
            </View>
        </TouchableOpacity>
    }
}

const styles=StyleSheet.create({
    title:{
        fontSize:16,
        color:'#212121',
        margin:12,
    },
    word:{
        color:'black'
    },
    line: {
        height: 0.8,
        backgroundColor: 'darkgray',
    },
});