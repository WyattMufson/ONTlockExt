import { PublicKey } from '../crypto';
/**
 * Public key representation with recorded id from blockchain.
 *
 */
export declare class PublicKeyWithId {
    /**
     * Deserialize from hex string to PublicKeyWithId
     * @param hexstr
     */
    static deserialize(hexstr: string): PublicKeyWithId[];
    /**
     * Id of the public key.
     *
     * Only numeric part is recorded. Full PublicKeyId will be constucted as follows:
     * <ONTID>#keys-<id>
     */
    id: number;
    pk: PublicKey;
}
/**
 * Description attribute of ONT ID
 */
export declare class DDOAttribute {
    static deserialize(hexstr: string): DDOAttribute[];
    /**
     * Key of the attribute
     */
    key: string;
    /**
     * Type of the attribute
     */
    type: string;
    /**
     * Value of the attribute
     */
    value: string;
    /**
     * Serialize DDO to hex string
     */
    serialize(): string;
}
/**
 * Description object of ONT ID
 */
export declare class DDO {
    /**
     * Deserialize from hex string to DDO
     * @param hexstr Hex encoded string
     */
    static deserialize(hexstr: string): DDO;
    /**
     * Array of public keys
     */
    publicKeys: PublicKeyWithId[];
    /**
     * Array of attributes
     */
    attributes: DDOAttribute[];
    /**
     * Recovery of DDO
     */
    recovery: string;
}
