export interface RowMap {
    [key: string]: any;
}
export declare type RowHashArray = [string, any][];
export declare type RowArray = string[];
export declare type Row = RowArray | RowMap | RowHashArray;
export declare type RowTransformCallback = (error?: Error | null, row?: Row) => void;
export interface RowTransformFunction {
    (row: Row, callback: RowTransformCallback): void;
    (row: Row): Row;
}
