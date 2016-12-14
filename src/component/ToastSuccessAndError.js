'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Modal,
	Text,
	Image,
	Dimensions
} from 'react-native';

const _success = 'data:image/png;base64,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';
const _error = 'data:image/png;base64,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';
const _iconArray = [_success, _error];

class ToastSuccessAndError extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'success',
			flag: false,
			msg: ''
		};
	}
	static defaultProps = {
		successMsg: 'Success',
		errorMsg: 'Error',
		timeout: 2000
	};
	static propTypes = {
		successMsg: PropTypes.string, //提示信息
		errorMsg: PropTypes.string, //提示信息
		timeout: PropTypes.number //关闭时间，默认2000毫秒
	}
	_getIconUri = () => {
		let _type = this.state.type;
		const _arr = ['success', 'error'];
		return _iconArray[_arr.indexOf(_type)];
	}
	_timeout = () => {
		setTimeout(() => {
			this.setState({
				flag: false
			});
		}, this.props.timeout);
	}
	success = () => {
		this.setState({
			type: 'success',
			flag: true,
			msg: this.props.successMsg
		});
		this._timeout();
	}
	error = () => {
		this.setState({
			type: 'error',
			flag: true,
			msg: this.props.errorMsg
		});
		this._timeout();
	}
	render() {
		return (
			<Modal
	          animationType={"none"}
	          transparent={true}
	          visible={this.state.flag}
	          onRequestClose={() => {}}
	          >
		        <View style={[styles.loadingView]}>
			        <View style={styles.loadItem}>
			            <Image 
			            	source={{uri: this._getIconUri()}}
			            	resizeMode={Image.resizeMode.cover}
		          			style={styles.thumbnail}/>
			            <Text style={styles.loadText}>{this.state.msg}</Text>
			        </View>
			    </View>
	        </Modal>
		);
	}
}
let _width = Dimensions.get('window').width;
let _height = Dimensions.get('window').height;
const styles = StyleSheet.create({
	loadingView: {
		flex: 1,
		height: _height,
		width: _width,
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
	},
	thumbnail: {
		width: 50,
		height: 50,
		marginTop: 20,
		marginLeft: 35,
	},
	loadItem: {
		width: 120,
		height: 120,
		backgroundColor: '#5c5c5c',
		borderRadius: 10,
	},
	loadText: {
		color: '#fff',
		fontSize: 20,
		width: 120,
		marginTop: 3,
		textAlign: 'center'
	}
});


export default ToastSuccessAndError;