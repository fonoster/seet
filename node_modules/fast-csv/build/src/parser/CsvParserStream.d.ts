/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { ParserOptions } from './ParserOptions';
import { RowTransformFunction, RowValidate } from './types';
export default class CsvParserStream extends Transform {
    private readonly parserOptions;
    private readonly decoder;
    private readonly parser;
    private readonly headerTransformer;
    private readonly rowTransformerValidator;
    private lines;
    private rowCount;
    private endEmitted;
    constructor(parserOptions: ParserOptions);
    transform(transformFunction: RowTransformFunction): CsvParserStream;
    validate(validateFunction: RowValidate): CsvParserStream;
    emit(event: string | symbol, ...rest: any[]): boolean;
    _transform(data: Buffer, encoding: string, done: TransformCallback): void;
    _flush(done: TransformCallback): void;
    private parse;
    private processRows;
    private transformRow;
}
