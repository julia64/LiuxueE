import React, { Component } from 'react';
import {
    View,
    Text,
    ProgressBarAndroid,
    Modal,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {
        return(
            <Modal transparent = {true}
                   onRequestClose={()=> this.props.onRequestClose()}>
                <View style={styles.loadingBox}>
                    <View style={styles.hudContainer}>
                        <ActivityIndicator color={'#0d81ff'}
                                           size={'large'}/>
                    </View>
                </View>
            </Modal>
        );
    }



}

const styles = StyleSheet.create({
    loadingBox: { // Loading居中
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)', // 半透明
    },
    hudContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0.0,0.0,0.0,0.7)',
        width: 100.0,
        height: 100.0,
        borderRadius: 5.0
    }
});
