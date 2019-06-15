"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnFormatter_1 = require("./ColumnFormatter");
const Scanner_1 = require("../Scanner");
const { isTokenDelimiter, isTokenRowDelimiter } = Scanner_1.Token;
class NonQuotedColumnParser {
    constructor(parserOptions) {
        this.parserOptions = parserOptions;
        this.columnFormatter = new ColumnFormatter_1.default(parserOptions);
    }
    parse(scanner) {
        if (!scanner.hasMoreCharacters) {
            return null;
        }
        const { parserOptions } = this;
        const characters = [];
        let nextToken = scanner.nextCharacterToken;
        for (; nextToken; nextToken = scanner.nextCharacterToken) {
            if (isTokenDelimiter(nextToken, parserOptions) || isTokenRowDelimiter(nextToken)) {
                break;
            }
            characters.push(nextToken.token);
            scanner.advancePastToken(nextToken);
        }
        return this.columnFormatter.format(characters.join(''));
    }
}
exports.default = NonQuotedColumnParser;
//# sourceMappingURL=NonQuotedColumnParser.js.map