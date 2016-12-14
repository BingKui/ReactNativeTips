'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Modal,
	Dimensions,
	TouchableHighlight,
	Text
} from 'react-native';

class Confirm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			flag: false
		};
	}
	static propTypes = {
		btnLeftText: PropTypes.string,
		btnRightText: PropTypes.string,
		leftFunc: PropTypes.func,
		rightFunc: PropTypes.func,
		title: PropTypes.string.isRequired,
		msg: PropTypes.string.isRequired
	};
	static defaultProps = {
		btnLeftText: '取消',
		btnRightText: '确定',
		leftFunc: () => {},
		rightFunc: () => {},
		title: 'Confirm',
		msg: '这个是提示信息！'
	}
	open = () => {
		this.setState({
			flag: true
		});
	}
	_onLeftPress = () => {
		this.props.leftFunc();
		this.setState({
			flag: false
		});
	}
	_onRightPress = () => {
		this.props.rightFunc();
		this.setState({
			flag: false
		});
	}
	render() {
		return (
			<Modal animationType={"none"}
		        transparent={true}
		        visible={this.state.flag}
		        onRequestClose={() => {}}>
				<View style={styles.confirmModal}>
	          		<View style={styles.confirm}>
	          			<View style={styles.title}>
	          				<Text style={styles.titleCon}>{this.props.title}</Text>
	          			</View>
	          			<View style={styles.content}>
	          				<Text style={styles.text}>{this.props.msg}</Text>
	          			</View>
	          			<View style={styles.btn}>
	          				<TouchableHighlight underlayColor='#eee' onPress={this._onLeftPress} style={styles.btnClick}>
	          					<View style={[styles.btnView, styles.btnLeft]}>
	          						<Text style={styles.btnText}>{this.props.btnLeftText}</Text>
	          					</View>
	          				</TouchableHighlight>
	          				<TouchableHighlight underlayColor='#eee' onPress={this._onRightPress} style={styles.btnClick}>
	          					<View style={[styles.btnView,styles.btnRight]}>
	          						<Text style={styles.btnText}>{this.props.btnRightText}</Text>
	          					</View>
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
	confirmModal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: 'rgba(0,0,0,.45)'
	},
	confirm: {
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
		height: 45,
		borderBottomColor: '#eee',
		borderBottomWidth: .5
	},
	titleCon: {
		flex: 1,
		textAlign: 'center',
		fontSize: 25
	},
	content: {
		paddingTop: 10,
		paddingBottom: 10,
		marginTop: 5,
		marginBottom: 5,
		minHeight: 110,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		fontSize: 18,
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 45,
		borderTopColor: '#eee',
		borderTopWidth: .5,
		overflow: 'hidden'
	},
	btnClick: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		overflow: 'hidden',
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
	},
	btnText: {
		textAlign: 'center',
		textAlignVertical: 'center',
		overflow: 'hidden',
		fontSize: 20,
		fontWeight: '700',
	},
	btnView: {
		flex: 1,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderLeftColor: '#eee',
		borderLeftWidth: 1,
	},
	btnLeft: {
		borderBottomLeftRadius: 5,
	},
	btnRight: {
		borderLeftColor: '#eee',
		borderLeftWidth: .5,
		borderBottomRightRadius: 5,
	},
});


export default Confirm;