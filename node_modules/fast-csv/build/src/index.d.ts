/**
 * @projectName fast-csv
 * @github https://github.com/C2FO/fast-csv
 * @includeDoc [Change Log] ../History.md
 * @header [../README.md]
 */
/// <reference types="node" />
declare const csv: {
    parse: (args?: import("./parser").ParserOptionsArgs | undefined) => import("./parser").CsvParserStream;
    parseString: (string: string, options?: import("./parser").ParserOptionsArgs | undefined) => import("./parser").CsvParserStream;
    fromString: (string: string, options?: import("./parser").ParserOptionsArgs | undefined) => import("./parser").CsvParserStream;
    parseStream: (stream: NodeJS.ReadableStream, options?: import("./parser").ParserOptionsArgs | undefined) => import("./parser").CsvParserStream;
    fromStream: (stream: NodeJS.ReadableStream, options?: import("./parser").ParserOptionsArgs | undefined) => import("./parser").CsvParserStream;
    parseFile: (location: string, options?: {}) => import("./parser").CsvParserStream;
    fromPath: (location: string, options?: {}) => import("./parser").CsvParserStream;
    format: (options?: import("./formatter").FormatterOptionsArgs | undefined) => import("./formatter").CsvFormatterStream;
    write: (rows: import("./formatter").Row[], options?: import("./formatter").FormatterOptionsArgs | undefined) => import("./formatter").CsvFormatterStream;
    writeToStream: <T extends NodeJS.WritableStream>(ws: T, rows: import("./formatter").Row[], options?: import("./formatter").FormatterOptionsArgs | undefined) => T;
    writeToBuffer: (rows: import("./formatter").Row[], opts?: import("./formatter").FormatterOptionsArgs) => Promise<Buffer>;
    writeToString: (rows: import("./formatter").Row[], options?: import("./formatter").FormatterOptionsArgs | undefined) => Promise<string>;
    writeToPath: (path: string, rows: import("./formatter").Row[], options?: import("./formatter").FormatterOptionsArgs | undefined) => import("fs").WriteStream;
};
export = csv;
