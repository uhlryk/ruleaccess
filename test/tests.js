var RuleAccess = require("../");
var rule = RuleAccess.rule;
var chai = require("chai");
var expect = chai.expect;


describe("RuleAccess core", function(){
	it("should return false on method isAllowed when userResource and rule are not set", function(){
		var ruleAccess = new RuleAccess();
		expect(ruleAccess.isAllowed()).to.be.false;
	});
	it("should return object on method rule", function(){
		expect(rule).to.be.exist;
	});
});
describe("Test Default Rule Functions", function(){
	describe("alwaysAllow", function(){
		it("should return true when all args are undefined", function(){
			expect(rule.alwaysAllow()()).to.be.true;
		});
		it("should return true when args are set", function(){
			expect(rule.alwaysAllow()({}, {})).to.be.true;
		});
	});
	describe("alwaysDisallow", function(){
		it("should return false when all args are undefined", function(){
			expect(rule.alwaysDisallow()()).to.be.false;
		});
		it("should return false when args are set", function(){
			expect(rule.alwaysDisallow()({}, {})).to.be.false;
		});
	});
	describe("anyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(rule.anyOnRuleList()()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			expect(rule.anyOnRuleList([rule.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			expect(rule.anyOnRuleList([rule.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysAllow, alwaysDisallow", function(){
			expect(rule.anyOnRuleList([rule.alwaysAllow(), rule.alwaysDisallow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysAllow", function(){
			expect(rule.anyOnRuleList([rule.alwaysDisallow(), rule.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return true when two rules added : alwaysDisallow, alwaysDisallow", function(){
			expect(rule.anyOnRuleList([rule.alwaysDisallow(), rule.alwaysDisallow()])({}, {})).to.be.false;
		});
	});
	describe("everyOnRuleList", function(){
		it("should return false when all args are undefined", function(){
			expect(rule.everyOnRuleList()()).to.be.false;
		});
		it("should return false when one rule added : alwaysDisallow", function(){
			expect(rule.everyOnRuleList([rule.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when one rule added : alwaysAllow", function(){
			expect(rule.everyOnRuleList([rule.alwaysAllow()])({}, {})).to.be.true;
		});
		it("should return false when two rules added : alwaysAllow, alwaysDisallow", function(){
			expect(rule.everyOnRuleList([rule.alwaysAllow(), rule.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysAllow", function(){
			expect(rule.everyOnRuleList([rule.alwaysDisallow(), rule.alwaysAllow()])({}, {})).to.be.false;
		});
		it("should return false when two rules added : alwaysDisallow, alwaysDisallow", function(){
			expect(rule.everyOnRuleList([rule.alwaysDisallow(), rule.alwaysDisallow()])({}, {})).to.be.false;
		});
		it("should return true when two rules added : alwaysAllow, alwaysAllow", function(){
			expect(rule.everyOnRuleList([rule.alwaysAllow(), rule.alwaysAllow()])({}, {})).to.be.true;
		});
	});
	describe("negateRule", function(){
		it("should return false when all args are undefined", function(){
			expect(rule.negateRule()()).to.be.false;
		});
		it("should return true when alwaysDisallow rule added", function(){
			expect(rule.negateRule(rule.alwaysDisallow())({}, {})).to.be.true;
		});
		it("should return false when alwaysAllow rule added", function(){
			expect(rule.negateRule(rule.alwaysAllow())({}, {})).to.be.false;
		});
	});
});
describe("RuleAccess core when rule is set", function(){
	it("should return false on method isAllowed without resource when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		expect(ruleAccess.isAllowed()).to.be.false;
	});
	it("should return true on method isAllowed when one rule added : alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when one rule added : alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when two rules added : alwaysAllow, alwaysAllow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when two rules added : alwaysAllow, alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		ruleAccess.addRule("DummyResource", rule.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.false;
	});
	it("should return true on method isAllowed when rule alwaysAllow is added to tested resource, other resource has rule alwaysDisallow", function(){
		var ruleAccess = new RuleAccess();
		ruleAccess.addRule("DummyResource", rule.alwaysAllow());
		ruleAccess.addRule("OtherResource", rule.alwaysDisallow());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
});
describe("RuleAccess when rule is set with custom rule", function(){
	it("should return true on method isAllowed when custom rule which return true is added", function(){
		var ruleAccess = new RuleAccess();
		function custom(){
			return function(userResource, params, options, resource){
				return true;
			};
		}
		ruleAccess.addRule("DummyResource", custom());
		expect(ruleAccess.isAllowed("DummyResource")).to.be.true;
	});
	it("should return false on method isAllowed when custom rule which return false is added", function(){
		var ruleAccess = new RuleAccess();
		function custom(){
			return function(userResource, params, options, resource){
				return false;
			};
		}
		ruleAccess.addRule("DummyResource", custom());
		expect(ruleAccess.isAllowed()).to.be.false;
	});
});
