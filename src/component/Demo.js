'use strict';

import React, {
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	TextInput,
	AlertIOS,
} from 'react-native';

import Toast from './Toast';
import Button from './Button';
import ToastSuccessAndError from './ToastSuccessAndError';
import Tip from './Tips';
import Alert from './Alert';
import Confirm from './Confirm';

class Demo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tipType: 'success',
			toastType: 'success'
		};
	}
	_successOnPress = (callback) => {
		this.refs.toast_su.success();
		this.timer = setTimeout(() => {
			callback();
		}, 2000);
	}
	_errorOnPress = (callback) => {
		this.refs.toast_su.error();
		this.timer = setTimeout(() => {
			callback();
		}, 2000);
	}
	_tipOnPress = (callback) => {
		this.refs.tip.changeType(this.state.tipType);
		this.refs.tip.open();
		this.timer = setTimeout(() => {
			callback();
		}, 2000);
	}
	_toastOnPress = (callback) => {
		this.refs.toast.changeType(this.state.toastType);
		this.refs.toast.open();
		this.timer = setTimeout(() => {
			callback();
		}, 2000);
	}
	_alertOnPress = (callback) => {
		// this.refs.alert.changeType(this.state.toastType);
		this.refs.alert.open();
		callback();
	}
	_confirmOnPress = (callback) => {
		this.refs.confirm.open();
		callback();
	}
	componentWillUnmount() {
		// 如果存在this.timer，则使用clearTimeout清空。
		// 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
		this.timer && clearTimeout(this.timer);
	}
	render() {
		return (
			<View>
				<Tip ref='tip' type='success' msg='这个是提示内容！'></Tip>
				<ToastSuccessAndError ref='toast_su' successMsg='受理成功' errorMsg='系统出错'></ToastSuccessAndError>
				<Toast ref='toast' type='success' msg='这个是提示内容！'></Toast>
				<Alert ref='alert' title='提示信息' btnText='确定' msg='这个是提示内容！'></Alert>
				<Confirm ref='confirm' leftFunc={() => {}} rightFunc={() => {}} btnLeftText='确定' btnRightText='取消' title='弹框' msg='这个是提示内容！'></Confirm>

				<Button onPress = {this._successOnPress} btnText = "Success" type='line' bgcolor='#09BB07'/>
				<Button onPress = {this._errorOnPress} btnText = "Error" type='line' bgcolor='#d81e06'/>
				<Text style={styles.tipinfo}>输入相应的类型，弹出提示，类型一共五种（success,wrong,help,info,warning），默认为：success</Text>
				<TextInput
		          style={{height: 40}}
		          placeholder="输入tip类型"
		          onChangeText={(tipType) => this.setState({tipType})}
		        />
				<Button onPress = {this._tipOnPress} btnText = "Tip" type='line'/>
				<TextInput
		          style={{height: 40}}
		          placeholder="输入toast类型"
		          onChangeText={(toastType) => this.setState({toastType})}
		        />
				<Button onPress = {this._toastOnPress} btnText = "Toast" type='line'/>
				<Button onPress = {this._alertOnPress} btnText = "Alert" type='line'/>
				<Button onPress = {this._confirmOnPress} btnText = "Confirm" type='line'/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	notCon: {
		height: 200
	},
	tipinfo: {
		padding: 10,
		fontSize: 20
	}
});


export default Demo;