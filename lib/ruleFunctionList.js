/*jslint node: true */
'use strict';

/**
 * Lista standardowych reguł, Można oczywiścia używać tylko własnych
 */
var ruleFunctionList = {};

/**
 * dummy ruleFunction which always return true.
 */
ruleFunctionList.alwaysAllowRule = function(userResource, params, ruleOptions, resource){
	return true;
};
/**
 * dummy ruleFunction which always return false.
 */
ruleFunctionList.alwaysDisallowRule = function(userResource, params, ruleOptions, resource){
	return false;
};
/**
 * Check if user which has list of roles can access resource
 * userResource.roles list of roles ['writer', 'editor', 'publisher']
 * ruleParams.resources structure where resource string is key, and list of acceptable roles are value
 * params.roles list of acceptable roles
 * ruleParams.resources and params.roles may be used alternatively or together
 */
ruleFunctionList.simpleRoleRule = function(userResource, params, ruleOptions, resource){
	return false;
};


module.exports = ruleFunctionList;
