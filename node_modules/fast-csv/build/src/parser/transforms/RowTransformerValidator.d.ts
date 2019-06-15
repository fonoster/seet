import { Row, RowTransformFunction, RowValidatorCallback, RowValidate } from '../types';
export default class RowTransformerValidator {
    private static createTransform;
    private static createValidator;
    private _rowTransform;
    private _rowValidator;
    rowTransform: RowTransformFunction;
    rowValidator: RowValidate;
    transformAndValidate(row: Row, cb: RowValidatorCallback): void;
    private callTransformer;
    private callValidator;
}
