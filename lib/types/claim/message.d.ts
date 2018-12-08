import { PrivateKey, PublicKey, PublicKeyStatus, Signature, SignatureScheme } from '../crypto';
/**
 * Factory method type used for creating concrete instances of Message.
 */
export declare type MessageFactory<T extends Message> = (metadata: Metadata, signature: Signature | undefined) => T;
/**
 * Metadata about the message.
 */
export interface Metadata {
    /**
     * Message id.
     *
     * Will be assigned if not provided.
     */
    messageId?: string;
    /**
     * Issuer.
     */
    issuer: string;
    /**
     * Recipient.
     */
    subject: string;
    /**
     * Creation time.
     */
    issuedAt: number;
    /**
     * Expiration time.
     */
    expireAt?: number;
}
/**
 * Common representation of Message in JWT form.
 */
export declare abstract class Message {
    /**
     * Deserializes the message from JWT format.
     *
     * A concrete instance will be creater through the message factory method. This method
     * is called from concrete class.
     *
     * @param jwt Encoded message
     * @param creator Factory method
     */
    protected static deserializeInternal<T extends Message>(jwt: string, creator: MessageFactory<T>): T;
    /**
     * Deserializes payload part of JWT message.
     *
     * @param encoded JWT encoded payload
     */
    private static deserializePayload(encoded);
    /**
     * Deserializes the header from JWT encoded header.
     *
     * @param encoded JWT encoded header
     */
    private static deserializeHeader(encoded);
    metadata: Metadata;
    signature?: Signature;
    constructor(metadata: Metadata, signature: Signature | undefined);
    /**
     * Signs the message and store the signature inside the request.
     *
     * If the algorithm is not specified, then default algorithm for Private key type is used.
     *
     * @param url Restful endpoint of Ontology node
     * @param publicKeyId The ID of a signature public key
     * @param privateKey Private key to sign the request with
     * @param algorithm Signature algorithm used
     */
    sign(url: string, publicKeyId: string, privateKey: PrivateKey, algorithm?: SignatureScheme): Promise<void>;
    /**
     * Verifies the signature and check ownership of specified ONT ID through smart contract call.
     *
     * @param url Restful endpoint of Ontology node
     * @returns Boolean if the ownership is confirmed
     */
    verify(url: string): Promise<boolean>;
    /**
     * Serializes the message without signature into JWT format.
     *
     * Header might contain algorithm and public key id.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    serializeUnsigned(algorithm?: SignatureScheme, publicKeyId?: string): string;
    /**
     * Serializes the message into JWT format.
     *
     */
    serialize(): string;
    /**
     * Serializes the header into JWT encoded header.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    protected serializeHeader(algorithm: SignatureScheme | undefined, publicKeyId: string | undefined): string;
    /**
     * Converts claim data to JSON for serialization.
     */
    protected abstract payloadToJSON(): any;
    /**
     * Retrieves data from JSON.
     *
     * @param json JSON object with data
     */
    protected abstract payloadFromJSON(json: any): void;
    /**
     * Verifies if the expiration date has passed
     */
    private verifyExpiration();
    /**
     * Verifies if the declared public key id belongs to issuer.
     */
    private verifyKeyOwnership();
    /**
     * Serializes payload part of JWT message.
     */
    private serializePayload();
}
/**
 * Gets the public key associated with ONT ID from blockchain.
 *
 * @param publicKeyId The ID of a signature public key
 * @param url Restful endpoint of Ontology node
 */
export declare function retrievePublicKey(publicKeyId: string, url: string): Promise<PublicKey>;
/**
 * Gets the state of public key associated with ONT ID from blockchain.
 *
 * @param publicKeyId The ID of a signature public key
 * @param url Restful endpoint of Ontology node
 */
export declare function retrievePublicKeyState(publicKeyId: string, url: string): Promise<PublicKeyStatus>;
/**
 * Extracts ONT ID from public key Id.
 *
 * @param publicKeyId The ID of a signature public key
 */
export declare function extractOntId(publicKeyId: string): string;
/**
 * Extracts key id from public key Id.
 *
 * @param publicKeyId The ID of a signature public key
 */
export declare function extractKeyId(publicKeyId: string): number;
