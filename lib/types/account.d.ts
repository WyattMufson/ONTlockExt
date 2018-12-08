import { Address, PrivateKey } from './crypto';
import { ScryptParams } from './scrypt';
import { Transaction } from './transaction/transaction';
export declare class Account {
    /**
     * Import account
     * @param label Account's label
     * @param encryptedPrivateKey Encrypted private key
     * @param password User's password to decrypt private key
     * @param address Account's address
     * @param saltBase64 Salt to decrypt
     * @param params Params used to decrypt
     */
    static importAccount(label: string, encryptedPrivateKey: PrivateKey, password: string, address: Address, saltBase64: string, params?: ScryptParams): Account;
    /**
     * Import account with mnemonic
     * @param label Account's label
     * @param mnemonic User's mnemonic
     * @param password user's password to encrypt the private key
     * @param params Params used to encrypt the private key.
     */
    static importWithMnemonic(label: string, mnemonic: string, password: string, params?: ScryptParams): Account;
    /**
     * Creates Account object encrypting specified private key.
     *
     * The account does not need to be registered on blockchain.
     *
     * @param privateKey Private key associated with the account
     * @param password Password use to encrypt the private key
     * @param label Custom label
     * @param params Optional scrypt params
     */
    static create(privateKey: PrivateKey, password: string, label?: string, params?: ScryptParams): Account;
    static parseJson(json: string): Account;
    /**
     * Deserializes JSON object.
     *
     * Object should be real object, not stringified.
     *
     * @param obj JSON object
     */
    static parseJsonObj(obj: any): Account;
    address: Address;
    label: string;
    lock: boolean;
    encryptedKey: PrivateKey;
    extra: null;
    'enc-alg': string;
    hash: string;
    salt: string;
    publicKey: string;
    isDefault: boolean;
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
