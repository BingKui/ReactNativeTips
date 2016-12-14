/**
 * Toasrt.js
 * @description 提供各种toast类型提示
 * @author 康兵奎
 */
'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	StyleSheet,
	View,
	Dimensions,
	Text,
	Animated,
	Image,
	Modal,
	Easing
} from 'react-native';

//定义各种提示的图标，类型有success(成功)、warning(警告)、wrong(错误)、help(帮助信息)、info(提示信息)
const _warning = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEbklEQVR4Xu2a7XETMRCGdyuADggVQCqAVACpAKiAUAGkAqACoAJCBYQKSCog6QAqWOb1rDxr+XT6Wp3HcfSHDLZP2ude7ZfEdOCDD9x+ugdwr4ADJ7DTLSAiD5n57y7fwaIAYDARvSWiMyLC32F8JaJzZr5ZGsZiAETkKRF9J6KjhJFQwjtmBozFxiIARARG/47eesrIU2a+WIrAcAAq+59EBAWEcU5En7D/ReQ1/iaiB/ohlHDCzFdLQFgCwAciem+MeRPLXLfHpYFwycwnew9Apf/HGPKZmeEAt4aIvFQfET6DP4Ayho6hChARSP+5WnCLbTAX9kQEe/+F2QrHoyPDMAC6t7+Y15d1buovEAqDP7hg5tOREhgCQA2B9EOs/8HMkHh2tIDLPnTmC6MAIJa/0nn/qfSLkxwRgUN8ZrbC41EZozsAEcGex95vdmbqPBEGw1ZIOs+et4/fjgCAhCfE/GtmtvF/vV4RgUoeafa3FfNFJA6fyA2gDNfhCqB00ZFKfjFziBQbxokIwDzR/8QWQlRwLZ7cAEyku3Mx326TOQBQDxQVBgomKMNteAKwMR+O7yj1tkoVACtFBMkQKsgwoAK3NNkFwEQWNxvzKwEglMJg+AuMK2Y+9pJANwCN+ZBpKHOTkg6LrgGgKuiOLClgHgCsRItifi0AhWBzCzhClzS5C4BWcdVOqhEAtoJNk10qxl4ANubfMnOq2xOHt6IoEMu21teU+IlmACKCsvajmaQ4UWlRgPEfrmlyE4CJYucbM6OzUzQ6AUBlNk2umjteYCsANDdDdTcb86eI9ABQh9isvm4AE8XOVosrJ4NeAArBJU2uUkBLzB+hAAXgkibXAogrtKa01EMBCqF7PcUAWmP+KAUogO40uQZAVYNzzg94KSCRJldVjEUAJvp0xTF/pAJMbtCcJmcB9DQ4UyrwVIDZCk1pcgmArgbnEgpQCPHBSlF4ngXg0eBcCoBCiA9Wst3kHAD09kOBk2xw5hKfiaKmqRjKzTPRTc4erCQBTDQ4m2J+QgE2n3dtedcWaZMAahqcubcy4wgBAX1D91Z3dLAy6wtSAIobnK0ARv5OIxec903qNDrMvwVgRNNhpLG9z94AMBHzsw3OlgWYWyPYBpDoYldiZsvhqAdf1OBsBDAkCrSsZa0Az2IntxDvTDA339znFkBTg7Nl8qUB6MvFZQ2ky9hy6/PFFYDa2NlitP3NDgDYdH6jh8i9Dc4WGDsAgIatva6zrmYBwH5Y3eBsBGAbGUVFS8s8kepsD3F9vggAtoBwTUt7F+35+wknvzrABQDr/LI3uTwXtfSz9FZKuLu08gUAYKVx1wHYnsEqyYu3QLZ8XPqtec4Xpfmrs8zYCWI+VGc48sYX3G5ieBpS+ywRwZU7pN2wa+PuYsgD7IFj7fP39furUBgAgAqShXBPd1+NKlk3Qv1ZuLEeV4MoUpAX4N9wJ6fkofvwneuwve0F7GxXeB8s61njPYAeenfht/cKuAtvsceGg1fAfyvKkF903KxQAAAAAElFTkSuQmCC';
const _success = 'data:image/png;base64,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';
const _wrong = 'data:image/png;base64,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';
const _help = 'data:image/png;base64,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';
const _info = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFhUlEQVR4XuWbi5EUNxCG1RGAIzBEwBGBuQjgIjBEYIjAJgLjCAwRABHYF4GPCIAIbCJo1zfV2urRamak2ZFmqVXV1j12Ro+//36o1ZLQuKnq/RDCTyGEK/vw9wP7+NG/hBD4/BdCuLPPrYjwd7MmLXpWVRb7cwjhiS36lGEA4+8QwjsR4fdN22YAmKRZ9MuMdLeaNAx5Y2BswoyTAbCF/2ILh9659tXRGilOTZ73o6rw88eJ/ngfIP44VUVOAkBVkTgTyS38NoTwFvqKCJKrbqqKrUCNnpsdSfsAiJci8q66c3thFQA2sT9tcn7sbwbI27WLnlqIjQkQqNi95DlsxIs1Y1YDoKrPQggs3ks9LvzNqZRckqSpHCCkQMAGQPiw1If/vgoAVf3dBvZ9fISirReeLsoYgfo9Tb5DCK9KQSgGQFWROhSMDamz8CrESydW+pwxElvj1QIVfFHSRxEAqvo+hAD1Y/vE32t0rmRStc8YGxDEI/fuBxG5WeprEYCM5Heh/NJCzDYAAlFnbItMmAVAVdExfHxsRGNeDZbm1f17VUUdcM+xEStgMLNtEgDTLagfG3E5Pvnsm6riFj0TbqZsVRYA06l/nKtD55/0tvRrkTZ1AIRoE3CRj3M2awqAv1yQg7W/OheDVwqKCZGwO3oHItLr9P0jAFQVHcflxTZJn9LJzD2nqqjVlxYAZ9SYQAkbcWgjAIw6nx31P4qId39brPnQR2JkHzYCAc8QgyVUgXEOm7EUgN9CCL/aDJtTPzFW1yKC3m7aMqrwWkRY59AOAGSkP3pw01lZZz0AYChV9YIdscADgK8k1qch/QetrX5HANi4sSWPBvGViBDjjBiA7rP/pjWXvknGBy24qc1TXpG5CQswug8PAFgOD78fWxODlKqRqR1e566F/vvxzBYg5NgGwAcVSKzxdxPx1dqlROWGEDkCgPTJwdGOfGXtQOf6fBLjwLrHYjT8tzf99wApowY/AACBTtz0fBWRaAibz9FJBONHHLBJqntu4qqKN4jZ5hsA8D6yaeSXMYJ+19YkEMqM6SPD1wAw/oeLklpToFcckHiDscCTSTTd+JwJA/xm7xYG+ACoCw1dcLKHCrD7ZLtPuwMAdZK5NABCCkDTcPRMVMAz4AiAi2fApQHwDRXwgcGlATB4AW+JL9INXnwgdGmhsGf8EAr7zdAhU9I6DLY8xB6BEDvfWNtwvet2uPdeIN0OC80kwXY0HiN1S4jsAIBP/H4SkatcSix7hNRCJXYAwGe+Rikx0mF7JEW72YBMNmhI/PpzAR8Q9UqL9wTA1zoM9IfVUwcjR2do37MKZE69sgcj6elJcxb0sgFJ2m906jV3ODpZVLAVG3oAkNH9/OGoucOUBUWVVmsBcSVu2J8mFSjJoc9R1nv3Aom14JW+lxRNzRdITOTqmqtC6WLWPGcGkP0OYf5wIuzbXJGUr6/pdnCxZpGnvFNTJtctQjxlQbXv1hZKLlZe1k5g7+dLSmXTykuiNzJHzc/xeoCzCIC5R581Gg4UDIRVN0G2Xpj5esp7EApRXrFwigAwEFImrLqg0GDx1DJj5WOS4xDmloxVDICBkBZP82/YwaBd2TBzbacqs10FgIFACi29oLDZLa4lqc3cUlt1gaMaAAOBIgpA8BXZfBWBoKx+U0aYxCnizJXrc0ON2yvVY64CwEWMTAa1SG9x8QjeApAouqqemAHNnp0yV1gXa5g8SZA61+ZG9b9LLFqMBGs6mLnF5bsBgHgfON4Rzg0T7yOwWH6fuoi52S21kxjgV+Bq/kg8Tt34rME29yw3UGEcAVmxq5sbdDMAEjCQIOqBFP1FpjUAcFljUKcWlaRNAMgwI94iB5h4fT5lCbSO94qjurD/2ETSU8j/DysOGj3Jqj6HAAAAAElFTkSuQmCC';
const _iconArray = [_success, _info, _help, _warning, _wrong];
class Toast extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opacity: new Animated.Value(0),
			flag: false,
			type: this.props.type
		};
	}
	static defaultProps = {
		type: 'info',
		msg: '提示信息',
		timeout: 2000
	};
	static propTypes = {
		type: PropTypes.oneOf(['success', 'info', 'help', 'warning', 'wrong']).isRequired, //类型
		msg: PropTypes.string.isRequired, //提示信息
		timeout: PropTypes.number //关闭时间，默认2000毫秒
	}
	componentWillUnmount() {
		this.timer && clearTimeout(this.timer);
	}
	changeType = (_type) => {
		this.setState({
			type: _type ? _type : 'success'
		});
	}
	open = () => {
		this.setState({
			flag: true
		});
		setTimeout(() => {
			this.setState({
				flag: false
			});
		}, this.props.timeout);
	}
	getIconUri = () => {
		const {
			type
		} = this.state;
		const _arr = ['success', 'info', 'help', 'warning', 'wrong'];
		return _iconArray[_arr.indexOf(type)];
	}
	render() {
		return (
			<Modal
	          animationType={"fade"}
	          transparent={true}
	          visible={this.state.flag}
	          onRequestClose={() => {}}
	          >
	          	<View style={styles.taostModal}>
	          		<View style={[styles.toast]}>
						<Image 
			            	source={{uri: this.getIconUri()}}
			            	resizeMode={Image.resizeMode.contain}
			      			style={styles.thumbnail}/>
						<Text style={styles.text}>{this.props.msg}</Text>
					</View>
	          	</View>
			</Modal>
		);
	}
}
const _width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	taostModal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
	},
	toast: {
		height: 45,
		backgroundColor: 'rgba(70,70,70,.7)',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		borderRadius: 5,
		marginBottom: 45,
	},
	thumbnail: {
		width: 26,
		height: 26,
		marginRight: 10,
		marginLeft: 10,
	},
	text: {
		padding: 3,
		fontSize: 16,
		color: '#fff'
	}
});


export default Toast;