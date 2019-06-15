/// <reference types="node" />
import * as fs from 'fs';
import { Row as FormatterRow } from './types';
import { FormatterOptionsArgs } from './FormatterOptions';
import CsvFormatterStream from './CsvFormatterStream';
export { default as CsvFormatterStream } from './CsvFormatterStream';
export * from './types';
export * from './FormatterOptions';
export declare const format: (options?: FormatterOptionsArgs | undefined) => CsvFormatterStream;
export declare const write: (rows: FormatterRow[], options?: FormatterOptionsArgs | undefined) => CsvFormatterStream;
export declare const writeToStream: <T extends NodeJS.WritableStream>(ws: T, rows: FormatterRow[], options?: FormatterOptionsArgs | undefined) => T;
export declare const writeToBuffer: (rows: FormatterRow[], opts?: FormatterOptionsArgs) => Promise<Buffer>;
export declare const writeToString: (rows: FormatterRow[], options?: FormatterOptionsArgs | undefined) => Promise<string>;
export declare const writeToPath: (path: string, rows: FormatterRow[], options?: FormatterOptionsArgs | undefined) => fs.WriteStream;
