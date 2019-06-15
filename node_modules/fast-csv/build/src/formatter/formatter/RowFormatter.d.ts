import { FormatterOptions } from '../FormatterOptions';
import { Row, RowTransformFunction } from '../types';
declare type RowFormatterCallback = (error: Error | null, data?: string[]) => void;
export default class RowFormatter {
    private static isHashArray;
    private static gatherHeaders;
    private static createTransform;
    private readonly formatterOptions;
    private readonly fieldFormatter;
    private _rowTransform?;
    private headers;
    private parsedHeaders;
    private hasWrittenHeaders;
    private rowCount;
    constructor(formatterOptions: FormatterOptions);
    rowTransform: RowTransformFunction;
    format(row: Row, cb: RowFormatterCallback): void;
    private checkHeaders;
    private gatherColumns;
    private callTransformer;
    private formatColumns;
}
export {};
