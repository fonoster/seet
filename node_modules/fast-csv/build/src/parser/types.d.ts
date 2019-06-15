export interface RowMap {
    [s: string]: string;
}
export declare type RowArray = string[];
export declare type Row = string[] | object;
export interface RowValidationResult {
    row: Row | null;
    isValid: boolean;
    reason?: string;
}
export declare type RowValidatorCallback = (error: Error | null, result?: RowValidationResult) => void;
export declare type RowTransformCallback = (error?: Error | null, row?: Row) => void;
export declare type SyncRowTransform = (row: Row) => Row;
export declare type AsyncRowTransform = (row: Row, cb: RowTransformCallback) => void;
export declare type RowTransformFunction = SyncRowTransform | AsyncRowTransform;
export declare const isSyncTransform: (transform: RowTransformFunction) => transform is SyncRowTransform;
export declare type RowValidateCallback = (error?: Error | null, isValid?: boolean, reason?: string) => void;
export declare type SyncRowValidate = (row: Row) => boolean;
export declare type AsyncRowValidate = (row: Row, cb: RowValidateCallback) => void;
export declare type RowValidate = AsyncRowValidate | SyncRowValidate;
export declare const isSyncValidate: (validate: RowValidate) => validate is SyncRowValidate;
