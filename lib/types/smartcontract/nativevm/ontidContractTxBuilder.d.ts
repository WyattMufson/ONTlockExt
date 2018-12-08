import { Address, PublicKey } from '../../crypto';
import { DDOAttribute } from '../../transaction/ddo';
import { Transaction } from '../../transaction/transaction';
/**
 * Address of ONT ID contract
 */
export declare const ONTID_CONTRACT = "0000000000000000000000000000000000000003";
/**
 * Registers Identity.
 *
 * GAS calculation: gasLimit * gasPrice is equal to the amount of gas consumed.
 *
 * @param ontid User's ONT ID
 * @param publicKey Public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildRegisterOntidTx(ontid: string, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Registers Identity with initial attributes.
 *
 * @param ontid User's ONT ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildRegIdWithAttributes(ontid: string, attributes: DDOAttribute[], publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Adds attributes to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param attributes Array of DDOAttributes
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildAddAttributeTx(ontid: string, attributes: DDOAttribute[], publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Removes attribute from ONT ID.
 *
 * @param ontid User's ONT ID
 * @param key Key of attribute to remove
 * @param publicKey User's public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 *
 */
export declare function buildRemoveAttributeTx(ontid: string, key: string, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries attributes attached to ONT ID.
 *
 * @param ontid User's ONT ID
 */
export declare function buildGetAttributesTx(ontid: string): Transaction;
/**
 * Queries Description Object of ONT ID(DDO).
 *
 * @param ontid User's ONT ID
 */
export declare function buildGetDDOTx(ontid: string): Transaction;
/**
 * Adds a new public key to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param newPk New public key to be added
 * @param userKey User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildAddControlKeyTx(ontid: string, newPk: PublicKey, userKey: PublicKey | Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Revokes a public key from ONT ID.
 *
 * @param ontid User's ONT ID
 * @param pk2Remove Public key to be removed
 * @param sender User's public key or address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildRemoveControlKeyTx(ontid: string, pk2Remove: PublicKey, sender: PublicKey | Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries public keys attached to ONT ID.
 *
 * @param ontid User's ONT ID
 */
export declare function buildGetPublicKeysTx(ontid: string): Transaction;
/**
 * Adds recovery address to ONT ID.
 *
 * @param ontid User's ONT ID
 * @param recovery Recovery address, must have not be set
 * @param publicKey User's public key, must be user's existing public key
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildAddRecoveryTx(ontid: string, recovery: Address, publicKey: PublicKey, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Changes recovery address of ONT ID.
 *
 * This contract call must be initiated by the original recovery address.
 *
 * @param ontid user's ONT ID
 * @param newrecovery New recovery address
 * @param oldrecovery Original recoevery address
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Payer
 */
export declare function buildChangeRecoveryTx(ontid: string, newrecovery: Address, oldrecovery: Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * Queries the state of the public key associated with ONT ID.
 *
 * @param ontid user's ONT ID
 * @param pkId User's public key Id
 */
export declare function buildGetPublicKeyStateTx(ontid: string, pkId: number): Transaction;
