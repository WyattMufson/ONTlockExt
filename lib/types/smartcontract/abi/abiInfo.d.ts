import AbiFunction from './abiFunction';
/**
 * Decribes the Abi info.
 */
export default class AbiInfo {
    static parseJson(json: string): AbiInfo;
    hash: string;
    entrypoint: string;
    functions: AbiFunction[];
    getHash(): string;
    getEntryPoint(): string;
    getFunction(name: string): AbiFunction;
}
