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
 * This rule is list of many rules. Rules can be add to options.rules array. If any rule return true, this method  return true
 * {ruleFunction,options}
 * Example
 *ruleAccess.addRuleResource("DummyResource", rule.anyOfManyRule, {
 *	rules : [{ruleFunction : rule.alwaysAllowRule}, {ruleFunction : rule.alwaysDisallowRule, options : {}}]
 *});
 * to return true any of rules should return true. When condition meet then no more rules are checked.
 * If none rules are set it return false
 */
ruleFunctionList.anyOnRuleList = function(userResource, params, options, resource){
	if(options && options.rules && options.rules.some){
		return options.rules.some(function(rule){
			 return rule.ruleFunction(userResource, params, rule.options, resource);
		});
	}

	return false;
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
ruleFunctionList.everyOnRuleList = function(userResource, params, options, resource){
	if(options && options.rules && options.rules.every){
		return options.rules.every(function(rule){
			 return rule.ruleFunction(userResource, params, rule.options, resource);
		});
	}

	return false;
};

/**
 * This rule accept another rule object in options.rule. Rule object is {ruleFunction,options} and return it negation
 */
ruleFunctionList.negateRule = function(userResource, params, options, resource){
	if(options && options.rule){
		return !options.rule.ruleFunction(userResource, params, options.rule.options, resource);
	}
	return false;
};

module.exports = ruleFunctionList;
