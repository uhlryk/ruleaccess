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
 * It is hub of many rules. Rules can be add to options.rules array.
 * This array is object
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
	if(options && options.rules && options.rules.forEach){
		return options.rules.some(function(rule){
			if(rule.ruleFunction(userResource, params, rule.options, resource) === true){
				return true;
			}
			return false;
		});
	}

	return false;
};

module.exports = ruleFunctionList;
