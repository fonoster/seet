"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const FieldFormatter_1 = require("./FieldFormatter");
class RowFormatter {
    constructor(formatterOptions) {
        this.rowCount = 0;
        this.formatterOptions = formatterOptions;
        this.fieldFormatter = new FieldFormatter_1.default(formatterOptions);
        this._rowTransform = null;
        this.headers = formatterOptions.headers;
        this.parsedHeaders = formatterOptions.hasProvidedHeaders && Array.isArray(formatterOptions.headers);
        this.hasWrittenHeaders = !formatterOptions.hasProvidedHeaders;
        if (this.parsedHeaders && this.headers !== null) {
            this.fieldFormatter.headers = this.headers;
        }
        if (formatterOptions.transform !== null) {
            this.rowTransform = formatterOptions.transform;
        }
    }
    static isHashArray(row) {
        if (Array.isArray(row)) {
            return Array.isArray(row[0]) && row[0].length === 2;
        }
        return false;
    }
    // get headers from a row item
    static gatherHeaders(row) {
        if (RowFormatter.isHashArray(row)) {
            // lets assume a multi-dimesional array with item 0 being the header
            return row.map((it) => it[0]);
        }
        if (Array.isArray(row)) {
            return row;
        }
        return Object.keys(row);
    }
    static createTransform(transformFunction) {
        const isSync = transformFunction.length === 1;
        if (isSync) {
            return (row, cb) => {
                let transformedRow = null;
                try {
                    transformedRow = transformFunction(row);
                }
                catch (e) {
                    return cb(e);
                }
                return cb(null, transformedRow);
            };
        }
        return (row, cb) => {
            transformFunction(row, cb);
        };
    }
    set rowTransform(transformFunction) {
        if (!lodash_1.isFunction(transformFunction)) {
            throw new TypeError('The transform should be a function');
        }
        this._rowTransform = RowFormatter.createTransform(transformFunction);
    }
    format(row, cb) {
        this.callTransformer(row, (err, transformedRow) => {
            if (err) {
                return cb(err);
            }
            if (!row) {
                return cb(null);
            }
            const rows = [];
            if (transformedRow) {
                const { shouldFormatColumns, headers } = this.checkHeaders(transformedRow);
                if (headers) {
                    rows.push(this.formatColumns(headers, true));
                }
                if (shouldFormatColumns) {
                    const columns = this.gatherColumns(transformedRow);
                    rows.push(this.formatColumns(columns, false));
                }
            }
            return cb(null, rows);
        });
    }
    // check if we need to write header return true if we should also write a row
    // could be false if headers is true and the header row(first item) is passed in
    checkHeaders(row) {
        if (!this.parsedHeaders) {
            this.parsedHeaders = true;
            this.headers = RowFormatter.gatherHeaders(row);
            this.fieldFormatter.headers = this.headers;
        }
        if (this.hasWrittenHeaders) {
            return { shouldFormatColumns: true, headers: null };
        }
        this.hasWrittenHeaders = true;
        const shouldFormatColumns = RowFormatter.isHashArray(row) || !Array.isArray(row);
        return { shouldFormatColumns, headers: this.headers };
    }
    gatherColumns(row) {
        if (!Array.isArray(row)) {
            if (this.headers === null) {
                throw new Error('Headers is currently null');
            }
            return this.headers.map((header) => row[header]);
        }
        if (RowFormatter.isHashArray(row)) {
            return row.map((col) => col[1]);
        }
        return row;
    }
    callTransformer(row, cb) {
        if (!this._rowTransform) {
            return cb(null, row);
        }
        return this._rowTransform(row, cb);
    }
    formatColumns(columns, isHeadersRow) {
        const formattedCols = columns
            .map((field, i) => this.fieldFormatter.format(field, i, isHeadersRow))
            .join(this.formatterOptions.delimiter);
        const { rowCount } = this;
        this.rowCount += 1;
        if (rowCount) {
            return [this.formatterOptions.rowDelimiter, formattedCols].join('');
        }
        return formattedCols;
    }
}
exports.default = RowFormatter;
//# sourceMappingURL=RowFormatter.js.map