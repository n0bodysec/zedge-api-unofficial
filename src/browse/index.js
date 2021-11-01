const axios = require('axios');
const constants = require('../utils/constants');

const content = function content()
{
	/**
	 * Returns a bunch of content related to the given content type
	 * @param {string} contentType
	 * @param {number} page
	 * @param {number} size
	 * @returns {object}
	 */
	this.browse = async (contentType = constants.contentTypes.All, page = null, size = 24) =>
	{
		const request = JSON.stringify({
			query: '\n    query browse($input: BrowseAsUgcInput!) {\n      browseAsUgc(input: $input) {\n        ...browseContentItemsResource\n      }\n    }\n    \n  fragment browseContentItemsResource on BrowseContentItems {\n    page\n    total\n    items {\n      ... on BrowseWallpaper {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n      }\n\n      ... on BrowseRingtone {\n        id\n        contentType\n        title\n        tags\n        imageUrl\n        placeholderUrl\n        licensed\n        meta {\n          durationMs\n          previewUrl\n          gradientStart\n          gradientEnd\n        }\n      }\n    }\n  }\n\n  ',
			variables: {
				input: {
					contentType: contentType,
					page: page,
					size: size,
				},
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.browseAsUgc;
	};

	/**
	 * Returns the content information of the given item id
	 * @param {string} itemId
	 * @returns {object}
	 */
	this.browseItem = async (itemId) =>
	{
		const request = JSON.stringify({
			query: '\n    query browseItem($itemId: ID!) {\n      browseItemAsUgc(itemId: $itemId) {\n        ...browseContentItemResource\n      }\n    }\n    \n  fragment browseContentItemResource on BrowseContentItem {\n    ... on BrowseWallpaper {\n      id\n      contentType\n      title\n      description\n      tags\n      imageUrl\n      placeholderUrl\n      shareUrl\n      downloadCount\n      dateUploaded\n      licensed\n      profile {\n        avatarIconUrl\n        id\n        name\n        shareUrl\n      }\n    }\n\n    ... on BrowseRingtone {\n      id\n      contentType\n      title\n      description\n      tags\n      imageUrl\n      placeholderUrl\n      shareUrl\n      downloadCount\n      dateUploaded\n      licensed\n      profile {\n        avatarIconUrl\n        id\n        name\n        shareUrl\n      }\n      meta {\n        durationMs\n        previewUrl\n        gradientStart\n        gradientEnd\n      }\n    }\n  }\n\n  ',
			variables: {
				itemId: itemId,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.browseItemAsUgc;
	};

	/**
	 * Returns the user stats of the given profile id
	 * @param {string} profileId
	 * @returns {object}
	 */
	this.browseProfileStatsTotal = async (profileId) =>
	{
		const request = JSON.stringify({
			query: '\n    query browseProfileStatsTotal($profileId: String!) {\n      browseProfileStatsTotalAsUgc(profileId: $profileId) {\n        totalUploadsCount\n        totalDownloadsCount\n      }\n    }\n  ',
			variables: {
				profileId: profileId,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.browseProfileStatsTotalAsUgc;
	};

	/**
	 * Returns the profile uploaded content of the given profile id
	 * @param {string} profileId
	 * @param {number} size
	 * @returns {object}
	 */
	this.browseProfileContent = async (profileId, size = 24) =>
	{
		const request = JSON.stringify({
			query: '\n    query browseProfileContent($input: BrowseProfileContentInput!) {\n      browseProfileContentAsUgc(input: $input) {\n        total\n        items {\n          ...browseProfileContentItemResource\n        }\n      }\n    }\n    \n  fragment browseProfileContentItemResource on BrowseContentItem {\n    ... on BrowseWallpaper {\n      id\n      contentType\n      title\n      description\n      tags\n      imageUrl\n      placeholderUrl\n      shareUrl\n      downloadCount\n      dateUploaded\n      licensed\n      profile {\n        avatarIconUrl\n        id\n        name\n      }\n    }\n\n    ... on BrowseRingtone {\n      id\n      contentType\n      title\n      description\n      tags\n      imageUrl\n      shareUrl\n      downloadCount\n      dateUploaded\n      licensed\n      profile {\n        avatarIconUrl\n        id\n        name\n      }\n      meta {\n        durationMs\n        previewUrl\n        gradientStart\n        gradientEnd\n      }\n    }\n  }\n\n  ',
			variables: {
				input: {
					profileId: profileId,
					size: size,
				},
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.browseProfileContentAsUgc;
	};

	/**
	 * Returns the profile information of the given profile id
	 * @param {string} profileId
	 * @returns {object}
	 */
	this.browseProfile = async (profileId) =>
	{
		const request = JSON.stringify({
			query: '\n    query browseProfile($profileId: ID!) {\n      browseProfileAsUgc(profileId: $profileId) {\n        id\n        name\n        avatarUrl\n        shareUrl\n        stats {\n          downloadsCount\n        }\n        profileType\n      }\n    }\n  ","variables":{"profileId":"f7fe4e89-e6ab-47c1-9b26-fc6e2a8055ca',
			variables: {
				profileId: profileId,
			},
		});

		const ret = await axios.post(constants.API_URL, request, { headers: { 'Content-Type': 'application/json' } });
		return ret.data.data.browseProfileAsUgc;
	};
};

module.exports = content;
