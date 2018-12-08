import { ScryptParams } from '../scrypt';
import { Address } from './address';
import { Key, KeyParameters } from './Key';
import { KeyType } from './KeyType';
import { PublicKey } from './PublicKey';
import { Signable } from './signable';
import { Signature } from './Signature';
import { SignatureScheme } from './SignatureScheme';
export declare class PrivateKey extends Key {
    /**
     * Generates random Private key using supplied Key type and parameters.
     *
     * If no Key type or parameters is supplied, default SDK key type with default parameters will be used.
     *
     * @param keyType The key type
     * @param parameters The parameters for the key type
     */
    static random(keyType?: KeyType, parameters?: KeyParameters): PrivateKey;
    /**
     * Creates PrivateKey from Wallet Import Format (WIF) representation.
     *
     * @param wifkey WIF private key representation
     *
     */
    static deserializeWIF(wifkey: string): PrivateKey;
    /**
     * Creates PrivateKey from mnemonic according to BIP39 protocol.
     *
     * @param mnemonic Space separated list of words
     *
     */
    static generateFromMnemonic(mnemonic: string, derivePath?: string): PrivateKey;
    /**
     * Signs the data with supplied private key using signature schema.
     *
     * If the signature schema is not provided, the default schema for this key type is used.
     *
     * This method is not suitable, if external keys (Ledger, TPM, ...) support is required.
     *
     * @param msg Hex encoded input data or Signable object
     * @param schema Signing schema to use
     * @param publicKeyId Id of public key
     */
    sign(msg: string | Signable, schema?: SignatureScheme, publicKeyId?: string): Signature;
    /**
     * Asynchroniously signs the data with supplied private key using signature schema.
     *
     * If the signature schema is not provided, the default schema for this key type is used.
     *
     * This method is suitable, if external keys (Ledger, TPM, ...) support is required.
     *
     * @param msg Hex encoded input data or Signable object
     * @param schema Signing schema to use
     * @param publicKeyId Id of public key
     */
    signAsync(msg: string | Signable, schema?: SignatureScheme, publicKeyId?: string): Promise<Signature>;
    /**
     * Derives Public key out of Private key.
     */
    getPublicKey(): PublicKey;
    /**
     * Decrypts encrypted private key with supplied password.
     *
     * @param keyphrase Password to decrypt with
     * @param address For aad in decryption
     * @param 16 secure random bytes
     * @param params Optional Scrypt params
     */
    decrypt(keyphrase: string, address: Address, salt: string, params?: ScryptParams): PrivateKey;
    /**
     * Encrypts private key with supplied password.
     *
     * @param keyphrase Password to encrypt with
     * @param address For aad in encryption
     * @param salt 16 secure random bytes
     * @param params Optional Scrypt params
     */
    encrypt(keyphrase: string, address: Address, salt: string, params?: ScryptParams): PrivateKey;
    /**
     * Derives Public key out of Private key using EcDSA algorithm.
     */
    getEcDSAPublicKey(): PublicKey;
    /**
     * Derives Public key out of Private key using EdDSA algorithm.
     */
    getEdDSAPublicKey(): PublicKey;
    /**
     * Derives Public key out of Private key using SM2 algorithm.
     */
    getSM2PublicKey(): PublicKey;
    /**
     * Computes signature of message hash using specified signature schema.
     *
     * @param hash Message hash
     * @param schema Signature schema to use
     */
    computeSignature(hash: string, schema: SignatureScheme): string;
    /**
     * Computes EcDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     */
    computeEcDSASignature(hash: string): string;
    /**
     * Computes EdDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     */
    computeEdDSASignature(hash: string): string;
    /**
     * Computes SM2 signature of message hash.
     *
     * Only default SM2 ID is supported.
     *
     * @param hash Message hash
     */
    computeSM2Signature(hash: string): string;
    /**
     * Gets Wallet Import Format (WIF) representation of the PrivateKey.
     *
     */
    serializeWIF(): string;
}
