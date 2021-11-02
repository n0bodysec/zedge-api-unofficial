const axios = require('axios');
const constants = require('../utils/constants');

const android = function android()
{
	this.buildUrl = (path = null, endpoint, value, extra, params) =>
	{
		let url = constants.API_URL_ANDROID;
		url += (path == null ? '/content-browse-v2/v1/ANDROID/' : path);
		url += endpoint;
		if (value != null) url += '/' + value;
		if (extra != null) url += '/' + extra;
		if (params != null)
		{
			let args = '';
			let i = 0;

			Object.keys(params).forEach((key) =>
			{
				args += `${i !== 0 ? '&' : ''}${key}=${params[key]}`;
				i++;
			});
			url += '?' + args;
		}
		return url;
	};

	/**
	 * Returns featured content of the given module
	 * @param {string} module
	 * @param {number} thumbWidth
	 * @param {number} thumbHeight
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @returns {object}
	 */
	this.showFeatured = async (module, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560) =>
	{
		const url = this.buildUrl(null, 'modules', module, null, {
			thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight,
		});

		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a bunch of content for the given module
	 * @param {string} module
	 * @param {number} thumbWidth
	 * @param {number} thumbHeigh
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @param {number} page
	 * @param {number} size
	 * @returns {object}
	 */
	this.browse = async (module, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560, page = 0, size = 120) =>
	{
		const url = this.buildUrl(null, 'modules', module, 'browse', {
			thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight, page: page, size: size,
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a bunch of content for the given item related to the given keyword
	 * @param {string} item
	 * @param {number} keyword
	 * @param {number} thumbWidth
	 * @param {number} thumbHeight
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @param {number} page
	 * @param {number} size
	 * @returns {object}
	 */
	this.items = async (item, keyword, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560, page = 0, size = 120) =>
	{
		/**
		 * size default value: 15
		 * size 'see more' value: 120
		 */

		const url = this.buildUrl(null, 'items', item, 'search', {
			thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight, page: page, size: size,
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns information of the given item id
	 * @param {string} item
	 * @param {number} thumbWidth
	 * @param {number} thumbHeight
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @returns {object}
	 */
	this.getItem = async (item, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560) =>
	{
		const url = this.buildUrl(null, 'items', item, null, {
			thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight,
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a bunch of content related to the given category of the given type
	 * @param {string} type
	 * @param {number} category
	 * @param {number} thumbWidth
	 * @param {number} thumbHeight
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @param {number} page
	 * @param {number} size
	 * @returns {object}
	 */
	this.category = async (type, category, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560, page = 0, size = 120) =>
	{
		const url = this.buildUrl(null, 'items', type, `category/${category}/browse`, {
			thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight, page: page, size: size,
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a count of content of all types for the given keyword
	 * @param {string} keyword
	 * @param {number} thumbWidth
	 * @param {number} thumbHeight
	 * @param {number} previewWidth
	 * @param {number} previewHeight
	 * @returns {object}
	 */
	this.counts = async (keyword, thumbWidth = 720, thumbHeight = 1080, previewWidth = 1440, previewHeight = 2560) =>
	{
		const url = this.buildUrl(null, 'items', constants.itemTypes.Search, 'counts', {
			keyword: keyword, itemType: 'WALLPAPER', itemType: 'LIVE_WALLPAPER', itemType: 'RINGTONE', itemType: 'NOTIFICATION_SOUND', thumbWidth: thumbWidth, thumbHeight: thumbHeight, previewWidth: previewWidth, previewHeight: previewHeight, // eslint-disable-line no-dupe-keys
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a list of related queries to the given query
	 * @param {string} query
	 * @param {number} ctype
	 * @returns {object}
	 */
	this.related = async (query, ctype = 46) =>
	{
		/**
		 * discovered ctype values: 46, 112, 73, 74
		 */

		const url = this.buildUrl(null, 'queries', null, 'related', {
			query: query, ctype: ctype,
		});
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns a list of categories for the given item type
	 * @param {string} type
	 * @returns {object}
	 */
	this.discoverSections = async (type) =>
	{
		const url = this.buildUrl(null, 'discover-sections', type, null, null);
		const ret = await axios.get(url);
		return ret.data;
	};

	/**
	 * Returns download info for the given item. It works for licensed (bearer token required) and unlicensed (null token) items
	 * @param {string} item
	 * @param {number} width
	 * @param {number} height
	 * @param {string} token
	 * @returns {object}
	 */
	this.download = async (item, width = 1440, height = 2560, token = null) =>
	{
		const isLicensed = token != null;
		const url = this.buildUrl('/download/ANDROID/', isLicensed === true ? 'LICENSED' : 'UNLICENSED', item, null, {
			width: width, height: height,
		});

		let ret = null;

		if (isLicensed === true)
		{
			ret = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
		}
		else
		{
			ret = await axios.get(url);
		}
		return ret.data;
	};
};

module.exports = android;
