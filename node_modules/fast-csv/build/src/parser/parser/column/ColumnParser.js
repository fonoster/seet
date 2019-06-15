"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NonQuotedColumnParser_1 = require("./NonQuotedColumnParser");
const QuotedColumnParser_1 = require("./QuotedColumnParser");
const Scanner_1 = require("../Scanner");
class ColumnParser {
    constructor(parserOptions) {
        this.parserOptions = parserOptions;
        this.quotedColumnParser = new QuotedColumnParser_1.default(parserOptions);
        this.nonQuotedColumnParser = new NonQuotedColumnParser_1.default(parserOptions);
    }
    parse(scanner) {
        const { nextNonSpaceToken } = scanner;
        if (nextNonSpaceToken !== null && Scanner_1.Token.isTokenQuote(nextNonSpaceToken, this.parserOptions)) {
            scanner.advanceToToken(nextNonSpaceToken);
            return this.quotedColumnParser.parse(scanner);
        }
        return this.nonQuotedColumnParser.parse(scanner);
    }
}
exports.default = ColumnParser;
//# sourceMappingURL=ColumnParser.js.map