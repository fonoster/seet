/// <reference types="node" />
import { Transform, TransformCallback } from 'stream';
import { FormatterOptions } from './FormatterOptions';
import { Row, RowTransformFunction } from './types';
export default class CsvFormatterStream extends Transform {
    private formatterOptions;
    private rowFormatter;
    constructor(formatterOptions: FormatterOptions);
    transform(transformFunction: RowTransformFunction): CsvFormatterStream;
    _transform(row: Row, encoding: string, cb: TransformCallback): void;
    _flush(cb: TransformCallback): void;
}
