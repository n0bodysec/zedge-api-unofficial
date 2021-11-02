const axios = require('axios');
const constants = require('../utils/constants');

const android = function android()
{
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
		/**
		 * lastSearchKeywords param can be added multiple times. This parameter contains the last searched keywords
		 * e.g. &lastSearchKeywords=cat&lastSearchKeywords=dog
		 */

		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/modules/${module}?thumbWidth=${thumbWidth}&thumbHeight=${thumbHeight}&previewWidth=${previewWidth}&previewHeight=${previewHeight}`;
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
		/**
		 * lastSearchKeywords param can be added multiple times. This parameter contains the last searched keywords
		 * e.g. &lastSearchKeywords=cat&lastSearchKeywords=dog
		 */

		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/modules/${module}/browse?thumbWidth=${thumbWidth}&thumbHeight=${thumbHeight}&previewWidth=${previewWidth}&previewHeight=${previewHeight}&page=${page}&size=${size}`;
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

		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/items/${item}/search?keyword=${keyword}&thumbWidth=${thumbWidth}&thumbHeight=${thumbHeight}&previewWidth=${previewWidth}&previewHeight=${previewHeight}&page=${page}&size=${size}`;
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
		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/items/${type}/category/${category}/browse?thumbWidth=${thumbWidth}&thumbHeight=${thumbHeight}&previewWidth=${previewWidth}&previewHeight=${previewHeight}&page=${page}&size=${size}`;
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
		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/items/${constants.itemTypes.Search}/counts?keyword=${keyword}&itemType=WALLPAPER&itemType=LIVE_WALLPAPER&itemType=RINGTONE&itemType=NOTIFICATION_SOUND&thumbWidth=${thumbWidth}&thumbHeight=${thumbHeight}&previewWidth=${previewWidth}&previewHeight=${previewHeight}`;
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

		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v1/ANDROID/queries/related?query=${query}&ctype=${ctype}`;
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
		const url = `${constants.API_URL_ANDROID}/content-browse-v2/v2/ANDROID/discover-sections/${type}`;
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
		const url = `${constants.API_URL_ANDROID}/download/ANDROID/${isLicensed === true ? 'LICENSED' : 'UNLICENSED'}/${item}?width=${width}&height=${height}`;
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
