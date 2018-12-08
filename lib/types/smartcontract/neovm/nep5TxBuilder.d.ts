import { Transaction } from '../../index';
import { Address } from './../../crypto/address';
/**
 * Transaction builder for nep-5 contracts
 */
export default class Nep5TxBuilder {
    /**
     * Init the nep-5 smart contract
     * @param contractAddr Address of contract
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    static init(contractAddr: Address, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
    /**
     * Make transaction for transfer
     * @param contractAddr Address of nep-5 contract
     * @param from Sender's address
     * @param to Receiver's address
     * @param amount Amountof asset to transfer
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer's address to pay for gas
     */
    static makeTransferTx(contractAddr: Address, from: Address, to: Address, amount: number, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Query the balance
     * @param contractAddr Address of nep-5 contract
     * @param address Address to query balance
     */
    static queryBalanceOf(contractAddr: Address, address: Address): Transaction;
    /**
     * Query the total supply of nep-5 contract
     * @param contractAddr Address of nep-5 contract
     */
    static queryTotalSupply(contractAddr: Address): Transaction;
    /**
     * Query the total supply of nep-5 contract
     * @param contractAddr Address of nep-5 contract
     */
    static queryDecimals(contractAddr: Address): Transaction;
    /**
     * Query the total supply of nep-5 contract
     * @param contractAddr Address of nep-5 contract
     */
    static querySymbol(contractAddr: Address): Transaction;
    /**
     * Query the total supply of nep-5 contract
     * @param contractAddr Address of nep-5 contract
     */
    static queryName(contractAddr: Address): Transaction;
}
