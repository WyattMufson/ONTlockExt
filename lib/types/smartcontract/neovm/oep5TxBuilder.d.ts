import { Transaction } from '../../transaction/transaction';
import { Address } from './../../crypto/address';
export declare class Oep5Param {
    toAcct: string;
    tokenId: string;
    constructor(toAcct: Address, tokenId: string);
}
export declare class Oep5TxBuilder {
    contractAddr: Address;
    constructor(contractAddr: Address);
    makeInitTx(gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeOwnerOfTx(tokenId: string): Transaction;
    /**
     * Transfer the control to someone else
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeTransferTx(oep5Param: Oep5Param, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Transfer the control to multi people
     */
    makeTransferMultiTx(oep5Params: Oep5Param[], gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Approve the token to toAcct address, it can overwrite older approved address
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeApproveTx(oep5Param: Oep5Param, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    /**
     * Take the approved token.
     * @param oep5Param
     * @param gasPrice
     * @param gasLimit
     * @param payer
     */
    makeTakeOwnershipTx(oep5Param: Oep5Param, gasPrice: string, gasLimit: string, payer: Address): Transaction;
    makeQueryBalanceOfTx(addr: Address): Transaction;
    makeQueryTotalSupplyTx(): Transaction;
    makeQueryTokenIDByIndexTx(index: number): Transaction;
    makeQueryTokenByIDTx(tokenId: string): Transaction;
    makeGetApprovedTx(tokenId: string): Transaction;
    makeQueryNameTx(): Transaction;
    makeQuerySymbolTx(): Transaction;
}
