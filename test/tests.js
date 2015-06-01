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
			expect(ruleFunctionList.alwaysAllow()()).to.be.true;
		});
		it("should return true when args are set", function(){
			expect(ruleFunctionList.alwaysAllow()({}, {})).to.be.true;
		});
	});
	describe("alwaysDisallow", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.alwaysDisallow()()).to.be.false;
		});
		it("should return false when args are set", function(){
			expect(ruleFunctionList.alwaysDisallow()({}, {})).to.be.false;
		});
	});
	describe("anyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.anyOnRuleList()()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			expect(ruleFunctionList.anyOnRuleList([ruleFunctionList.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			expect(ruleFunctionList.anyOnRuleList([ruleFunctionList.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysAllow, alwaysDisallow", function(){
			expect(ruleFunctionList.anyOnRuleList([ruleFunctionList.alwaysAllow(), ruleFunctionList.alwaysDisallow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysAllow", function(){
			expect(ruleFunctionList.anyOnRuleList([ruleFunctionList.alwaysDisallow(), ruleFunctionList.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysDisallow", function(){
			expect(ruleFunctionList.anyOnRuleList([ruleFunctionList.alwaysDisallow(), ruleFunctionList.alwaysDisallow()])({}, {})).to.be.false;
		});
	});
	describe("everyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.everyOnRuleList()()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return false when two rules added : alwaysAllow, alwaysDisallow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysAllow(), ruleFunctionList.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysAllow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysDisallow(), ruleFunctionList.alwaysAllow()])({}, {})).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysDisallow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysDisallow(), ruleFunctionList.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when two rules added : alwaysAllow, alwaysAllow", function(){
			expect(ruleFunctionList.everyOnRuleList([ruleFunctionList.alwaysAllow(), ruleFunctionList.alwaysAllow()])({}, {})).to.be.true;
		});
	});
	describe("negateRule", function(){
		it("should return false when all args are undefined", function(){
			expect(ruleFunctionList.negateRule()()).to.be.false;
		});
		it("should return true when alwaysDisallow rule added", function(){
			expect(ruleFunctionList.negateRule(ruleFunctionList.alwaysDisallow())({}, {})).to.be.true;
		});
		it("should return false when alwaysAllow rule added", function(){
			expect(ruleFunctionList.negateRule(ruleFunctionList.alwaysAllow())({}, {})).to.be.false;
		});
	});
});
describe("RuleAccess core when ruleFunctionList is set", function(){
	it("should return false on method isAllowed without resource when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		expect(ruleAccess.isAllowed()).to.be.false;
	});
	it("should return true on method isAllowed when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when one rule added : alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when two rules added : alwaysAllow, alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when two rules added : alwaysAllow, alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when rule alwaysAllow is added to tested resource, other resource has rule alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRuleResource("DummyResource", ruleFunctionList.alwaysAllow());
		ruleAccess.addRuleResource("OtherResource", ruleFunctionList.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
});
describe("RuleAccess when ruleFunctionList is set with custom rule", function(){
	it("should return true on method isAllowed when custom rule which return true is added", function(){
		var ruleAccess = new RuleAccess();
		function custom(){
			return function(userResource, params, options, resource){
				return true;
			};
		}
		ruleAccess.addRuleResource("DummyResource", custom());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when custom rule which return false is added", function(){
		var ruleAccess = new RuleAccess();
		function custom(){
			return function(userResource, params, options, resource){
				return false;
			};
		}
		ruleAccess.addRuleResource("DummyResource", custom());
		expect(ruleAccess.isAllowed()).to.be.false;
	});
});
