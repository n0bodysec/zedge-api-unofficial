const axios = require('axios');
const constants = require('../utils/constants');

const user = function user()
{
	/**
	 * Returns the uploaded content from the given profile id
	 * @param {string} profileId
	 * @param {number} size
	 * @returns {object}
	 */
	this.userContent = async (profileId, size = 25) =>
	{
		const request = JSON.stringify({
			query: '\n    query userContent($profileId: ID!, $filters: UserContentFilterInput) {\n      userContentAsUgc(profileId: $profileId, filters: $filters) {\n        continuation\n        items {\n          ... on Ringtone {\n            id\n            name\n            contentType\n            status\n            imageUrl\n            flags\n            tags\n            description\n            categoryId\n            meta {\n              gradient {\n                start\n                end\n              }\n              previewUrl\n            }\n          }\n\n          ... on Wallpaper {\n            id\n            name\n            contentType\n            status\n            imageUrl\n            placeholderUrl\n            flags\n            tags\n            description\n            categoryId\n          }\n        }\n      }\n    }\n  ',
			variables: {
				contentType: profileId,
				filters: {
					size: size,
				},
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.userContentAsUgc;
	};
};

module.exports = user;
