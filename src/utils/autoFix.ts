import { Range, TextDocument, TextEdit, WorkspaceEdit } from "vscode";
import { transformTextCase } from "./textUtil";

export interface AutoFix {
    label: string;
    edits: TextEdit[];
}

/**
 * Construct a label for the config exclude rule autofix
 * @param ruleCode The rule code being excluded
 * @returns
 */
export function constructConfigExcludeRuleLabel(ruleCode: string): string {
    return `Exclude rule "${ruleCode}" in .cflintrc`;
}

// Inline Rule Fix
/**
 * Construct a label for the inline ignore rule autofix
 * @param ruleCode The rule code being ignored
 * @returns
 */
export function constructInlineIgnoreRuleLabel(ruleCode: string): string {
    return `Ignore rule "${ruleCode}" for this line`;
}


/**
 * Creates autofix for adding an inline ignore rule
 * @param document The document in which the fix will be applied
 * @param range The range for which the fix will be applied
 * @param ruleCode The rule code to be ignored
 * @returns
 */
/*function createInlineIgnoreRuleFix(document: TextDocument, range: Range, ruleCode: string): AutoFix {
    // TODO: Check for an existing ignored rule for this line

    const isScript: boolean = cfmlApi.getContextUtils().isPositionScript(document, range.start);
    const newPosition: Position = new Position(range.start.line, 0);

    const inlineIgnoreRuleRange: Range = new Range(newPosition, newPosition);
    let inlineIgnoreRuleText: string = createInlineIgnoreRuleText([ruleCode], isScript);

    // prefix disable comment with same indent as line with the diagnostic
    const ruleLine: TextLine = document.lineAt(inlineIgnoreRuleRange.start.line);
    const prefixIndex: number = ruleLine.firstNonWhitespaceCharacterIndex;
    const prefix: string = ruleLine.text.substring(0, prefixIndex);
    inlineIgnoreRuleText = prefix + inlineIgnoreRuleText;

    const ignoreRuleEdit: TextEdit = new TextEdit(inlineIgnoreRuleRange, inlineIgnoreRuleText);

    const ignoreRuleAutofix: AutoFix = {
        label: constructInlineIgnoreRuleLabel(ruleCode),
        edits: [ignoreRuleEdit]
    };

    return ignoreRuleAutofix;
}*/

/**
 * Creates workspace edit for adding an inline ignore rule
 * @param document The document in which the fix will be applied
 * @param range The range for which the fix will be applied
 * @param ruleCode The rule code to be ignored
 * @returns
 */
/*export function createInlineIgnoreRuleEdit(document: TextDocument, range: Range, ruleCode: string): WorkspaceEdit {
    const autofix: AutoFix = createInlineIgnoreRuleFix(document, range, ruleCode);

    const workspaceEdit: WorkspaceEdit = new WorkspaceEdit();
    workspaceEdit.set(document.uri, autofix.edits);

    return workspaceEdit;
}*/

/**
 * Creates workspace edit for transforming the case of a word
 * @param document The document in which the word appears
 * @param range The range of the word
 * @param textCase The text case to use
 * @returns
 */
export function transformCaseRuleEdit(document: TextDocument, range: Range, textCase: string): WorkspaceEdit {
    const currentWord: string = document.getText(range);
    const transformedWord: string = transformTextCase(currentWord, textCase);

    const workspaceEdit: WorkspaceEdit = new WorkspaceEdit();
    workspaceEdit.replace(document.uri, range, transformedWord);

    return workspaceEdit;
}

/**
 * Creates workspace edit for var scoping a variable
 * @param document The document in which the variable is declared
 * @param range The range of the variable identifier
 * @returns
 */
export function varScopeEdit(document: TextDocument, range: Range): WorkspaceEdit {
    const currentWord: string = document.getText(range);
    const varScopedVariable = `var ${currentWord}`;

    const workspaceEdit: WorkspaceEdit = new WorkspaceEdit();
    workspaceEdit.replace(document.uri, range, varScopedVariable);

    return workspaceEdit;
}

/**
 * Creates workspace edit for local scoping a variable
 * @param document The document in which the variable is declared
 * @param range The range of the variable identifier
 * @returns
 */
export function localScopeEdit(document: TextDocument, range: Range): WorkspaceEdit {
    const currentWord: string = document.getText(range);
    const localScopedVariable = `local.${currentWord}`;

    const workspaceEdit: WorkspaceEdit = new WorkspaceEdit();
    workspaceEdit.replace(document.uri, range, localScopedVariable);

    return workspaceEdit;
}

// TODO: OUTPUT_ATTR
