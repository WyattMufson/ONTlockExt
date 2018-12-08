import { Address } from '../../crypto';
import { Transaction } from './../../transaction/transaction';
/**
 * Attests the claim.
 *
 * @param claimId Unique id of the claim
 * @param issuer Issuer's ONT ID
 * @param subject Subject's ONT ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
export declare function buildCommitRecordTx(claimId: string, issuer: string, subject: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
/**
 * Revokes the claim.
 *
 * @param claimId Unique id of the claim
 * @param revokerOntid Revoker's ONT ID
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer's address
 */
export declare function buildRevokeRecordTx(claimId: string, revokerOntid: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
/**
 * Queries the state of attest.
 *
 * @param claimId Unique id of the claim
 */
export declare function buildGetRecordStatusTx(claimId: string): Transaction;
