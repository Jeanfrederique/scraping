
var request = require ('request');
var domino = require ('domino');
var Zepto = require ('zepto-node');
var debug = require('debug')('scrape');

var BASE_URL = 'http://dailycaller.com/2013/12/04/young-people-turn-on-obama/'; 

//Fetch user input()
var appID = process.argv[2];

var url = BASE_URL; 

//Fetch Web Page.
console.log('Searching for page', appID);
request({url:url}, function(err, response, body){
	if (err || response.statusCode !==200){
	return console.warn('Failed to find page');
	}
	var myWindow = domino.createWindow(body); 
	var $ = Zepto(myWindow); 

	var appInfo = {
    title: $('.pic-container img').attr('alt'),
    body: $('#thepost').html(),
    image: $('.pic-container img').attr('src'),
    author: $('.innerauthor').text().trim(),
    category: $('.article-category').text().trim(), 
    PublishedDate: $('.dateline').text().trim(),
    
  };

  console.log('Info: ', appInfo);
}) 