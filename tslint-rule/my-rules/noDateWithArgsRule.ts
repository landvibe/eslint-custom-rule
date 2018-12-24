import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'Do not use `new Date` with arguments';
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new MyWalker(sourceFile, this.getOptions()));
  }
}

class MyWalker extends Lint.RuleWalker {
  public visitNewExpression(node: ts.NewExpression) {
    if (
      node.expression.kind === ts.SyntaxKind.Identifier &&
      node.expression.getText() === 'Date' &&
      node.arguments &&
      node.arguments.length > 0
    ) {
      this.addFailure(
        this.createFailure(
          node.getStart(),
          node.getWidth(),
          Rule.FAILURE_STRING,
        ),
      );
    }
    super.visitNewExpression(node);
  }
}
