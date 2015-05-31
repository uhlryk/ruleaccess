/*jslint node: true */
'use strict';

/**
 * Lista standardowych reguł, Można oczywiścia używać tylko własnych
 */
var ruleFunctionList = {};

/**
 * dummy ruleFunction which always return true.
 */
ruleFunctionList.alwaysAllow = function(userResource, params, options, resource){
	return true;
};
/**
 * dummy ruleFunction which always return false.
 */
ruleFunctionList.alwaysDisallow = function(userResource, params, options, resource){
	return false;
};
/**
 * This rule is list for many rules. Rules can be add to options.rules array. If any rule return true method return true
 * {
 * 	ruleFunction
 * 	options
 * }
 * Example
 *ruleAccess.addRuleResource("DummyResource", rule.anyOfManyRule, {
 *	rules : [{ruleFunction : rule.alwaysAllowRule}, {ruleFunction : rule.alwaysDisallowRule, options : {}}]
 *});
 * to return true any of rules should return true. When condition meet then no more rules are checked.
 * If none rules are set it return false
 */
ruleFunctionList.anyOfRuleList = function(userResource, params, options, resource){
	if(options && options.rules && options.rules.some){
		return options.rules.some(function(rule){
			 return rule.ruleFunction(userResource, params, rule.options, resource);
		});
	}

	return false;
};
/**
 * This rule is list for many rules. Rules can be add to options.rules array. If any rule return false method return false.
 * All rules must return true
 * {
 * 	ruleFunction
 * 	options
 * }
 * Example
 *ruleAccess.addRuleResource("DummyResource", rule.everyOfRuleaList, {
 *	rules : [{ruleFunction : rule.alwaysAllowRule}, {ruleFunction : rule.alwaysDisallowRule, options : {}}]
 *});
 * to return true any of rules should return true. When condition meet then no more rules are checked.
 * If none rules are set it return false
 */
ruleFunctionList.everyOfRuleList = function(userResource, params, options, resource){
	if(options && options.rules && options.rules.every){
		return options.rules.every(function(rule){
			 return rule.ruleFunction(userResource, params, rule.options, resource);
		});
	}

	return false;
};

module.exports = ruleFunctionList;
