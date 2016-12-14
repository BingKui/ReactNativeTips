/**
 * 提示Alert组件
 * @author 康兵奎
 * @date 2016年12月13日
 */
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
	Dimensions,
	TouchableHighlight
} from 'react-native';

class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = {
			flag: false,
		};
	}
	static defaultProps = {
		title: '标题',
		msg: '提示信息',
		callback: () => {},
		btnText: '确定'
	};
	static propTypes = {
		msg: PropTypes.string.isRequired, //提示信息
		title: PropTypes.string.isRequired,
		callback: PropTypes.func,
		btnText: PropTypes.string
	}
	open = () => {
		this.setState({
			flag: true
		});
	}
	_onPress = () => {
		this.setState({
			flag: false
		});
		this.props.callback();
	}
	render() {
		return (
			<Modal animationType={"none"}
		        transparent={true}
		        visible={this.state.flag}
		        onRequestClose={() => {}}>
				<View style={styles.alertModal}>
	          		<View style={[styles.alert]}>
	          			<View style={styles.title}>
	          				<Text style={styles.titleCon}>{this.props.title}</Text>
	          			</View>
	          			<Text style={styles.text}>{this.props.msg}</Text>
	          			<View style={styles.btn}>
	          				<TouchableHighlight underlayColor='#eee' onPress={this._onPress} style={styles.btnClick}>
	          					<Text style={styles.btnText}>{this.props.btnText}</Text>
	          				</TouchableHighlight>
	          			</View>
					</View>
	          	</View>
	        </Modal>
		);
	}
}
let _width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	alertModal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: 'rgba(0,0,0,.45)'
	},
	alert: {
		width: _width * .7,
		backgroundColor: 'rgba(255,255,255,1)',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		overflow: 'hidden'
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		borderBottomColor: '#eee',
		borderBottomWidth: .5
	},
	titleCon: {
		flex: 1,
		textAlign: 'center',
		fontSize: 25
	},
	text: {
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 5,
		marginBottom: 5,
		fontSize: 18
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 40,
		borderTopColor: '#eee',
		borderTopWidth: .5,
		overflow: 'hidden'
	},
	btnClick: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5
	},
	btnText: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		overflow: 'hidden',
		fontSize: 20,
		fontWeight: '700'
	}
});


export default Alert;