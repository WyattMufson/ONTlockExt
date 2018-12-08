/**
 * Struct is a special kind of parameter that used in smart contract.
 */
export default class Struct {
    list: any[];
    constructor();
    /**
     * Add arguments to struct.
     * @param args Array of some kinds of value.
     * Boolean, number, string, Address and Struct are supported.
     */
    add(...args: any[]): void;
}
