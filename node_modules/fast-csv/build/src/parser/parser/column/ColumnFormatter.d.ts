import { ParserOptions } from '../../ParserOptions';
export default class ColumnFormatter {
    readonly format: (col: string) => string;
    constructor(parserOptions: ParserOptions);
}
