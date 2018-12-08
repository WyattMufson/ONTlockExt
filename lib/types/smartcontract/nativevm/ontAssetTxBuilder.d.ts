import { Address } from '../../crypto';
import { Transaction } from '../../transaction/transaction';
import { Transfer } from '../../transaction/transfer';
export declare const ONT_CONTRACT = "0000000000000000000000000000000000000001";
export declare const ONG_CONTRACT = "0000000000000000000000000000000000000002";
/**
 * Get the address of native asset contract
 * @param tokenType Token type. Can only be ONT or ONG
 */
export declare function getTokenContract(tokenType: string): Address;
/**
 * Verify amount
 * @param amount Amount
 */
export declare function verifyAmount(amount: number | string): void;
/**
 * Creates transaction to transfer native assets.
 * @param tokenType ONT or ONG
 * @param from sender's address
 * @param to receiver's address
 * @param amount Amount of amount to transfer
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for transaction's gas.
 */
export declare function makeTransferTx(tokenType: string, from: Address, to: Address, amount: number | string, gasPrice: string, gasLimit: string, payer?: Address): Transfer;
/**
 * transfer from multiple senders to one receiver
 * this tx needs multiple senders' signature.
 * @param tokenType
 * @param from array of senders' address
 * @param to receiver's address
 * @param amounts
 */
/**
 * transfer from one sender to multiple receivers
 * @param tokenType
 * @param from
 * @param to
 * @param amounts
 */
/**
 * Withdraw ong from sender's address and send to receiver's address
 * @param from Sender's address
 * @param to Receiver's address
 * @param amount Amount of ONG to withdraw.The value needs to multiply 1e9 to keep precision
 * @param payer Address to pay for transaction's gas
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeWithdrawOngTx(from: Address, to: Address, amount: number | string, payer: Address, gasPrice: string, gasLimit: string): Transfer;
/**
 * Creates transaction to query allowance that can be sent from sender to receiver
 * @param asset Asset type. Only ONT or ONg.
 * @param from Sender's address
 * @param to Receiver's address
 */
export declare function makeQueryAllowanceTx(asset: string, from: Address, to: Address): Transaction;
/**
 * Creates transaction to query balance.
 * @param asset Token type,ont or ong
 * @param address Address to query balance
 */
export declare function makeQueryBalanceTx(asset: string, address: Address): Transaction;
export declare function deserializeTransferTx(str: string): Transfer;
