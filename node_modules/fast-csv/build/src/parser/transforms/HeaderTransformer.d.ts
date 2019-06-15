import { ParserOptions } from '../ParserOptions';
import { RowArray, RowValidatorCallback } from '../types';
export default class HeaderTransformer {
    private readonly parserOptions;
    private headers;
    private receivedHeaders;
    private readonly shouldUseFirstRow;
    private processedFirstRow;
    private headersLength;
    constructor(parserOptions: ParserOptions);
    transform(row: RowArray, cb: RowValidatorCallback): void;
    private shouldMapRow;
    private processRow;
    private mapHeaders;
}
