"use strict";
/**
 * @projectName fast-csv
 * @github https://github.com/C2FO/fast-csv
 * @includeDoc [Change Log] ../History.md
 * @header [../README.md]
 */
const util_1 = require("util");
const formatter_1 = require("./formatter");
const parser_1 = require("./parser");
const csv = {
    parse: parser_1.parse,
    parseString: parser_1.parseString,
    fromString: util_1.deprecate(parser_1.parseString, 'csv.fromString has been deprecated in favor of csv.parseString'),
    parseStream: parser_1.parseStream,
    fromStream: util_1.deprecate(parser_1.parseStream, 'csv.fromStream has been deprecated in favor of csv.parseStream'),
    parseFile: parser_1.parseFile,
    fromPath: util_1.deprecate(parser_1.parseFile, 'csv.fromPath has been deprecated in favor of csv.parseFile'),
    format: formatter_1.format,
    write: formatter_1.write,
    writeToStream: formatter_1.writeToStream,
    writeToBuffer: formatter_1.writeToBuffer,
    writeToString: formatter_1.writeToString,
    writeToPath: formatter_1.writeToPath,
};
module.exports = csv;
//# sourceMappingURL=index.js.map