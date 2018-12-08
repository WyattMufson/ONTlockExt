/**
 * Big positive integer base on BigNumber
 */
export default class BigInt {
    /**
     * Create BigInt from string
     * @param hex Byte string value
     */
    static fromHexstr(hex: string): BigInt;
    value: string | number;
    constructor(value: string | number);
    /**
     * Create hex string from BigInt
     */
    toHexstr(): string;
}
