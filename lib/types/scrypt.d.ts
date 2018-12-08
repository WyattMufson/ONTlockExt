import { Address } from './crypto/address';
/**
 * Decribtes the structure of params for scrypt
 */
export interface ScryptParams {
    cost: number;
    blockSize: number;
    parallel: number;
    size: number;
}
/**
 * Encrypt with aes-ctr
 */
export declare function encryptWithCtr(privateKey: string, publicKeyEncoded: string, keyphrase: string, scryptParams?: ScryptParams): string;
/**
 * Decrypt with aes-ctr
 * @param encryptedKey encrypted private key
 * @param keyphrase user's password to encrypt private key
 * @param saltOrAddress 4 hex encoded bytes salt or Address object
 */
export declare function decryptWithCtr(encryptedKey: string, keyphrase: string, saltOrAddress: string | Address, scryptParams?: ScryptParams): string;
/**
 * Checks if the password supplied to decrypt was correct.
 *
 * This method was taken out from decrypt, because it needs to create public key from private key
 * and it needs to be supplied from outside.
 *
 * @param saltOrAddress 4 hex encoded bytes salt or Address object
 * @param publicKeyEncoded Public key from decrypted key
 */
export declare function checkCtrDecrypted(saltOrAddress: string | Address, publicKeyEncoded: string): void;
/**
 * Encrypt with aes-ecb
 */
export declare function encryptWithEcb(privateKey: string, publicKeyEncoded: string, keyphrase: string, scryptParams?: ScryptParams): string;
/**
 * Decrypt with aes-ecb
 */
export declare function decryptWithEcb(encryptedKey: string, keyphrase: string, scryptParams?: ScryptParams): string;
/**
 * Checks if the password supplied to decrypt was correct.
 *
 * This method was taken out from decrypt, because it needs to create public key from private key
 * and it needs to be supplied from outside.
 *
 * @param encryptedKey Original encrypted key
 * @param decryptedKey Decrypted key with decrypt
 * @param publicKeyEncoded Public key from decrypted key
 */
export declare function checkEcbDecrypted(encryptedKey: string, decryptedKey: string, publicKeyEncoded: string): void;
/**
 * Encrypt with aes-gcm-256
 * This is the default encryption algorithm for private key
 * @param privateKey Private key to encpryt with
 * @param address Adderss to encrypt with
 * @param salt Salt to encrypt with
 * @param keyphrase User's password
 * @param scryptParams Optional params to encrypt
 */
export declare function encryptWithGcm(privateKey: string, address: Address, salt: string, keyphrase: string, scryptParams?: ScryptParams): string;
/**
 * Decrypt with aes-256-gcm
 * @param encrypted Encrypted private key
 * @param address Address to decrypt with
 * @param salt Salt to decrypt with
 * @param keyphrase User's password
 * @param scryptParams Optioanl params to decrypt with
 */
export declare function decryptWithGcm(encrypted: string, address: Address, salt: string, keyphrase: string, scryptParams?: ScryptParams): string;
