"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const RowFormatter_1 = require("./formatter/RowFormatter");
class CsvFormatterStream extends stream_1.Transform {
    constructor(formatterOptions) {
        super({ objectMode: formatterOptions.objectMode });
        this.formatterOptions = formatterOptions;
        this.rowFormatter = new RowFormatter_1.default(formatterOptions);
    }
    transform(transformFunction) {
        this.rowFormatter.rowTransform = transformFunction;
        return this;
    }
    _transform(row, encoding, cb) {
        let cbCalled = false;
        try {
            this.rowFormatter.format(row, (err, rows) => {
                if (err) {
                    cbCalled = true;
                    return cb(err);
                }
                if (rows) {
                    rows.forEach((r) => {
                        this.push(Buffer.from(r, 'utf8'));
                    });
                }
                cbCalled = true;
                return cb();
            });
        }
        catch (e) {
            if (cbCalled) {
                throw e;
            }
            cb(e);
        }
    }
    _flush(cb) {
        if (this.formatterOptions.includeEndRowDelimiter) {
            this.push(this.formatterOptions.rowDelimiter);
        }
        cb();
    }
}
exports.default = CsvFormatterStream;
//# sourceMappingURL=CsvFormatterStream.js.map