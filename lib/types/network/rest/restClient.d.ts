import { Address } from '../../crypto/address';
/**
 * Wrapper class for restful api.
 */
export default class RestClient {
    /**
     * Url of the blockchain node
     */
    url: string;
    /**
     * Version of restful api
     */
    version: string;
    /**
     * Action name of the request
     */
    action: string;
    constructor(url?: string);
    /**
     * Concat params as the query part
     * @param params
     */
    concatParams(params: Map<string, string>): string;
    /**
     * Get the current blockchain node url
     */
    getUrl(): string;
    /**
     * To send raw transaction to blockchian
     * @param hexData Hex encoded data
     * @param preExec Decides if it is a pre-execute transaction
     * @param userId User's id
     */
    sendRawTransaction(hexData: string, preExec?: boolean, userId?: string): Promise<any>;
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded transaction.
     * @param txHash Transactin hash.Always use the reversed value of transaction hash to query.
     *
     * @example
     *
     * ```typescript
     * import { utils, Transaction } from 'ontology-ts-sdk';
     * const txHash = tx.getHash(); // tx is an instance of Transaction
     * restClient.getRawTransaction(utils.reverseHex(txHash)).then(res => {
     *   const tx = Transaction.deserialize(res.Result)
     * })
     *
     * ````
     */
    getRawTransaction(txHash: string): Promise<any>;
    /**
     * Get transaction by transaction hash.
     * The result is transaction in json.
     * @param txHash Reversed transaction hash
     */
    getRawTransactionJson(txHash: string): Promise<any>;
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null.
     */
    /**
     * Get the nodes count of the blockchain.
     */
    getNodeCount(): Promise<any>;
    /**
     * Get the current height of the blockchain.
     */
    getBlockHeight(): Promise<any>;
    /**
     * Get block by block's height or hash
     * @param value Block height or block hash
     */
    getBlock(value: number | string): Promise<any>;
    /**
     * Get contract info by code hash.The result is hex encoded string.
     * @param codeHash Code hash of contract.The value is reversed contract address.
     */
    getContract(codeHash: string): Promise<any>;
    /**
     * Get contract info by code hash. The result is json.
     * @param codeHash Code hash of contract.
     */
    getContractJson(codeHash: string): Promise<any>;
    /**
     * Get smart contract event by Block height or reversed transaction hash.
     * If the parameter is block height, the result includes all the transaction event of that block;
     * If the parameter is transaction hash, the result is the event of that transaction.
     * @param value Block height or reversed transaction hash
     */
    getSmartCodeEvent(value: string | number): Promise<any>;
    /**
     * Get the block height by reversed transaction hash.
     * @param hash Reversed transaction hash.
     */
    getBlockHeightByTxHash(hash: string): Promise<any>;
    /**
     * Get the stored value in smart contract by the code hash and key.
     * @param codeHash Code hash of the smart contract
     * @param key Key of the stored value
     */
    getStorage(codeHash: string, key: string): Promise<any>;
    /**
     * Get the merkle proof by transaction hash
     * @param hash Reversed transaction hash
     */
    getMerkleProof(hash: string): Promise<any>;
    /**
     * Get balance of some address
     * The result contains balance of ONT and ONG
     * @param address Address
     */
    getBalance(address: Address): Promise<any>;
    /**
     * Get block info by block's height or hash.
     * @param value Block's height or hash
     */
    getBlockJson(value: number | string): Promise<any>;
    /**
     * Get allowance by address
     * @param asset Asset type. Only ONT or ONG.
     * @param from Address of allowance sender.
     * @param to Address of allowance receiver.
     */
    getAllowance(asset: string, from: Address, to: Address): Promise<any>;
}
