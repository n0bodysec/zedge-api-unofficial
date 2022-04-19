const Zedge = require('../index');
const constants = require('../src/utils/constants');

(async () =>
{
	try
	{
		const zedge = new Zedge();

		const search = await zedge.search.search('javascript');
		if (search.items[0] != null)
		{
			const url = await zedge.content.contentDownloadUrl(search.items[0].id);

			console.log('First item containing keyword "javascript":\n', search.items[0]);
			console.log('\nDownload URL: ' + url);
		}

		const terms = await zedge.search.searchTerms('cat', constants.contentTypes.All);
		console.log('\nSearch terms related to the word "cat": ' + terms);

		const trends = await zedge.browse.browse(constants.contentTypes.All, 0, 1);
		console.log('\nThe most popular trend:\n', trends);
	}
	catch (e)
	{
		console.error(e);
	}
})();
