var countries = require('country-list')(); // country list

angular.module('contacts.controller', [])
.controller('ContactCtrl',function($scope, $filter, $anchorScroll, ContactService) {
		$scope.sortField    = 'firstName'; 										//  default sort field
		$scope.sortOrder  	= false;  												//  default sort order
		$scope.searchTxt    = '';     												//  default search text
		$scope.countries    = countries.getData();						//  default countries list
	  $scope.contacts     = ContactService.getContacts();  	//  contacts data
		function validator(data) {                      			// Validate form input datas
			var errorMessage = "";
			if(typeof data.firstName === "undefined") {
					errorMessage = "Please tell me who are you! What's your first name?";
			}
			else if(typeof data.lastName === "undefined" && !errorMessage ) {
					errorMessage = "We are almost ready... What's your last name?";
			}
			else if(typeof data.email === "undefined" && !errorMessage ) {
					errorMessage = "Hey mate, I think you misstyped your email address!";
			}
			else if(typeof data.country === "undefined" && !errorMessage) {
					errorMessage = "Last thing! I promise! Where are your from?";
			}
			if(errorMessage) return errorMessage;
		}
		// get the right id from object
		function getObjMaxId(data, id){
			var item = $filter('filter')(data, { id: id  }, true)[0];
			return index = data.indexOf(item);
		}
		// show/hide the add contact form
    $scope.addContactFormShow = function(show) {
				$scope.somethingWrong = "";
				$scope.contact = {};  // empty form input values
				$scope.showAddForm = show; // show or hide form
    };
		// save the data to file (DB would be nicer)
		$scope.saveContacts = function(id) {
			// checking the data before save
			if(validator($scope.contact)) {
				return $scope.somethingWrong = validator($scope.contact);
			}
			//add or modify if (id) than modify
			if(typeof id !== "undefined") { // modify the contact
				var index = getObjMaxId($scope.contacts, id);
				$scope.contacts[index]=$scope.contact; // update with actual id
			} else { //add new contact
					var max = Math.max.apply(Math,$scope.contacts.map(function(i){return i.id;}));
					if($scope.contacts.length === 0) max = 0; // if contacts empty
					$scope.contact.id = max+1;
					$scope.contacts.push($scope.contact);
			}
			$scope.contact ={}; //empty form inputs
			$scope.showAddForm = false; //close form and say a thankyou message
		};
		// edit contact
		$scope.editContact = function(id) {
			if(typeof id !== "undefined") { // we need the 0 (zero) values even
				$scope.somethingWrong = "";
				$scope.showAddForm = true; // open addContact form
				var index = getObjMaxId($scope.contacts, id);
				$scope.contact = ContactService.getContacts(index); // get the personal data
				$anchorScroll(); // go to the top
			}
		};
		// delete contact
		$scope.deleteContact = function(id) {
				// #Todo: better confirm dialod
				if(typeof id !== "undefined") {
					if(confirm("would you like to delete this contact? :( ")) {
					// we need to find the correct id and contact data
					var index = getObjMaxId($scope.contacts, id);
					$scope.contacts.splice(index,1); //
					}
				}
		};
})
// set up a factory
.factory('ContactService', [function () {
  var factory = {};

  factory.getContacts = function (id) {
		if(typeof id !== "undefined") return contactList[id];
    return contactList;
  }
  // contact list, usually would be a separate database
  var contactList = [
    {id: 12, firstName: 'David', lastName: 'Kiss', email: 'david@betit.com', country: 'HU' },
		{id: 1, firstName: 'Matyas', lastName: 'Farkas', email: 'mathias@dzsml.com', country: 'GB' },
		{id: 2, firstName: 'Peter', lastName: 'Boleman', email: 'peter@hothot.com', country: 'GB' },
		{id: 3, firstName: 'Steve', lastName: 'Jobs', email: 'jteve@jobs.jobs', country: 'US' },
		{id: 4, firstName: 'Paul', lastName: 'Walker', email: 'paul@walker.com', country: 'US' },
		{id: 5, firstName: 'Vin', lastName: 'Diesel', email: 'vin@diesel.com', country: 'US' },
		{id: 6, firstName: 'Timea', lastName: 'Palacsik', email: 'andy@vajna.hu', country: 'HU' },
		{id: 7, firstName: 'Ghost', lastName: 'Busters', email: 'busters@ghost.com', country: 'ZW' },
		{id: 8, firstName: 'Lionel', lastName: 'Messi', email: 'messi@goal.com', country: 'ES' },
		{id: 9, firstName: 'Fernando', lastName: 'Alonso', email: 'alonso@2005.com', country: 'ES' },
		{id: 10, firstName: 'John', lastName: 'Wattson', email: 'john@watson.com', country: 'BR' },
		{id: 11, firstName: 'Анатолий', lastName: 'Антон', email: 'albert@anton.ru', country: 'RU' }
  ];
  return factory;
}]);
