import { Address } from '../../crypto/address';
/**
 * Wrapper class for RPC apis.
 */
export default class RpcClient {
    /**
     * Url of the blockchain node
     */
    url: string;
    constructor(url?: string);
    /**
     * Get the current blockchain node url.
     */
    getUrl(): string;
    /**
     * Make request base on method and parameters
     * @param method Method's name
     * @param params Parameters
     */
    makeRequest(method: string, ...params: any[]): {
        jsonrpc: string;
        method: string;
        params: any[];
        id: number;
    };
    /**
     * Get the balance of some address.
     * The result contains ONT and ONG.
     * @param address Address
     */
    getBalance(address: Address): Promise<any>;
    /**
     * Send ran transaction to blockchain.
     * @param data Hex encoded data.
     * @param preExec Decides if it is a pre-execute transaction.
     */
    sendRawTransaction(data: string, preExec?: boolean): Promise<any>;
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded string.
     * @param txHash Reversed transaction hash
     */
    getRawTransaction(txHash: string): Promise<any>;
    /**
     * Get transaction info by transaction hash.
     * The result is json.
     * @param txHash Reversed transaction hash.
     */
    getRawTransactionJson(txHash: string): Promise<any>;
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null cause the time is not fixed.
     */
    /**
     * Get the nodes count.
     */
    getNodeCount(): Promise<any>;
    /**
     * Get the current block height.
     */
    getBlockHeight(): Promise<any>;
    /**
     * Get the all blocks count.
     */
    getBlockCount(): Promise<any>;
    /**
     * Get block info by block's height or hash.
     * The result is json.
     * @param value Block's hash or height
     */
    getBlockJson(value: string | number): Promise<any>;
    /**
     * Get contract info by contract' code hash.
     * The result is hex encoded string.
     * @param hash Contract's code hash.
     */
    getContract(hash: string): Promise<any>;
    /**
     * Get contract info by contract's code hash.
     * The result is json.
     * @param codeHash Contract's code hash.
     */
    getContractJson(codeHash: string): Promise<any>;
    /**
     * Get block info by block's height or hash.
     * The result is hex encoded string.
     *
     * @param value Block's height or hash
     */
    getBlock(value: string | number): Promise<any>;
    /**
     * Get smart contract event.
     * If parameter is transaction's hash, the result is the event of that transaction.
     * If parameter is block's height, the result is all the events of that block.
     *
     * @param value Transaction's hash or block's height
     */
    getSmartCodeEvent(value: string | number): Promise<any>;
    /**
     * Get block height by transaction hash
     * @param txHash Reversed transaction hash
     */
    getBlockHeightByTxHash(txHash: string): Promise<any>;
    /**
     * Get stored value in smart contract by contract's code hash and the key.
     * @param codeHash Contract's code hash
     * @param key Key of stored value
     */
    getStorage(codeHash: string, key: string): Promise<any>;
    /**
     * Get merkle proof by transaction hash.
     * @param hash Reversed transaction hash
     */
    getMerkleProof(hash: string): Promise<any>;
    /**
     * Get allowanece
     * @param asset Asset's type.Only ONT and ONG supported.
     * @param from Address of allowance's sender.
     * @param to Address of allowance's receiver.
     */
    getAllowance(asset: string, from: Address, to: Address): Promise<any>;
}
