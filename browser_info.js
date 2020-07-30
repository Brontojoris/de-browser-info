/*
Name: browser_info
Description: Return information about the current browser..
             Based on https://github.com/DamonOehlman/detect-browser
Extension: Core
Type: Custom Code
Returns: Object: {
	agentId : key for regex match in userAgentRules,
	browser : human readable label for the identified browser.
	version : browser version,
	os :      Operating system matched
	deviceType:Guess for type of device being used
}
License: The MIT License (MIT)

Copyright (c) 2019 Damon Oehlman damon.oehlman@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var browserLabel = {
		android: 'Android Browser',
		'ahrefs': 'AHrefs Bot',
		aol: 'AOL Browser',
		bb10: 'Blackberry 10',
		beaker: 'Beaker',
		bing: 'Bing Bot',
		crios: 'Chrome iOS',
		chrome: 'Chrome',
		'chromium-webview': 'Chrome WebView',
		edge: 'EdgeHTML',
		'edge-chromium':'Edge (Chrome)',
		'edge-ios': 'Edge iOS',
		facebook: 'Facebook Webview',
		'fb-bot': 'Facebook Bot',
		firefox: 'Firefox',
		fxios: 'Firefox iOS',
		googlebot : 'GoogleBot',
		instagram: 'Instagram Webview',
		'ios-webview1': 'iOS Webview',
		'ios-webview2': 'iOS Webview',
		kakaotalk: 'Kakao Talk',
		ie1: 'Internet Explorer',
		ie2: 'Internet Explorer',
		ie3: 'Internet Explorer',
		ios: 'Mobile Safari',
		miui: 'Miui',
		'opera-mini': 'Opera',
		opera1: 'Opera',
		opera2: 'Opera',
		phantomjs: 'PhantomJS',
		safari: 'Safari',
		samsung: 'Samsung Internet Browser',
		silk: 'Silk',
		searchbot: 'Search Bot',
		yandexbrowser: 'Yandex'
	},
	deviceTypes = {
		Bot: /(AhrefsBot|PhantomJS|YandexBot|nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiverbot|crawl(er|ing)|feedburner|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex)/,
		Nokia: /Symbian|SymbOS|Maemo/,
		"Windows Phone": /Windows Phone/,
		Blackberry: /BlackBerry|BB10/,
		Android: /Android/,
		iPad: /iPad/,
		iPod: /iPod/,
		iPhone: /iPhone/,
		Desktop: /.*/
	},
	userAgentRules = {
		'aol': /AOLShield\/([0-9\._]+)/,
		'edge': /Edge\/([0-9\._]+)/,
		'edge-ios': /EdgiOS\/([0-9\._]+)/,
		'yandexbrowser': /YaBrowser\/([0-9\._]+)/,
		'kakaotalk': /KAKAOTALK\s([0-9\.]+)/,
		'samsung': /SamsungBrowser\/([0-9\.]+)/,
		'silk': /\bSilk\/([0-9._-]+)\b/,
		'miui': /MiuiBrowser\/([0-9\.]+)$/,
		'beaker': /BeakerBrowser\/([0-9\.]+)/,
		'edge-chromium': /Edg\/([0-9\.]+)/,
		'chromium-webview': /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
		'chrome': /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
		'phantomjs': /PhantomJS\/([0-9\.]+)(:?\s|$)/,
		'crios': /CriOS\/([0-9\.]+)(:?\s|$)/,
		'firefox': /Firefox\/([0-9\.]+)(?:\s|$)/,
		'fxios': /FxiOS\/([0-9\.]+)/,
		'opera-mini': /Opera Mini.*Version\/([0-9\.]+)/,
		'opera1': /Opera\/([0-9\.]+)(?:\s|$)/,
		'opera2': /OPR\/([0-9\.]+)(:?\s|$)/,
		'ie1': /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/,
		'ie2': /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/,
		'ie3': /MSIE\s(7\.0)/,
		'bb10': /BB10;\sTouch.*Version\/([0-9\.]+)/,
		'android': /Android\s([0-9\.]+)/,
		'ios': /Version\/([0-9\._]+).*Mobile.*Safari.*/,
		'safari': /Version\/([0-9\._]+).*Safari/,
		'facebook': /FBAV\/([0-9\.]+)/,
		'instagram': /Instagram\s([0-9\.]+)/,
		'ios-webview1': /AppleWebKit\/([0-9\.]+).*Mobile/,
		'ios-webview2': /AppleWebKit\/([0-9\.]+).*Gecko\)$/,
		'googlebot': /Googlebot|google web preview/,
		'fb':/facebookexternalhit/,
		'alexa':/ia_archiver/,
		'ahrefs':/AhrefsBot/,
		'bing':/BingBot|MSNBot/,
		'searchbot': /bot|crawl(er|ing)|feedburner|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,
	},
	operatingSystemRules = {
		'iOS': /iP(hone|od|ad)/,
		'Android OS': /Android/,
		'BlackBerry OS': /BlackBerry|BB10/,
		'Windows Mobile': /IEMobile/,
		'Amazon OS': /Kindle/,
		'Windows 3.11': /Win16/,
		'Windows 95': /(Windows 95)|(Win95)|(Windows_95)/,
		'Windows 98': /(Windows 98)|(Win98)/,
		'Windows 2000': /(Windows NT 5.0)|(Windows 2000)/,
		'Windows XP': /(Windows NT 5.1)|(Windows XP)/,
		'Windows Server 2003': /(Windows NT 5.2)/,
		'Windows Vista': /(Windows NT 6.0)/,
		'Windows 7': /(Windows NT 6.1)/,
		'Windows 8': /(Windows NT 6.2)/,
		'Windows 8.1': /(Windows NT 6.3)/,
		'Windows 10': /(Windows NT 10.0)/,
		'Windows ME': /Windows ME/,
		'Open BSD': /OpenBSD/,
		'Sun OS': /SunOS/,
		'Chrome OS': /CrOS/,
		'Linux': /(Linux)|(X11)/,
		'Mac OS': /(Mac_PowerPC)|(Macintosh)/,
		'QNX': /QNX/,
		'BeOS': /BeOS/,
		'OS/2': /OS\/2/
	},
	createVersionParts = function(count) {
		var output = [];
		for (var ii = 0; ii < count; ii++) {output.push('0');}
		return output;
	},
	matchUserAgent = function (ua) {
		for (var agent in userAgentRules) {
			var matched = ua.match(userAgentRules[agent])
			if(matched){return {agent:agent, matched:matched, match:matched}}
		}
		return {}
	},
	browserName = function(ua) {
		var data = matchUserAgent(ua);
		return data.matched ? data.matched[0] : null;
	},
	detectOS = function(ua) {
		for (var os in operatingSystemRules) {
			var matched = ua.match(operatingSystemRules[os])
			if(matched){
				return os
			}
		}
	},
	detectDeviceTypes = function(ua){
		for (var device in deviceTypes) {
			var matched = ua.match(deviceTypes[device])
			if(matched){
				return device
			}
		}
	},
	parseUserAgent = function(ua) {
		var matchedRule = matchUserAgent(ua);
		var agent = matchedRule.agent, match = matchedRule.match;
		if (!agent) {return null;}
		var versionParts = (match[1] && match[1].split(/[._]/).slice(0, 3));
		var version = versionParts && versionParts.join('.');
		var os = detectOS(ua);
		var deviceType = detectDeviceTypes(ua);
		return {
			agentId:agent,browser:browserLabel[agent],version:version,os:os,deviceType:deviceType,
			debug:{notice:'debug{} object is EOL',userAgent:ua, match:match}
		}
	};

return parseUserAgent(navigator.userAgent)
