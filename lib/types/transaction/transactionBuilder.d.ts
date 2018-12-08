import { Address, PrivateKey, SignatureScheme } from '../crypto';
import { PublicKey } from '../crypto/PublicKey';
import { Parameter } from '../smartcontract/abi/parameter';
import { Transaction } from './transaction';
export declare const Default_params: {
    Action: string;
    Version: string;
    Type: string;
    Op: string;
};
/**
 * Signs the transaction object.
 *
 * If there is already a signature, the new one will replace existing.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
export declare const signTransaction: (tx: Transaction, privateKey: PrivateKey, schema?: SignatureScheme | undefined) => void;
/**
 * Signs the transaction object asynchroniously.
 *
 * If there is already a signature, the new one will replace existing.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
export declare const signTransactionAsync: (tx: Transaction, privateKey: PrivateKey, schema?: SignatureScheme | undefined) => Promise<void>;
/**
 * Signs the transaction object.
 *
 * If there is already a signature, the new one will be added to the end.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param privateKey Private key to sign with
 * @param schema Signature Schema to use
 */
export declare const addSign: (tx: Transaction, privateKey: PrivateKey, schema?: SignatureScheme | undefined) => void;
/**
 * Signs the transaction with multiple signatures with multi-sign keys.
 *
 * If there is already a signature, the new ones will be added to the end.
 * If the signature schema is not provided, default schema for Private key type is used.
 *
 * @param tx Transaction to sign
 * @param M m of the (m ,n) multi sign address threshold
 * @param pubKeys Array of Public keys of (m,n) multi sign address, the number is n
 * @param privateKey Private key to sign the tx.
 * @param scheme Signature scheme to use
 */
export declare const signTx: (tx: Transaction, M: number, pubKeys: PublicKey[], privateKey: PrivateKey, scheme?: SignatureScheme | undefined) => void;
/**
 * Creates transaction to invoke native contract
 * @param funcName Function name of contract to call
 * @param params Parameters serialized in hex string
 * @param contractAddr Adderss of contract
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for transaction gas
 */
export declare function makeNativeContractTx(funcName: string, params: string, contractAddr: Address, gasPrice?: string, gasLimit?: string, payer?: Address): Transaction;
/**
 * Creates transaction to inovke smart contract
 * @param funcName Function name of smart contract
 * @param params Array of Parameters or serialized parameters
 * @param contractAddr Address of contract
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for gas
 */
export declare const makeInvokeTransaction: (funcName: string, params: string | Parameter[], contractAddr: Address, gasPrice?: string | undefined, gasLimit?: string | undefined, payer?: Address | undefined) => Transaction;
/**
 * Creates transaction to deploy smart contract
 * @param code Avm code of contract to deploy
 * @param name Name of contract
 * @param codeVersion version of contract
 * @param author Author of contract
 * @param email Email of author
 * @param desp Description of contract
 * @param needStorage Decides if the contract needs storage
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 * @param payer Address to pay for gas
 */
export declare function makeDeployCodeTransaction(code: string, name: string | undefined, codeVersion: string | undefined, author: string | undefined, email: string | undefined, desp: string | undefined, needStorage: boolean | undefined, gasPrice: string, gasLimit: string, payer?: Address): Transaction;
/**
 * @deprecated
 * Creates params from transaction to send with websocket
 * @param tx Transactio to send
 * @param isPreExec Decides if it is pre-execute transaction
 */
export declare function buildTxParam(tx: Transaction, isPreExec?: boolean): string;
/**
 * @deprecated
 * Creates params from transaction to send with rpc
 * @param tx Transaction
 * @param method Method name
 */
export declare function buildRpcParam(tx: Transaction, method?: string): {
    jsonrpc: string;
    method: string;
    params: string[];
    id: number;
};
/**
 * @deprecated
 * Creates params from transaction to send with restful
 * @param tx Transaction
 */
export declare function buildRestfulParam(tx: Transaction): {
    Action: string;
    Version: string;
    Data: string;
};
/**
 * @deprecated
 * @param url Url of blochchain node
 * @param preExec Decides if is a pre-execute request
 */
export declare function sendRawTxRestfulUrl(url: string, preExec?: boolean): string;
