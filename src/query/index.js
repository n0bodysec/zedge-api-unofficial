const axios = require('axios');
const constants = require('../utils/constants');

const query = function query()
{
	/**
	 * Returns the upload categories for the given content type
	 * @param {string} contentType
	 * @returns {object}
	 */
	this.categories = async (contentType) =>
	{
		const request = JSON.stringify({
			query: '\n    query categories($contentType: BrowseContentType!) {\n      contentCategoriesAsUgc(contentType: $contentType) {\n        id\n        name\n      }\n    }\n  ',
			variables: {
				contentType: contentType,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.contentCategoriesAsUgc;
	};
};

module.exports = query;
