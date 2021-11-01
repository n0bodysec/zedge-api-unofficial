const axios = require('axios');
const constants = require('../utils/constants');

const content = function content()
{
	/**
	 * Returns the download URL for the given item id
	 * @param {string} itemId
	 * @returns {string}
	 */
	this.contentDownloadUrl = async (itemId) =>
	{
		const request = JSON.stringify({
			query: '\n    query contentDownloadUrl($itemId: ID!) {\n      contentDownloadUrlAsUgc(itemId: $itemId)\n    }\n  ',
			variables: {
				itemId: itemId,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.contentDownloadUrlAsUgc;
	};
};

module.exports = content;
