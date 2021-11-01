const axios = require('axios');
const constants = require('../utils/constants');

const search = function search()
{
	/**
	 * Returns a bunch of search terms related to the given keyword
	 * @param {string} keyword
	 * @param {string} contentType
	 * @returns {object}
	 */
	this.searchTerms = async (keyword, contentType = constants.contentTypes.All) =>
	{
		const request = JSON.stringify({
			query: '\n    query searchTerms($keyword: String!, $contentType: BrowseContentType) {\n      searchTermsAsUgc(keyword: $keyword, contentType: $contentType)\n    }\n  ',
			variables: {
				keyword: keyword,
				contentType: contentType,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.searchTermsAsUgc;
	};

	/**
	 * Returns public content related to the given keyword
	 * @param {string} keyword
	 * @param {string} contentType
	 * @param {number} size
	 * @returns {object}
	 */
	this.search = async (keyword, contentType = constants.contentTypes.All, size = 24) =>
	{
		const request = JSON.stringify({
			query: '\n    query search($input: SearchAsUgcInput!) {\n      searchAsUgc(input: $input) {\n        ...browseContentItemsResource\n      }\n    }\n    \n  fragment browseContentItemsResource on BrowseContentItems {\n    page\n    total\n    items {\n      ... on BrowseWallpaper {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n      }\n\n      ... on BrowseRingtone {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n        meta {\n          durationMs\n          previewUrl\n          gradientStart\n          gradientEnd\n        }\n      }\n    }\n  }\n\n  ',
			variables: {
				input: {
					keyword: keyword,
					contentType: contentType,
					size: size,
				},
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.searchAsUgc;
	};
};

module.exports = search;
