var RuleAccess = require("../");
var ruleFunctionList = require('../lib/ruleFunctionList');
var chai = require("chai");
var expect = chai.expect;


describe("RuleAccess core", function(){
	it("should return true on method isAllowed when userResource and ruleFunctionList are not set", function(){

		var ruleAccess = new RuleAccess();
		expect(ruleAccess.isAllowed()).to.be.true;
	});
	it("should return object on method ruleFunctionList", function(){
		var ruleAccess = new RuleAccess();
		expect(ruleAccess.ruleFunctionList).to.be.exist;
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

	describe("Default Rule Function list", function(){
		describe("alwaysAllow", function(){
			it("should return true when all args are undefined", function(){
				expect(ruleFunctionList.alwaysAllow()).to.be.true;
			});
			it("should return true when args are set", function(){
				expect(ruleFunctionList.alwaysAllow({}, {}, {}, "DummyResource")).to.be.true;
			});
		});
		describe("alwaysDisallow", function(){
			it("should return false when all args are undefined", function(){
				expect(ruleFunctionList.alwaysDisallow()).to.be.false;
			});
			it("should return false when args are set", function(){
				expect(ruleFunctionList.alwaysDisallow({}, {}, {}, "DummyResource")).to.be.false;
			});
		});
		describe("anyOfRuleList", function(){
			it("should return false when all args are undefined", function(){
				expect(ruleFunctionList.anyOfRuleList()).to.be.false;
			});
			it("should return false when one rule added : alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.anyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
			it("should return true when one rule added : alwaysAllow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}];
				expect(ruleFunctionList.anyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.true;
			});
			it("should return true when two rules added : alwaysAllow, alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.anyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.true;
			});
			it("should return true when two rules added : alwaysDisallow, alwaysAllow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.anyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.true;
			});
			it("should return true when two rules added : alwaysDisallow, alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysDisallow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.anyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
		});
		describe("everyOfRuleList", function(){
			it("should return false when all args are undefined", function(){
				expect(ruleFunctionList.everyOfRuleList()).to.be.false;
			});
			it("should return false when one rule added : alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
			it("should return true when one rule added : alwaysAllow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.true;
			});
			it("should return false when two rules added : alwaysAllow, alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
			it("should return false when two rules added : alwaysDisallow, alwaysAllow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
			it("should return false when two rules added : alwaysDisallow, alwaysDisallow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysDisallow
				}, {
					ruleFunction : ruleFunctionList.alwaysDisallow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.false;
			});
			it("should return true when two rules added : alwaysAllow, alwaysAllow", function(){
				var rulesList = [{
					ruleFunction : ruleFunctionList.alwaysAllow
				}, {
					ruleFunction : ruleFunctionList.alwaysAllow
				}];
				expect(ruleFunctionList.everyOfRuleList({}, {}, {
					rules : rulesList
				}, "DummyResource")).to.be.true;
			});
		});
	});
});
