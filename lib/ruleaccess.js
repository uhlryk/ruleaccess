/*jslint node: true */
'use strict';

/**
 * Moduł sprawdzający czy dany użytkownik ma uprawnienia do określonego zasobu (AppResource).
 * Uprawnienie jest uzależnione od listy reguł (RuleFunctionList) przypisanych do każdego AppResource
 * Każda reguła ma określoną logikę, która sprawdza parametry przekazane do danego AppResource
 * i parametry jakie posiada obiekt UserResource.
 * Przykładowo dany User ma uprawnienie do kasowania Artykułu który ma id 3.
 * Ale nie ma dostępu do kasowania innych artykułów. Nie wystarczający jest więc standardowy
 * ACL który dla danego użytkownika sprawdzi czy ma on uprawnienie do kasowania artykułów.
 * Do UserResource dodajemy parametr zawierający listę artykułów dla których User on maksymalne uprawnienia
 * Tworzymy Regułę która sprawdza parametr z listą artykułów danego usera i w każdym wywołaniu metody dodatkowo
 * dostaje parametry związane z tym wywołaniem, czyli id artykułu.
 * Reguła więc zwraca true w zależności jakiego artykułu dotyczy sytuacja i jakiego użytkownika.
 * Definiując zasób oprócz ruleFunction również możemy dodać parametry które modyfikują tą regułę.
 * Przez co dana reguła może mieć wiele zastosowań
 *
 * @param {[type]} userResource Object
 */
var RuleAccess = function (userResource){
	/**
	 * Struktura zawierająca jako klucz resouce a jako wartość listę reguł określających uprawnienia do zasobu
	 * każda reguła składa się z obiektu mającego ruleFunction i ruleParams
	 */
	this.ruleResourceList = {};

};

/**
 * /**
 * Przyjmuje powiązanie zasobu z regułą, dodatkowo możemy ustawić opcje dla reguły
 * @param {string} resource     [description]
 * @param {Function} ruleFunction funkcja która będzie sprawdzać uprawnienia function(UserResource, Options, RuleParams, Resource):Boolean
 * @param {Object} options zawiera opcje dla danej reguły powiązanej z danym zasobem
 */
RuleAccess.prototype.addRuleResource = function(resource, ruleFunction, options){
	this.ruleResourceList[resource] = this.ruleResourceList[resource] || [];
	this.ruleResourceList[resource].push({
		ruleFunction: ruleFunction,
		options : options
	});
};

/**
 * Sprawdza dla danego zasobu (resource) i danych parametrów (params) wszystkie reguły dotyczące tego zasobu
 * @param  {string}  resource dany zasób
 * @param  {Object}  params   parametry danego wywołania
 * @return {Boolean}          true jeśli dostęp, false brak dostępu, przy braku reguł false
 */
RuleAccess.prototype.isAllowed = function(resource, userData, params){
	if(this.ruleResourceList[resource] && this.ruleResourceList[resource].every){
		return this.ruleResourceList[resource].every(function(rule){
			if(rule.ruleFunction(userData, params, rule.options, resource) === false){
				return false;
			}
			return true;
		});
	}
	return false;
};

RuleAccess.prototype.middleware = function() {
	var ruleAccess = this;
	var userData = userData || {};

	return function(req, res, next) {
		req.isAllowed = function(resource, params){
			return ruleAccess.isAllowed(resource, userData, params);
		};
		req.setUserData = function(data){
			userData = data;
		};
		return next();
	};
};

RuleAccess.prototype.ruleFunctionList = require('./ruleFunctionList');

module.exports = RuleAccess;