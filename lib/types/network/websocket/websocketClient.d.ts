import { Address } from '../../crypto/address';
import { Deferred } from './deferred';
import { WebsocketSender } from './websocketSender';
/**
 * Websocket client.
 *
 * TODO: correlate request and response with id, so socket can be reused.
 */
export declare class WebsocketClient {
    sender: WebsocketSender;
    autoClose: boolean;
    promises: Map<string, Deferred<any>>;
    constructor(url?: string, debug?: boolean, autoClose?: boolean);
    /**
     * Send heart beat request
     */
    sendHeartBeat(): Promise<any>;
    /**
     * Send subscribe request
     * @param subscribeEvent
     * @param subscribeJsonBlock
     * @param subscribeRawBlock
     * @param subscribeBlockTxHashes
     */
    sendSubscribe(subscribeEvent?: boolean, subscribeJsonBlock?: boolean, subscribeRawBlock?: boolean, subscribeBlockTxHashes?: boolean): Promise<any>;
    /**
     * Send raw transaction
     * @param hexData Hex encoded data
     * @param preExec Decides if it is a pre-executed transaction
     * @param waitNotify Decides if client waits for notify from blockchain before closing
     */
    sendRawTransaction(hexData: string, preExec?: boolean, waitNotify?: boolean): Promise<any>;
    /**
     * Get raw transaction by transaction hash.
     * The result is hex encoded transaction.
     * @param txHash Reversed transaction hash
     */
    getRawTransaction(txHash: string): Promise<any>;
    /**
     * Get transaction info by transaction hash.
     * The result is json.
     * @param txHash Reversed transaction hash
     */
    getRawTransactionJson(txHash: string): Promise<any>;
    /** Deprecated
     * Get the generation time for each block.
     * If the blockchain node runs in vbft, the result is null.
     */
    /**
     * Get Nodes count
     */
    getNodeCount(): Promise<any>;
    /**
     * Get current block height
     */
    getBlockHeight(): Promise<any>;
    /**
     * Get block's info by block's height or hash.
     * The result is hex encoded string.
     * @param value Block's height or hash
     */
    getBlock(value: number | string): Promise<any>;
    /**
     * Get block's info by block's height or hash.
     * The result is json.
     * @param value Block's height or hash
     */
    getBlockJson(value: number | string): Promise<any>;
    /**
     * Get the balance of some address.
     * The result contains ONT and ONG.
     * @param address Address
     */
    getBalance(address: Address): Promise<any>;
    /**
     * Get unbound ong of this address
     * The result contains ONG.
     * @param address Address
     */
    getUnboundong(address: Address): Promise<any>;
    /**
     * Get contract info by code hash.
     * The result is hex encoded string.
     * @param hash Contract's code hash.
     */
    getContract(hash: string): Promise<any>;
    /**
     * Get contract's info by code hash
     * The result is json.
     * @param hash Contract's code hash
     */
    getContractJson(hash: string): Promise<any>;
    /**
     * Get smart conde event by transaction hash or block's height.
     * If parameter is transaction hash, the result is the event of that transaction.
     * If parameter is block's height, the result is all the events of that block.
     * @param value Reversed transaction hash or block's height
     */
    getSmartCodeEvent(value: number | string): Promise<any>;
    /**
     * Get block's height by transaction hash
     * @param hash Reversed transaction hash
     */
    getBlockHeightByTxHash(hash: string): Promise<any>;
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
    /**
     * Get block hash by block height
     * @param height Height of the block
     */
    getBlockHash(height: number): Promise<any>;
    /**
     * Return all transaction hash contained in the block corresponding to this height
     * @param height Height of the block
     */
    getBlockTxsByHeight(height: number): Promise<any>;
    /**
     * Return the state of transaction locate in memory
     */
    getGasPrice(): Promise<any>;
    /**
     * Get grant ong
     * @param address Address
     */
    getGrantOng(address: Address): Promise<any>;
    /**
     * Query the transaction count in the memory pool
     */
    getMempoolTxCount(): Promise<any>;
    /**
     * Query the transaction state in the memory pool
     */
    getMempoolTxState(txHash: string): Promise<any>;
    /**
     * Get the version information of the node
     */
    getVersion(): Promise<any>;
    /**
     * Get the network id
     */
    getNetworkId(): Promise<any>;
    /**
     * Adds listener for Notify messages.
     *
     * Be careful to not set autoClose = true and close the websocket on your own.
     * @param listener Listener
     */
    addNotifyListener(listener: (result: any) => void): void;
    /**
     * Close the websocket manually.
     */
    close(): void;
    /**
     * Send msg to blockchain
     * @param raw Message to send
     * @param close Automaticly close connection if also autoClose is specified
     */
    private send<T>(raw, close?);
    private notifyListener(result);
}
