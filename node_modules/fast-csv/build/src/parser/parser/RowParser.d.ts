import { Scanner } from './Scanner';
import { ParserOptions } from '../ParserOptions';
import { RowArray } from '../types';
export default class RowParser {
    private readonly parserOptions;
    private readonly columnParser;
    constructor(parserOptions: ParserOptions);
    parse(scanner: Scanner): RowArray | null;
    private getStartToken;
    private shouldSkipColumnParse;
}
