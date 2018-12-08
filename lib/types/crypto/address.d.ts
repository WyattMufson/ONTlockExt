import { StringReader } from '../utils';
import { PublicKey } from './PublicKey';
/**
 * Representation of Address.
 *
 * There are 4 types of address:
 * 1. Public key based
 * 2. Multi public key based (m, n)
 * 3. Contract based
 * 4. ONT ID based
 *
 * The value is stored as base58 or hex encoded, therefore always use
 * toBase58() or serialize() according to requirements.
 */
export declare class Address {
    static deserialize(sr: StringReader): Address;
    /**
     * Generates public key based address.
     *
     * @param publicKey Public key to use
     */
    static fromPubKey(publicKey: PublicKey): Address;
    /**
     * Generates identity based address.
     * @param ontid ONT ID in the form did:ont:AXmQDzzvpEtPkNwBEFsREzApTTDZFW6frD
     */
    static fromOntid(ontid: string): Address;
    /**
     * Generates address from smart contract code.
     *
     * @param vmCode Hex encoded smart contract code
     */
    static fromVmCode(vmCode: string): Address;
    /**
     * Generates (m, n) threshold address.
     *
     * m - threshold
     * n - total number of public keys
     *
     * @param m The threshold
     * @param publicKeys Public key
     */
    static fromMultiPubKeys(m: number, publicKeys: PublicKey[]): Address;
    /**
     * Deterministicaly generates ONT ID from this public key.
     */
    static generateOntid(publicKey: PublicKey): string;
    /**
     * Base58 or Hex encoded address
     */
    value: string;
    constructor(value: string);
    /**
     * Gets Base58 encoded representation of the address.
     */
    toBase58(): string;
    /**
     * Gets Hex encoded representation of the address.
     */
    toHexString(): string;
    serialize(): string;
    /**
     * Computes the salt from address for decrypt.
     */
    getB58Checksum(): string;
}
