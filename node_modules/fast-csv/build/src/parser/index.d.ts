/// <reference types="node" />
import { ParserOptionsArgs } from './ParserOptions';
import CsvParserStream from './CsvParserStream';
export { default as CsvParserStream } from './CsvParserStream';
export * from './types';
export * from './ParserOptions';
export declare const parse: (args?: ParserOptionsArgs | undefined) => CsvParserStream;
export declare const parseStream: (stream: NodeJS.ReadableStream, options?: ParserOptionsArgs | undefined) => CsvParserStream;
export declare const parseFile: (location: string, options?: {}) => CsvParserStream;
export declare const parseString: (string: string, options?: ParserOptionsArgs | undefined) => CsvParserStream;
