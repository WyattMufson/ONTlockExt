import { BigNumber } from 'bignumber.js';
import { Transaction } from '../../transaction/transaction';
import { Address } from './../../crypto/address';
export declare class Oep8State {
    from: string;
    to: string;
    tokenId: string;
    value: BigNumber;
    constructor(from: Address, to: Address, tokenId: number, value: string);
}
export declare class TransferFrom {
    spender: string;
    from: string;
    to: string;
    tokenId: string;
    value: BigNumber;
    constructor(spender: Address, from: Address, to: Address, tokenId: number, value: string);
}
export declare class Oep8TxBuilder {
    contractAddr: Address;
    constructor(contractAddr: Address);
    makeInitTx(gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeTransferTx(sendAddr: Address, recvAddr: Address, tokenId: number, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeTransferMultiTx(states: Oep8State[], gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeApproveTx(owner: Address, spender: Address, tokenId: number, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeApproveMulti(states: Oep8State[], gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeTransferFromMulti(states: TransferFrom[], gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeTransferFromTx(sender: Address, from: Address, to: Address, tokenId: number, amount: string, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Compound tokens
     * @param account User's address
     * @param compoundNum 0 - compound all tokens that can be compounded; 1 - compound 1 token of each type.
     * @param gasPrice Gas price
     * @param gasLimit Gas limit
     * @param payer Payer to pay for gas
     */
    makeCompoundTx(account: Address, compoundNum: number, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeQueryAllowanceTx(owner: Address, spender: Address, tokenId: number): Transaction;
    makeQueryBalanceOfTx(addr: Address, tokenId: number): Transaction;
    makeQueryTotalSupplyTx(tokenId: number): Transaction;
    makeQueryNameTx(tokenId: number): Transaction;
    makeQueryDecimalsTx(): Transaction;
    makeQuerySymbolTx(tokenId: number): Transaction;
    makeQueryBalancesTx(account: Address): Transaction;
    makeQueryTotalBalanceTx(account: Address): Transaction;
}
