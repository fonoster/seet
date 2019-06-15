"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class HeaderTransformer {
    constructor(parserOptions) {
        this.processedFirstRow = false;
        this.headersLength = 0;
        this.parserOptions = parserOptions;
        this.headers = Array.isArray(parserOptions.headers) ? parserOptions.headers : null;
        this.receivedHeaders = Array.isArray(parserOptions.headers);
        this.shouldUseFirstRow = parserOptions.headers === true;
        if (this.receivedHeaders && this.headers) {
            this.headersLength = this.headers.length;
        }
    }
    transform(row, cb) {
        if (!this.shouldMapRow(row)) {
            return cb(null, { row: null, isValid: true });
        }
        return cb(null, this.processRow(row));
    }
    shouldMapRow(row) {
        const { parserOptions } = this;
        if (parserOptions.renameHeaders && !this.processedFirstRow) {
            if (!this.receivedHeaders) {
                throw new Error('Error renaming headers: new headers must be provided in an array');
            }
            this.processedFirstRow = true;
            return false;
        }
        if (!this.receivedHeaders && this.shouldUseFirstRow && Array.isArray(row)) {
            this.headers = row;
            this.receivedHeaders = true;
            this.headersLength = row.length;
            return false;
        }
        return true;
    }
    processRow(row) {
        if (!this.headers) {
            return { row, isValid: true };
        }
        const { parserOptions } = this;
        if (!parserOptions.discardUnmappedColumns && row.length > this.headersLength) {
            if (!parserOptions.strictColumnHandling) {
                throw new Error(`Unexpected Error: column header mismatch expected: ${this.headersLength} columns got: ${row.length}`);
            }
            return { row, isValid: false, reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}` };
        }
        if (parserOptions.strictColumnHandling && (row.length < this.headersLength)) {
            return {
                row,
                isValid: false,
                reason: `Column header mismatch expected: ${this.headersLength} columns got: ${row.length}`,
            };
        }
        return { row: this.mapHeaders(row), isValid: true };
    }
    mapHeaders(row) {
        const rowMap = {};
        const { headers, headersLength } = this;
        for (let i = 0; i < headersLength; i += 1) {
            const header = headers[i];
            if (!lodash_1.isUndefined(header)) {
                const val = row[i];
                // eslint-disable-next-line no-param-reassign
                if (lodash_1.isUndefined(val)) {
                    rowMap[header] = '';
                }
                else {
                    rowMap[header] = val;
                }
            }
        }
        return rowMap;
    }
}
exports.default = HeaderTransformer;
//# sourceMappingURL=HeaderTransformer.js.map