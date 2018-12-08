import { Address, PrivateKey } from './crypto';
import { ScryptParams } from './scrypt';
import { Transaction } from './transaction/transaction';
/**
 * Control data of identity
 */
export declare class ControlData {
    static fromJson(json: any): ControlData;
    /**
     * Id of control data
     */
    id: string;
    /**
     * Encrypted private key
     */
    encryptedKey: PrivateKey;
    /**
     * Address of control data
     */
    address: Address;
    /**
     * Salt of control data
     */
    salt: string;
    /**
     * hash type
     */
    hash: string;
    /**
     * The public key
     */
    publicKey: string;
    constructor(id: string, encryptedKey: PrivateKey, address: Address, salt: string);
    toJson(): object;
}
export declare class Identity {
    /**
     * Import identity
     * @param label Name of identity
     * @param encryptedPrivateKey Encrypted private key
     * @param password User's password to decrypt
     * @param address Address to decrypt
     * @param saltBase64 Salt to decrypt
     * @param params Optional params to decrypt
     */
    static importIdentity(label: string, encryptedPrivateKey: PrivateKey, password: string, address: Address, saltBase64: string, params?: ScryptParams): Identity;
    /**
     * Creates Identity object encrypting specified private key.
     *
     * The identity is not registered on the blockchain. Caller needs to register it.
     *
     * @param privateKey Private key associated with the identity
     * @param keyphrase Password use to encrypt the private key
     * @param label Custom label
     * @param params Optional scrypt params
     */
    static create(privateKey: PrivateKey, keyphrase: string, label: string, params?: ScryptParams): Identity;
    static parseJson(json: string): Identity;
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj: any): Identity;
    ontid: string;
    label: string;
    lock: boolean;
    isDefault: boolean;
    controls: ControlData[];
    extra: null;
    addControl(control: ControlData): void;
    toJson(): string;
    /**
     * Serializes to JSON object.
     *
     * Returned object will not be stringified.
     *
     */
    toJsonObj(): any;
    exportPrivateKey(password: string, params?: ScryptParams): PrivateKey;
    signTransaction(password: string, tx: Transaction, params?: ScryptParams): Transaction;
}
