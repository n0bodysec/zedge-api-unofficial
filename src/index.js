const Search = require('./search');
const Content = require('./content');
const Browse = require('./browse');
const User = require('./user');
const Query = require('./query');
const Android = require('./android');

const API = function API()
{
	this.search = new Search();
	this.content = new Content();
	this.browse = new Browse();
	this.user = new User();
	this.query = new Query();
	this.android = new Android();
};

module.exports = API;
