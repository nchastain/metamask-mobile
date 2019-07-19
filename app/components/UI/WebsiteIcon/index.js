import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { colors, fontStyles } from '../../../styles/common';
import { getHost } from '../../../util/browser';

const styles = StyleSheet.create({
	fallback: {
		alignContent: 'center',
		backgroundColor: colors.grey400,
		borderRadius: 27,
		height: 54,
		justifyContent: 'center',
		width: 54
	},
	fallbackText: {
		...fontStyles.normal,
		color: colors.white,
		fontSize: 24,
		textAlign: 'center'
	}
});

/**
 * View that renders a website logo depending of the context
 */
export default class WebsiteIcon extends PureComponent {
	static propTypes = {
		/**
		 * Style object for image
		 */
		style: PropTypes.object,
		/**
		 * Style object for main view
		 */
		viewStyle: PropTypes.object,
		/**
		 * Style object for text in case url not found
		 */
		textStyle: PropTypes.object,
		/**
		 * String corresponding to website title
		 */
		title: PropTypes.string,
		/**
		 * String corresponding to website url
		 */
		url: PropTypes.string,
		/**
		 * Flag that determines if the background
		 * should be transaparent or not
		 */
		transparent: PropTypes.bool
	};

	state = {
		renderIconUrlError: false
	};

	/**
	 * Get image url from favicon api
	 */
	getIconUrl = url => {
		const iconUrl = `https://api.faviconkit.com/${getHost(url)}/64`;
		return iconUrl;
	};

	/**
	 * Sets component state to renderIconUrlError to render placeholder image
	 */
	onRenderIconUrlError = async () => {
		await this.setState({ renderIconUrlError: true });
	};

	render = () => {
		const { renderIconUrlError } = this.state;
		const { url, viewStyle, style, title, textStyle, transparent } = this.props;
		const apiLogoUrl = { uri: this.getIconUrl(url) };

		if (renderIconUrlError && title) {
			return (
				<View style={viewStyle}>
					<View style={[styles.fallback, style]}>
						<Text style={[styles.fallbackText, textStyle]}>{title.substring(0, 1).toUpperCase()}</Text>
					</View>
				</View>
			);
		}

		return (
			<View style={viewStyle}>
				<FadeIn placeholderStyle={{ backgroundColor: transparent ? colors.transparent : colors.white }}>
					<Image source={apiLogoUrl} style={style} onError={this.onRenderIconUrlError} />
				</FadeIn>
			</View>
		);
	};
}
