module.exports = Object.freeze({
	API_URL: 'https://api-gateway.zedge.net',
	API_URL_ANDROID: 'https://api.prod.zedge.net',

	contentTypes: {
		All: 'ALL', // Web browser
		Wallpapers: 'WALLPAPER',
		Live: 'LIVE_WALLPAPER', // Android
		Ringtones: 'RINGTONE',
		Notifications: 'NOTIFICATION_SOUND', // Android
		Videos: 'VIDEO', // Android
	},

	itemTypes: {
		Wallpapers: 'WALLPAPER',
		Live: 'LIVE_WALLPAPER',
		Ringtones: 'RINGTONE',
		Notifications: 'NOTIFICATION_SOUND',
		Videos: 'VIDEO',
		Profile: 'PROFILE',
		Search: 'search',
	},

	androidModules: {
		WALLPAPER_FEATURED: '9a7c7029-58ce-400d-bedc-9482998075ac',
		WALLPAPER_POPULAR: '31b17cf3-c516-4dbc-a62b-93e2822b2b33',
		WALLPAPER_PREMIUM: '77bd50b7-5043-4eff-b046-1d4dddc0cded',

		VIDEO_FEATURED: '694a48d4-19a9-418a-a818-0a1ccb5652a6', // LIVE_WALLPAPER?
		VIDEO_POPULAR: 'b0f40bef-52c8-4e51-8850-7d1f8a58d611', // LIVE_WALLPAPER?

		RINGTONE_FEATURED: 'c1b1cfd8-4112-44d8-8512-9bff6bc85d02',
		RINGTONE_POPULAR: '194e5c92-bb88-42c2-beca-2e789311878f',
		RINGTONE_PREMIUM: '280f0ecf-25cb-49af-ab8c-f6d0c462f5ea',

		NOTIFICATION_FEATURED: '87eefa0b-c1d3-40ce-9712-c79da6d26163',
		NOTIFICATION_POPULAR: 'c1ffd969-ad0b-448d-bf2a-41a04cb8305a',
		NOTIFICATION_PREMIUM: 'f8341101-d308-4286-af3d-b8d1d8774b5c',
	},
});
