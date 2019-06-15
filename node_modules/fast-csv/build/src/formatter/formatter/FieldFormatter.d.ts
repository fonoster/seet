import { FormatterOptions } from '../FormatterOptions';
export default class FieldFormatter {
    private readonly formatterOptions;
    private _headers;
    private readonly REPLACE_REGEXP;
    private readonly ESCAPE_REGEXP;
    constructor(formatterOptions: FormatterOptions);
    headers: string[];
    private shouldQuote;
    format(field: string, fieldIndex: number, isHeader: boolean): string;
    private quoteField;
}
