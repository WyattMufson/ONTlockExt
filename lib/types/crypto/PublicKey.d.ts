import { StringReader } from '../utils';
import { Key } from './Key';
import { Signable } from './signable';
import { Signature } from './Signature';
import { SignatureScheme } from './SignatureScheme';
/**
 * Class to manage the public key with some userful functions.
 */
export declare class PublicKey extends Key {
    /**
     * Creates PublicKey from Hex representation.
     *
     * @param sr String reader
     * @param length Byte length of the serialized object
     *
     */
    static deserializeHex(sr: StringReader, length?: number): PublicKey;
    /**
     * Verifies if the signature was created with private key corresponding to supplied public key
     * and was not tampered with using signature schema.
     *
     * @param msg Hex encoded input data or Signable object
     * @param signature Signature object
     */
    verify(msg: string | Signable, signature: Signature): boolean;
    /**
     * Serializes public key to Hex representation.
     *
     * Length definition is not included.
     */
    serializeHex(): string;
    /**
     * For internal use.
     * @param hash Message hash
     * @param signature Hex encoded signature
     * @param schema Signature scheme to use
     */
    verifySignature(hash: string, signature: string, schema: SignatureScheme): boolean;
    /**
     * Verifies EcDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifyEcDSASignature(hash: string, signature: string): boolean;
    /**
     * Verifies EdDSA signature of message hash. Curve name is derrived from private key.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifyEdDSASignature(hash: string, signature: string): boolean;
    /**
     * Verifies SM2 signature of message hash.
     *
     * Only default SM2 ID is supported.
     *
     * @param hash Message hash
     * @param signature Hex encoded signature
     */
    verifySM2Signature(hash: string, signature: string): boolean;
}
/**
 * Public key status enumaration.
 */
export declare class PublicKeyStatus {
    static values: PublicKeyStatus[];
    static IN_USE: PublicKeyStatus;
    static REVOKED: PublicKeyStatus;
    /**
     * Finds Public key status corresponding to specified label representation.
     *
     * @param label Hex encoded label
     */
    static fromHexLabel(hexLabel: string): PublicKeyStatus;
    label: string;
    constructor(label: string);
}
