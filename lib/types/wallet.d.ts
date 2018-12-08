import { Account } from './account';
import { Identity } from './identity';
/**
 * Class to manage Accounts and Identity
 */
export declare class Wallet {
    static parseJson(json: string): Wallet;
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj: any): Wallet;
    static fromWalletFile(obj: any): Wallet;
    /**
     * @example
     * ```typescript
     *
     * import { Wallet } from 'ontology-ts-sdk';
     * const wallet = Wallet.create('test');
     * ```
     *
     * @param name Wallet's name
     */
    static create(name: string): Wallet;
    name: string;
    defaultOntid: string;
    defaultAccountAddress: string;
    createTime: string;
    version: string;
    scrypt: {
        n: number;
        r: number;
        p: number;
        dkLen: number;
    };
    identities: Identity[];
    accounts: Account[];
    extra: null;
    addAccount(account: Account): void;
    addIdentity(identity: Identity): void;
    setDefaultAccount(address: string): void;
    setDefaultIdentity(ontid: string): void;
    toJson(): string;
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj(): any;
    signatureData(): string;
    toWalletFile(): any;
}
