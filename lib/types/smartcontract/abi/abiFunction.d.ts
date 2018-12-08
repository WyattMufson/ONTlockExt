import { Parameter } from './parameter';
/**
 * Describes the Abi function
 */
export default class AbiFunction {
    name: string;
    returntype: string;
    parameters: Parameter[];
    constructor(name: string, returntype: string, parameters: Parameter[]);
    getParameter(name: string): any;
    setParamsValue(...args: Parameter[]): void;
    toString(): string;
}
