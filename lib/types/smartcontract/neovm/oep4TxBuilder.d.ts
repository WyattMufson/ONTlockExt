import { BigNumber } from 'bignumber.js';
import { Transaction } from '../../transaction/transaction';
import { Address } from './../../crypto/address';
export declare class Oep4State {
    from: string;
    to: string;
    amount: BigNumber;
    constructor(from: Address, to: Address, amount: string);
}
/**
 * Transaction builder for oep-4 contracts
 */
export declare class Oep4TxBuilder {
    contractAddr: Address;
    constructor(contractAddr: Address);
    /**
     * Init the oep-4 smart contract
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    init(gasPrice: string, gasLimit: string, payer?: Address): Transaction;
    /**
     * Make transaction for transfer
     * @param from Sender's address
     * @param to Receiver's address
     * @param amount Amountof asset to transfer
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    makeTransferTx(from: Address, to: Address, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Make transaction for multi transfer.
     * The transaction needs signatures of each sender in states and the signature of the payer.
     * @param states Array of State(sender, receiver, amount)
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeTransferMultiTx(states: Oep4State[], gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Make transaction for approve
     * @param owner Owner's address
     * @param spender Spender's address
     * @param amount Amount
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeApproveTx(owner: Address, spender: Address, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeTransferFromTx(sender: Address, from: Address, to: Address, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeQueryAllowanceTx(owner: Address, spender: Address): Transaction;
    /**
     * Query the balance
     * @param address Address to query balance
     */
    queryBalanceOf(address: Address): Transaction;
    /**
     * Query the total supply of oep-4 contract
     */
    queryTotalSupply(): Transaction;
    /**
     * Query the total supply of oep-4 contract
     */
    queryDecimals(): Transaction;
    /**
     * Query the total supply of oep-4 contract
     */
    querySymbol(): Transaction;
    /**
     * Query the total supply of oep-4 contract
     */
    queryName(): Transaction;
}
