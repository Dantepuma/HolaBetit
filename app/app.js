'use strict';
require('angular');
require('angular-ui-router');

require('./components/homeContacts.js'); //contacts.controller

var myApp = angular.module('contactsApp', ['ui.router','contacts.controller'])

myApp.config(function($stateProvider, $urlRouterProvider) {

 $urlRouterProvider.otherwise("/");

	$stateProvider
	.state('home', {
		url: "/",
		views : {
			"" : {
				templateUrl:"components/home.html",
        controller: 'ContactCtrl'
			},
			"addContactForm@home":{
				templateUrl:'components/homeAddContactForm.html'
			},
			"table@home":{
				templateUrl:'components/homeTable.html'
			},
			"header@home":{
				templateUrl:'shared/header.html'
			},
      "footer@home":{
				templateUrl:'shared/footer.html'
			}
		}
	});
});
