"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const Lint = __importStar(require("tslint"));
class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new MyWalker(sourceFile, this.getOptions()));
    }
}
Rule.FAILURE_STRING = 'Do not use `new Date` with arguments';
exports.Rule = Rule;
class MyWalker extends Lint.RuleWalker {
    visitNewExpression(node) {
        if (node.expression.kind === ts.SyntaxKind.Identifier &&
            node.expression.getText() === 'Date' &&
            node.arguments &&
            node.arguments.length > 0) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        super.visitNewExpression(node);
    }
}
