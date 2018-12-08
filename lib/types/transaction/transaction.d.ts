import Fixed64 from '../common/fixed64';
import { Address } from '../crypto/address';
import { Signable } from '../crypto/signable';
import { StringReader } from '../utils';
import Payload from './payload/payload';
import { TransactionAttribute } from './txAttribute';
import { TxSignature } from './txSignature';
export declare enum TxType {
    BookKeeper = 2,
    Claim = 3,
    Deploy = 208,
    Invoke = 209,
    Enrollment = 4,
    Vote = 5,
}
export declare const TxName: {
    BookKeeper: string;
    Claim: string;
    Deploy: string;
    Invoke: string;
    Enrollment: string;
    Vote: string;
};
/**
 * @deprecated. Transaction fee.
 */
export declare class Fee {
    static deserialize(sr: StringReader): Fee;
    amount: Fixed64;
    payer: Address;
    serialize(): string;
}
export declare class Transaction implements Signable {
    static deserialize(hexstring: string): Transaction;
    /**
     * Transaction type
     */
    type: TxType;
    /**
     * Version of transaction
     */
    version: number;
    /**
     * Payload of transaction
     */
    payload: Payload;
    /**
     * Random hex string. 4 bytes.
     */
    nonce: string;
    /**
     * @deprecated
     */
    txAttributes: TransactionAttribute[];
    /**
     * Gas price
     */
    gasPrice: Fixed64;
    /**
     * Gas limit
     */
    gasLimit: Fixed64;
    /**
     * Address to pay for gas
     */
    payer: Address;
    /**
     * Array of signatures
     */
    sigs: TxSignature[];
    constructor();
    /**
     * Serialize transaction to hex string
     * The result is used to send to blockchain.
     */
    serialize(): string;
    /**
     * Serialize transaction data exclueds signatures
     */
    serializeUnsignedData(): string;
    /**
     * Serialize signatures
     */
    serializeSignedData(): string;
    /**
     * Get the signable content
     */
    getSignContent(): string;
    /**
     * Get the hash of transaction
     * @deprecated Use getSignContent instead
     */
    getHash(): string;
}
