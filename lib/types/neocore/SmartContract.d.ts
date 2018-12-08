import AbiFunction from '../smartcontract/abi/abiFunction';
import { Address } from './../crypto/address';
import { InvocationTransaction } from './InvocationTransaction';
export declare class SmartContract {
    static makeInvokeTransaction(contractAddr: Address, addr: Address, abiFunction: AbiFunction): InvocationTransaction;
    static makeInvocationTransaction(params: string, addr: Address): InvocationTransaction;
}
