import { ParserOptions } from '../ParserOptions';
interface TokenArgs {
    token: string;
    startCursor: number;
    endCursor: number;
}
export declare type MaybeToken = Token | null;
export declare class Token {
    static isTokenRowDelimiter(token: Token): boolean;
    static isTokenCarriageReturn(token: Token, parserOptions: ParserOptions): boolean;
    static isTokenComment(token: Token, parserOptions: ParserOptions): boolean;
    static isTokenEscapeCharacter(token: Token, parserOptions: ParserOptions): boolean;
    static isTokenQuote(token: Token, parserOptions: ParserOptions): boolean;
    static isTokenDelimiter(token: Token, parserOptions: ParserOptions): boolean;
    readonly token: string;
    readonly startCursor: number;
    readonly endCursor: number;
    constructor(tokenArgs: TokenArgs);
}
interface ScannerArgs {
    line: string;
    parserOptions: ParserOptions;
    hasMoreData: boolean;
    cursor?: number;
}
export declare class Scanner {
    line: string;
    private readonly parserOptions;
    lineLength: number;
    readonly hasMoreData: boolean;
    cursor: number;
    constructor(args: ScannerArgs);
    readonly hasMoreCharacters: boolean;
    readonly nextNonSpaceToken: MaybeToken;
    readonly nextCharacterToken: MaybeToken;
    readonly lineFromCursor: string;
    advancePastLine(): Scanner | null;
    advanceTo(cursor: number): Scanner;
    advanceToToken(token: Token): Scanner;
    advancePastToken(token: Token): Scanner;
    truncateToCursor(): Scanner;
}
export {};
