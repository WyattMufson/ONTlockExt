import { Address } from '../../crypto';
import { Transaction } from '../../transaction/transaction';
import { StringReader } from '../../utils';
/**
 * Register to be candidate node.
 * This tx needs signatures from userAddr and payer if these two address are not the same.
 * @param ontid user's ONT ID, must be assigned with the role.
 * @param peerPubKey public key of user's peer
 * @param userAddr user's address to pledge ONT&ONG. This address must have enough ONT & ONG.
 * @param keyNo user's pk id
 * @param initPos Initial state
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeRegisterCandidateTx(ontid: string, peerPubKey: string, keyNo: number, userAddr: Address, initPos: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 *
 * @param userAddr User's address to pledge ONT&ONG.
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeUnregisterCandidateTx(userAddr: Address, peerPubKey: string, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Creates transaction to approve candidate
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeApproveCandidateTx(peerPubKey: string, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Creates transaction to reject candidate
 * @param peerPubKey Public key of user's peer
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeRejectCandidateTx(peerPubKey: string, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Creates transaction to vote for some peers.
 * Can only vote for peers that with status 1 or 2
 * This tx needs signatures from userAddr and payer if these two address are not the same.
 * @param userAddr User's address
 * @param peerPubKeys Public keys of peers that to be voted
 * @param posList Array of token that to vote
 * @param payer Address to pay for transaction's gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeVoteForPeerTx(userAddr: Address, peerPubKeys: string[], posList: number[], payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * User unvotes peer nodes
 * @param userAddr user's address
 * @param peerPubKeys peer's pks
 * @param posList amount of ONT to unvote
 * @param payer Address to pay for the gas.
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeUnvoteForPeerTx(userAddr: Address, peerPubKeys: string[], posList: number[], payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Withdraw the unvote ONT
 * Need two signatures if userAddr and payer are not the same
 * @param userAddr
 * @param peerPubKeys
 * @param withdrawList
 */
export declare function makeWithdrawTx(userAddr: Address, peerPubKeys: string[], withdrawList: number[], payer: Address, gasPrice: string, gasLimit: string): Transaction;
/** Quit node register
 * Need two signatures if userAddr and payer are not the same
 */
export declare function makeQuitNodeTx(userAddr: Address, peerPubKey: string, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Peer change the status of authorization
 * @param peerPubKey Peer's public key
 * @param userAddr User's address
 * @param maxAuthorize Allowed max amount of stake authorization
 * @param payer Payer of the transaction fee
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeChangeAuthorizationTx(peerPubKey: string, userAddr: Address, maxAuthorize: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Update allocation proportion of peer
 * @param peerPubKey
 * @param userAddr
 * @param peerCost
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
export declare function makeSetPeerCostTx(peerPubKey: string, userAddr: Address, peerCost: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Withdraw fee to user's address
 * @param userAddr User's address
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
export declare function makeWithdrawFeeTx(userAddr: Address, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * User authorize some peers
 * @param userAddr
 * @param peerPubKeyList
 * @param posList
 * @param payer
 * @param gasPrice
 * @param gasLimit
 */
export declare function makeAuthorizeForPeerTx(userAddr: Address, peerPubKeyList: string[], posList: number[], payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * User cancels the authorization of peer
 */
export declare function makeUnauthorizeForPeerTx(userAddr: Address, peerPubKeyList: string[], posList: number[], payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Peer add the init pos
 * @param peerPubkey Peer's public key
 * @param userAddr Stake wallet address
 * @param pos Amount of pos to add
 * @param payer Payer of the transaction
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeAddInitPosTx(peerPubkey: string, userAddr: Address, pos: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * Peer reduce the init pos
 * @param peerPubkey Peer's public key
 * @param userAddr Stake wallet address
 * @param pos Amount of pos to reduce
 * @param payer Payer of the transaction
 * @param gasPrice Gas price
 * @param gasLimit Gas limit
 */
export declare function makeReduceInitPosTx(peerPubkey: string, userAddr: Address, pos: number, payer: Address, gasPrice: string, gasLimit: string): Transaction;
export declare function makeWithdrawPeerUnboundOngTx(userAddr: Address, payer: Address, gasPrice: string, gasLimit: string): Transaction;
/**
 * If not set ifAuthorize or cost before, query result will be empty.
 * @param peerPubKey
 * @param url
 */
export declare function getAttributes(peerPubKey: string, url?: string): Promise<PeerAttributes>;
/**
 * Get the reward fee of address
 * @param address User's address
 * @param url Node's restfull url
 */
export declare function getSplitFeeAddress(address: Address, url?: string): Promise<SplitFeeAddress>;
/**
 * Get authorization of user's address
 * @param peerPubKey Peer's public key
 * @param address User's address
 * @param url Node's restful url
 */
export declare function getAuthorizeInfo(peerPubKey: string, address: Address, url?: string): Promise<AuthorizeInfo>;
/**
 * Query the governance view
 * @param url Url of restful api
 */
export declare function getGovernanceView(url?: string): Promise<GovernanceView>;
/**
 * Query all the peer's state. The result is a map.
 * @param url Url of blockchain node
 */
export declare function getPeerPoolMap(url?: string): Promise<any>;
export declare function getGlobalParam(url?: string): Promise<GlobalParam>;
export declare function getTotalStake(userAddr: Address, url?: string): Promise<TotalStake>;
export declare function getPeerUnboundOng(userAddr: Address, url?: string): Promise<number>;
/**
 * Use to store governance state.
 */
export declare class GovernanceView {
    static deserialize(sr: StringReader): GovernanceView;
    view: number;
    height: number;
    txhash: string;
    serialize(): string;
}
/**
 * Describs the peer's state in the pool.
 */
export declare class PeerPoolItem {
    static deserialize(sr: StringReader): PeerPoolItem;
    index: number;
    peerPubkey: string;
    address: Address;
    status: number;
    initPos: number;
    totalPos: number;
    serialize(): string;
}
export declare class PeerAttributes {
    static deserialize(sr: StringReader): PeerAttributes;
    peerPubkey: string;
    maxAuthorize: number;
    t2PeerCost: number;
    t1PeerCost: number;
    tPeerCost: number;
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    serialize(): string;
}
export declare class SplitFeeAddress {
    static deserialize(sr: StringReader): SplitFeeAddress;
    address: Address;
    amount: number;
}
export declare class AuthorizeInfo {
    static deserialize(sr: StringReader): AuthorizeInfo;
    peerPubkey: string;
    address: Address;
    consensusPos: number;
    freezePos: number;
    newPos: number;
    withdrawPos: number;
    withdrawFreezePos: number;
    withdrawUnfreezePos: number;
}
export declare class GlobalParam {
    static deserialize(sr: StringReader): GlobalParam;
    candidateFee: number;
    candidateNum: number;
    minInitState: number;
    posLimit: number;
    A: number;
    B: number;
    yita: number;
    penalty: number;
}
export declare class TotalStake {
    static deserialize(sr: StringReader): TotalStake;
    address: Address;
    stake: number;
    timeOffset: number;
}
