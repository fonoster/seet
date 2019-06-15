"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormatterOptions {
    constructor(opts = {}) {
        this.objectMode = true;
        this.delimiter = ',';
        this.rowDelimiter = '\n';
        this.quote = '"';
        this.escape = this.quote;
        this.quoteColumns = false;
        this.quoteHeaders = this.quoteColumns;
        this.headers = null;
        this.includeEndRowDelimiter = false;
        this.transform = null;
        if (opts) {
            Object.assign(this, opts);
            if (typeof opts.quoteHeaders === 'undefined') {
                this.quoteHeaders = this.quoteColumns;
            }
            if (typeof opts.escape !== 'string') {
                this.escape = this.quote;
            }
        }
        this.hasProvidedHeaders = !!this.headers;
        this.headers = Array.isArray(this.headers) ? this.headers : null;
        this.escapedQuote = `${this.escape}${this.quote}`;
    }
}
exports.FormatterOptions = FormatterOptions;
//# sourceMappingURL=FormatterOptions.js.map