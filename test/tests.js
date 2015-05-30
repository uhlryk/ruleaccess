var RuleAccess = require("../");

var chai = require("chai");
var expect = chai.expect;


describe("RuleAccess core", function(){
	it("should return true on method isAllowed when userResource and ruleFunctionList are not set", function(){

		var ruleAccess = new RuleAccess();
		expect(ruleAccess.isAllowed()).to.be.true;
	});
	describe("ruleFunctionList is not set", function(){
		it("should return true on method isAllowed when userResource set in constructor", function(){
			var userResource = {};
			var ruleAccess = new RuleAccess(userResource);
			expect(ruleAccess.isAllowed()).to.be.true;
		});
		it("should return true on method isAllowed when userResource set in setUserResource", function(){
			var userResource = {};
			var ruleAccess = new RuleAccess();
			ruleAccess.setUserResource(userResource);
			expect(ruleAccess.isAllowed()).to.be.true;
		});
		it("should return userResource on method getUserResource when userResource set in constructor", function(){
			var userResource = {};
			var ruleAccess = new RuleAccess(userResource);
			expect(userResource).to.be.equal(ruleAccess.getUserResource());
		});
		it("should return userResource on method getUserResource  when userResource set in setUserResource", function(){
			var userResource = {};
			var ruleAccess = new RuleAccess();
			ruleAccess.setUserResource(userResource);
			expect(userResource).to.be.equal(ruleAccess.getUserResource());
		});
	});
});
