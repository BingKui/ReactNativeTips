/**
 * Button
 * @author kangbingkui
 * @description normal[45,100],big[55,140],samll[35,60]
 * 				line[**,width-20] 
 */
'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Dimensions,
} from 'react-native';

const _width = Dimensions.get('window').width;
const _height = Dimensions.get('window').height;

class Button extends Component {
	height = 45;
	constructor(props) {
		super(props); //这一句不能省略，照抄即可
		this.state = {
			disabled: false,
		};
	}
	static propTypes = {
		type: PropTypes.oneOf(['normal', 'redius', 'line']),
		size: PropTypes.oneOf(['normal', 'big', 'small']),
		btnText: PropTypes.string.isRequired,
		bgcolor: PropTypes.string,
		onPress: PropTypes.func.isRequired,
	};
	static defaultProps = {
		type: 'normal',
		size: 'normal',
		btnText: 'OK',
		bgcolor: '#44abe5',
		onPress: () => {},
	}
	onClick = () => {
		const {
			onPress
		} = this.props;
		this.disable();
		onPress(this.enable);
	}
	_setSize = () => {
		const {
			size
		} = this.props;
		let _re = {};
		if (size === 'big') {
			_re = {
				height: 55,
				width: 140,
			};
		}
		if (size === 'small') {
			_re = {
				height: 35,
				width: 60,
			};
		}
		return _re;
	}
	_setFontSize = () => {
		const {
			size
		} = this.props;
		let _re = {};
		if (size === 'big') {
			_re = {
				fontSize: 26,
			};
		}
		if (size === 'small') {
			_re = {
				fontSize: 14,
			};
		}
		return _re;
	}
	_setType = () => {
		const {
			type,
			size
		} = this.props;
		let _re = {};
		if (type === 'redius') {
			_re = {
				borderRadius: (this.height - 10) / 2,
			};
		}
		if (type === 'line') {
			_re = {
				width: _width - 20,
				marginLeft: 10,
				marginRight: 10,
			};
		}
		return _re;
	}
	enable = () => {
		this.setState({
			disabled: false
		});
	}
	disable = () => {
		this.setState({
			disabled: true
		});
	}
	render() {
		const {
			btnText
		} = this.props;
		return (
			<TouchableOpacity 
				disabled={this.state.disabled} 
				onPress={this.onClick} 
				style={[styles.btn, this._setSize(), this._setType(),{backgroundColor:this.props.bgcolor}, this.state.disabled && styles.disabled]}>
				<Text style={[styles.btnText, this._setFontSize(),this.state.disabled && styles.disabledText]}>{btnText}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		height: 45,
		width: 100,
		borderRadius: 3,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 5,
		alignSelf: 'flex-start'
	},
	btnText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 20
	},
	disabled: {
		backgroundColor: '#ccc'
	},
	disabledText: {
		color: '#eee'
	},
});


export default Button;