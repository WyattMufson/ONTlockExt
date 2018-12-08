import { Address } from '../../crypto';
import { Transaction } from './../../transaction/transaction';
/**
 * Address of auth contract.
 */
export declare const AUTH_CONTRACT = "0000000000000000000000000000000000000006";
/**
 * Creates transaction that initialize the admin of some contract.
 * @param adminOntId Admin's ONT ID
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeInitContractAdminTx(adminOntId: string, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Transfer the authority to new admin
 * @param contractAddr Uer's contract address
 * @param newAdminOntid New admin's ONT ID. This id must be registered.
 * @param keyNo Original admin's public key id. Use this pk to varify tx.
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeTransferAuthTx(contractAddr: Address, newAdminOntid: string, keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * verify the user's token of target contract
 * @param contractAddr user's target contract address
 * @param callerOntId caller's ONT ID.This id must be registered.
 * @param funcName the function to call
 * @param keyNo publicKey's id, use this pk to varify tx
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeVerifyTokenTx(contractAddr: Address, callerOntId: string, funcName: string, keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * assign functions to role. must be called by contract's admin
 * @param contractAddr target contract's address
 * @param adminOntId admin's ONT ID.This id must be registered.
 * @param role role name
 * @param funcNames array of function name
 * @param keyNo publicKey's id, use the pk to varify tx
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeAssignFuncsToRoleTx(contractAddr: Address, adminOntId: string, role: string, funcNames: string[], keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * assign role to ONT IDs. must be called by contract's admin
 * @param contractAddr target contract's address
 * @param adminOntId admin's ONT ID.This id must be registered.
 * @param role role's name
 * @param ontIds array of ONT ID
 * @param keyNo admin's pk id.use to varify tx.
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeAssignOntIdsToRoleTx(contractAddr: Address, adminOntId: string, role: string, ontIds: string[], keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * delegate role to others. Can't delegate repeatedly。
 * @param contractAddr target contract's address
 * @param from ONT ID of user that wants to delegate role.This id must be registered.
 * @param to ONT ID of user that will receive role.This id must be registered.
 * @param role role name
 * @param period time of delegate period in second
 * @param level = 1 for now.
 * @param keyNo The number of user's publick in the DDO.
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeDelegateRoleTx(contractAddr: Address, from: string, to: string, role: string, period: number, level: number | undefined, keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * role's owner can withdraw the delegate in advance
 * @param contractAddr target contract's address
 * @param initiator ONT ID of role's owner.This id must be registered.
 * @param delegate ONT ID of role's agent.This id must be registered.
 * @param role role's name
 * @param keyNo The number of user's public key in the DDO
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeWithdrawRoleTx(contractAddr: Address, initiator: string, delegate: string, role: string, keyNo: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
