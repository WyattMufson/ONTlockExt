import { BigNumber } from 'bignumber.js';
import AbiFunction from '../smartcontract/abi/abiFunction';
import { Parameter } from '../smartcontract/abi/parameter';
import Struct from '../smartcontract/abi/struct';
import { StringReader } from '../utils';
export declare const pushBool: (param: boolean) => string;
export declare const pushInt: (param: number) => string;
export declare const pushBigNum: (param: BigNumber) => string;
export declare const pushHexString: (param: string) => string;
export declare const getStructBytes: (val: Struct) => string;
export declare const getMapBytes: (val: Map<string, Parameter>) => string;
export declare const pushMap: (val: Map<string, any>) => string;
export declare const pushParam: (p: any) => string;
export declare const serializeAbiFunction: (abiFunction: AbiFunction) => string;
export declare function convertArray(list: Parameter[]): any;
export declare function convertMap(p: Parameter): any;
/**
 * To deserialize the value return from smart contract invoke.
 * @param hexstr
 */
export declare function deserializeItem(sr: StringReader): any;
export declare const createCodeParamsScript: (list: any[]) => string;
export declare const buildSmartContractParam: (functionName: string, params: Parameter[]) => string;
export declare const buildWasmContractParam: (params: Parameter[]) => string;
