/*jslint node: true */
'use strict';

/**
 * Lista standardowych reguł, Można oczywiścia używać tylko własnych
 */
var ruleFunctionList = {};

/**
 * dummy ruleFunction which always return true.
 */
ruleFunctionList.alwaysAllow = function(){
	return function(userResource, params){
		return true;
	};
};
/**
 * dummy ruleFunction which always return false.
 */
ruleFunctionList.alwaysDisallow = function(){
	return function(userResource, params){
		return false;
	};
};
/**
 * This rule is list of many rules. Rules can be add to options.rules array. If any rule return true, this method  return true
 * {ruleFunction,options}
 * Example
 *ruleAccess.addRuleResource("DummyResource", rule.anyOfManyRule, {
 *	rules : [{ruleFunction : rule.alwaysAllowRule}, {ruleFunction : rule.alwaysDisallowRule, options : {}}]
 *});
 * to return true any of rules should return true. When condition meet then no more rules are checked.
 * If none rules are set it return false
 */
ruleFunctionList.anyOnRuleList = function(ruleList){
	return function(userResource, params){
		if(ruleList && ruleList.some){
			return ruleList.some(function(ruleFunction){
				 return ruleFunction(userResource, params);
			});
		}
		return false;
	};
};
/**
 * This rule is list of many rules. Rules can be add to options.rules array. If any rule return false, this method return false.
 * {ruleFunction,options}
 * Example
 *ruleAccess.addRuleResource("DummyResource", rule.everyOfRuleaList, {
 *	rules : [{ruleFunction : rule.alwaysAllowRule}, {ruleFunction : rule.alwaysDisallowRule, options : {}}]
 *});
 * to return true any of rules should return true. When condition meet then no more rules are checked.
 * If none rules are set it return false
 */
ruleFunctionList.everyOnRuleList = function(ruleList){
	return function(userResource, params){
		if(ruleList && ruleList.every){
			return ruleList.every(function(ruleFunction){
				 return ruleFunction(userResource, params);
			});
		}
		return false;
	};
};
/**
 * This rule accept another rule object in options.rule. Rule object is {ruleFunction,options} and return it negation
 */
ruleFunctionList.negateRule = function(ruleFunction){
	return function(userResource, params){
		if(ruleFunction) {
			return !ruleFunction(userResource, params);
		}
		return false;
	};
};

module.exports = ruleFunctionList;