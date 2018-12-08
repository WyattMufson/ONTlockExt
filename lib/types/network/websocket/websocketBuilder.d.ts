import { Address } from '../../crypto/address';
export declare function sendHeartBeat(): {
    Action: string;
    Version: string;
};
export declare function sendSubscribe(subscribeEvent?: boolean, subscribeJsonBlock?: boolean, subscribeRawBlock?: boolean, subscribeBlockTxHashes?: boolean): {
    Action: string;
    Version: string;
    SubscribeEvent: boolean;
    SubscribeJsonBlock: boolean;
    SubscribeRawBlock: boolean;
    SubscribeBlockTxHashs: boolean;
};
export declare function sendRawTransaction(hexData: string, preExec?: boolean): {
    Action: string;
    Version: string;
    Data: string;
};
export declare function getRawTransaction(txHash: string): {
    Action: string;
    Version: string;
    Hash: string;
    Raw: string;
};
export declare function getRawTransactionJson(txHash: string): {
    Action: string;
    Version: string;
    Hash: string;
    Raw: string;
};
export declare function getNodeCount(): {
    Action: string;
    Version: string;
};
export declare function getBlockHeight(): {
    Action: string;
    Version: string;
};
export declare function getBlock(value: number | string): {};
export declare function getBlockJson(value: number | string): {};
export declare function getBalance(address: Address): {
    Action: string;
    Version: string;
    Addr: string;
};
export declare function getUnboundOng(address: Address): {
    Action: string;
    Version: string;
    Addr: string;
};
export declare function getContract(hash: string): {
    Action: string;
    Version: string;
    Hash: string;
    Raw: string;
};
export declare function getContractJson(hash: string): {
    Action: string;
    Version: string;
    Hash: string;
    Raw: string;
};
export declare function getSmartCodeEvent(value: number | string): {};
export declare function getBlockHeightByTxHash(hash: string): {
    Action: string;
    Version: string;
    Hash: string;
};
export declare function getStorage(codeHash: string, key: string): {
    Action: string;
    Version: string;
    Hash: string;
    Key: string;
};
export declare function getMerkleProof(hash: string): {
    Action: string;
    Version: string;
    Hash: string;
};
export declare function getAllowance(asset: string, from: Address, to: Address): {
    Action: string;
    Version: string;
    Asset: string;
    From: string;
    To: string;
};
export declare function getBlockHash(value: number): {
    Action: string;
    Version: string;
    Height: number;
};
export declare function getBlockTxsByHeight(value: number): {
    Action: string;
    Version: string;
    Height: number;
};
export declare function getGasPrice(): {
    Action: string;
    Version: string;
};
export declare function getGrantOng(address: Address): {
    Action: string;
    Version: string;
    Addr: string;
};
export declare function getMempoolTxCount(): {
    Action: string;
    Version: string;
};
export declare function getMempoolTxState(txHash: string): {
    Action: string;
    Version: string;
    Hash: string;
};
export declare function getVersion(): {
    Action: string;
    Version: string;
};
export declare function getNetworkId(): {
    Action: string;
    Version: string;
};
