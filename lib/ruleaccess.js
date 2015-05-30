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
	this.userResource = userResource;
};

RuleAccess.prototype.setUserResource = function(userResource){
	this.userResource = userResource;
};

RuleAccess.prototype.getUserResource = function(){
	return this.userResource;
};
/**
 * /**
 * RuleFunction jest to funkcja przyjmująca dwa parametry: UserResource i Params
 * Params są to parametry określone w momencie wywoływania metody sprawdzającej (np id Artykułu)
 * @param {string} resource     [description]
 * @param {Function} ruleFunction funkcja która będzie sprawdzać uprawnienia function(UserResource, Params, RuleParams, Resource):Boolean
 */
RuleAccess.prototype.addRuleResource = function(resource, ruleFunction, ruleParams){
	this.ruleResourceList[resource] = this.ruleResourceList[resource] || [];
	this.ruleResourceList[resource].push({
		ruleFunction: ruleFunction,
		ruleParams : ruleParams
	});
};

/**
 * Sprawdza dla danego zasobu (resource) i danych parametrów (params) wszystkie reguły dotyczące tego zasobu
 * @param  {string}  resource [description]
 * @param  {Object}  params   [description]
 * @return {Boolean}          [description]
 */
RuleAccess.prototype.isAllowed = function(resource, params){
	if(this.ruleResourceList[resource]){
		this.ruleResourceList[resource].forEach(function(rule){
			if(rule.ruleFunction(this.userResource, params, rule.ruleParams, resource) === false){
				return false;
			}
		});
	}
	return true;
};

RuleAccess.prototype.ruleFunctionList = require('./ruleFunctionList');

module.exports = RuleAccess;