var RuleAccess = require("../");
var ruleFunctionList = require('../lib/ruleFunctionList');
var chai = require("chai");
var expect = chai.expect;


describe("RuleAccess core", function(){
	it("should return false on method isAllowed when userResource and ruleFunctionList are not set", function(){
		var ruleAccess = new RuleAccess();
		expect(ruleAccess.isAllowed()).to.be.false;
	});
	it("should return object on method ruleFunctionList", function(){
		var ruleAccess = new RuleAccess();
		expect(ruleAccess.ruleFunctionList).to.be.exist;
	});
});
describe("Test Default Rule Functions", function(){
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
	describe("anyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.anyOnRuleList()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.anyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}];
			expect(ruleFunctionList.anyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.true;
		});
		it("should return true when two rules added : alwaysAllow, alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.anyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysAllow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.anyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysDisallow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.anyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
	});
	describe("everyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.everyOnRuleList()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.true;
		});
		it("should return false when two rules added : alwaysAllow, alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysAllow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysDisallow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysDisallow
			}, {
				ruleFunction : ruleFunctionList.alwaysDisallow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.false;
		});
		it("should return true when two rules added : alwaysAllow, alwaysAllow", function(){
			var rulesList = [{
				ruleFunction : ruleFunctionList.alwaysAllow
			}, {
				ruleFunction : ruleFunctionList.alwaysAllow
			}];
			expect(ruleFunctionList.everyOnRuleList({}, {}, {
				rules : rulesList
			}, "DummyResource")).to.be.true;
		});
	});
	describe("negateRule", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.negateRule()).to.be.false;
		});
		it("should return true when alwaysDisallow rule added", function(){
			var rule = {
				ruleFunction : ruleFunctionList.alwaysDisallow
			};
			expect(ruleFunctionList.negateRule({}, {}, {
				rule : rule
			}, "DummyResource")).to.be.true;
		});
		it("should return false when alwaysAllow rule added", function(){
			var rule = {
				ruleFunction : ruleFunctionList.alwaysAllow
			};
			expect(ruleFunctionList.negateRule({}, {}, {
				rule : rule
			}, "DummyResource")).to.be.false;
		});
	});
});
describe("RuleAccess core when ruleFunctionList is set", function(){
	it("should return false on method isAllowed without resource when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		expect(ruleAccess.isAllowed()).to.be.false;
	});
	it("should return true on method isAllowed when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when one rule added : alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysDisallow);
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when two rules added : alwaysAllow, alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when two rules added : alwaysAllow, alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysDisallow);
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when rule alwaysAllow is added to tested resource, other resource has rule alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow);
		ruleAccess.addRuleResource("OtherResource", ruleFunctionList.alwaysDisallow);
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
});
describe("RuleAccess when ruleFunctionList is set with custom rule", function(){
	it("should return true on method isAllowed when custom rule which return true is added", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", function(userResource, params, options, resource){
			return true;
		});
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when custom rule which return false is added", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", function(userResource, params, options, resource){
			return false;
		});
		expect(ruleAccess.isAllowed()).to.be.false;
	});
});
