import { Address, PrivateKey, Signature, SignatureScheme } from '../crypto';
import { ClaimProof } from './claimProof';
import { Message, Metadata } from './message';
/**
 * Type of revocation.
 */
export declare enum RevocationType {
    AttestContract = "AttestContract",
    RevocationList = "RevocationList",
}
/**
 * Revocation definition.
 */
export interface Revocation {
    /**
     * Type of revocation.
     */
    type: RevocationType;
    /**
     * Url of revocation list if type is RevocationList
     */
    url?: string;
    /**
     * Address of attest contract if type is AttestContract
     */
    addr?: string;
}
/**
 * Verifiable claim.
 *
 * TODO: override verify to add claim proof verification.
 */
export declare class Claim extends Message {
    static deserialize(jwt: string): Claim;
    version: string;
    context: string;
    content: any;
    revocation?: Revocation;
    useProof: boolean;
    proof?: ClaimProof;
    constructor(metadata: Metadata, signature?: Signature | undefined, useProof?: boolean);
    /**
     * Overrides default message verification with added attest verification.
     *
     * TODO: return more than boolean
     *
     * const VerifyOntidClaimResult = {
     *   CLAIM_NOT_ONCHAIN : 'CLAIM_NOT_ONCHAIN',
     *   INVALID_SIGNATURE : 'INVALID_SIGNATURE',
     *   PK_IN_REVOKED     : 'PK_IN_REVOKED',
     *   NO_ISSUER_PK      : 'NO_ISSUER_PK',
     *   EXPIRED_CLAIM     : 'EXPIRED_CLAIM',
     *   REVOKED_CLAIM     : 'REVOKED_CLAIM',
     *   VALID_CLAIM       : 'VALID_CLAIM'
     * };
     *
     * @param url Restful endpoint of Ontology node
     * @param checkAttest Should be the attest tested
     */
    verify(url: string, checkAttest?: boolean): Promise<boolean>;
    /**
     * Serializes the claim into JWT/JWT-X format.
     *
     * Override default implementation by adding proof if available.
     */
    serialize(): string;
    /**
     * Attests the claim onto blockchain.
     *
     * @param url Websocket endpoint of Ontology node
     * @param privateKey Private key to sign the transaction
     * @param gasPrice gasPrice
     * @param gasLimit gasLimit
     * @param payer payer
     */
    attest(url: string, gasPrice: string, gasLimit: string, payer: Address, privateKey: PrivateKey): Promise<boolean>;
    /**
     * Revokes claim attest from blockchain.
     *
     * @param gas the cost of the transactoin
     * @param payer the payer of the cost
     * @param privateKey Private key to sign the transaction
     * @param url Websocket endpoint of Ontology node
     * @param gasPrice gasPrice
     * @param gasLimit gasLimit
     * @param payer payer
     */
    revoke(url: string, gasPrice: string, gasLimit: string, payer: Address, privateKey: PrivateKey): Promise<boolean>;
    /**
     * Gets status of the claim attest.
     *
     * @param url Restful endpoint of Ontology node
     */
    getStatus(url: string): Promise<boolean>;
    protected payloadToJSON(): any;
    protected payloadFromJSON(json: any): void;
    /**
     * Serializes the header into JWT/JWT-X encoded header.
     *
     * Override default implementation by adding proof if available.
     *
     * @param algorithm Signature algorithm used
     * @param publicKeyId The ID of a signature public key
     */
    protected serializeHeader(algorithm: SignatureScheme | undefined, publicKeyId: string | undefined): string;
    /**
     * Serializes the proof into JWT-X.
     */
    protected serializeProof(): string;
}
/**
 * Helper class for deserializing GetStatus response.
 * fixme: Ontology node changed the response
 */
export declare class GetStatusResponse {
    static deserialize(r: any): GetStatusResponse;
    claimId: string;
    issuerId: string;
    subjectId: string;
    status: Status;
}
export declare enum Status {
    REVOKED = "00",
    ATTESTED = "01",
    NOTFOUND = "-1",
}
