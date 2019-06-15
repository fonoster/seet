"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const stream_1 = require("stream");
const fs = require("fs");
const FormatterOptions_1 = require("./FormatterOptions");
const CsvFormatterStream_1 = require("./CsvFormatterStream");
var CsvFormatterStream_2 = require("./CsvFormatterStream");
exports.CsvFormatterStream = CsvFormatterStream_2.default;
__export(require("./FormatterOptions"));
exports.format = (options) => new CsvFormatterStream_1.default(new FormatterOptions_1.FormatterOptions(options));
exports.write = (rows, options) => {
    const csvStream = exports.format(options);
    const promiseWrite = util_1.promisify((row, cb) => {
        csvStream.write(row, undefined, cb);
    });
    rows.reduce((prev, row) => prev.then(() => promiseWrite(row)), Promise.resolve())
        .then(() => csvStream.end())
        .catch((err) => {
        csvStream.emit('error', err);
    });
    return csvStream;
};
exports.writeToStream = (ws, rows, options) => exports.write(rows, options)
    .pipe(ws);
exports.writeToBuffer = (rows, opts = {}) => {
    const buffers = [];
    const ws = new stream_1.Writable({
        write(data, enc, writeCb) {
            buffers.push(data);
            writeCb();
        },
    });
    return new Promise((res, rej) => {
        ws
            .on('error', rej)
            .on('finish', () => res(Buffer.concat(buffers)));
        exports.write(rows, opts).pipe(ws);
    });
};
exports.writeToString = (rows, options) => exports.writeToBuffer(rows, options)
    .then((buffer) => buffer.toString());
exports.writeToPath = (path, rows, options) => {
    const stream = fs.createWriteStream(path, { encoding: 'utf8' });
    return exports.write(rows, options).pipe(stream);
};
//# sourceMappingURL=index.js.map